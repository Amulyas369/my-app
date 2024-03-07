import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable"; // Ensure this is the correct path to your Table component
import Tabletop from "../../EntryFile/tabletop"; // Ensure this is the correct path to your Tabletop component
import "react-select2-wrapper/css/select2.css"; // Ensure you need this stylesheet
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import Lazyloading from "../../components/Lazyloading";



const Payments = () => {
  // const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedOutletId = useSelector((state) => state.selectedItemId); // Assuming you have a state for outletId

  // Function to fetch data from Supabase
  const fetchData = async () => {
    if (!selectedOutletId) return; // Ensure selectedOutletId is present
    try {
      setLoading(true);
      const { data: payments, error } = await supabase
        .from("payments_view")
        .select("*")
        .eq("outlet_id", selectedOutletId);

      if (error){
        console.log("Payment List:"+ error.message)
      }else{
        const filteredData = payments.filter((payment) =>
        payment.outlet_name.toLowerCase().includes(searchTerm.toLowerCase())||
        payment.shift.toLowerCase().includes(searchTerm.toLowerCase())||
        payment.payment_method.toLowerCase().includes(searchTerm.toLowerCase())
          );

      setData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Failed to fetch payments data.", "error");
    }
    finally {
      setLoading(false); // Set loading to false after fetching data, regardless of success or failure
    }
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  /* The `useEffect` hook in the provided code snippet is responsible for setting up a subscription to
real-time changes in the "payments" table using Supabase. Here's a breakdown of what it does: */
  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("payment_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "payments" },
        (payload) => {
          setData((currentData) => [...currentData, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [selectedOutletId]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Outlet Name",
      dataIndex: "outlet_name",
      key: "outlet_name",
    },
    {
      title: "Shift Operator",
      dataIndex: "shift",
      key: "shift",
      render: (text) => <span style={{ color: "#007bff" }}>{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (method) => (
        <div
          className="payment-method-pill"
          style={{
            backgroundColor: "#f0ad4e",
            color: "#ffffff",
            padding: "5px",
            borderRadius: "15px",
            width:"100px",
            textAlign:"center"
          }}
        >
          {method}
        </div>
      ),
    },
    {
      title: "Payment Date",
      dataIndex: "payment_date",
      key: "payment_date",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
  ];

  const paymentMethodStats = data.reduce((acc, payment) => {
    const method = payment.payment_method;
  
    if (!acc[method]) {
      acc[method] = { count: 0, total: 0 };
    }
  
    acc[method].count += 1; // Increment count
    acc[method].total += parseFloat(payment.amount); // Sum up the amount
  
    return acc;
  }, {});
  const chartSeries = [
    {
      name: "Payment Method Count",
      data: Object.values(paymentMethodStats).map(stats => stats.count)
    },
    {
      name: "Total Amount",
      data: Object.values(paymentMethodStats).map(stats => stats.total)
    }
  ];
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 200
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        horizontal: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: Object.keys(paymentMethodStats) // Payment methods as categories
    }
  };
      

  return (
    <div className="page-wrapper">
       {loading && (
        <Lazyloading/>
      )}
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Payments List</h4>
            <h6>Manage your Payments</h6>
          </div>
          <div className="page-btn">
            <Link to="/pos" className="btn btn-added">
            <i className="fas fa-cash-register" style={{ marginRight: '8px' }}></i>
              Go to POS
            </Link>
          </div>
        </div>
        <iframe id="printFrame" style={{ display: "none" }}></iframe>
        <div className="chart-container" style={{ width: '100%' }}>
  <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={200} />
</div>

        <div className="card">
          <div className="card-body">
            <Tabletop columns={columns}
             data={data}
             onSearchTermChange={handleSearchTermChange} />
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} rowKey="transaction_id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
