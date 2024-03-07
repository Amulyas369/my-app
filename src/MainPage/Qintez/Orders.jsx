import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable"; // Ensure this is the correct path to your Table component
import Tabletop from "../../EntryFile/tabletop"; // Ensure this is the correct path to your Tabletop component
import "react-select2-wrapper/css/select2.css"; // Ensure you need this stylesheet
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactApexChart from "react-apexcharts";
import "../../App.css"
import Lazyloading from "../../components/Lazyloading";
const Orders = () => {
  // const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputFilter, setInputFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const selectedOutletId = useSelector((state) => state.selectedItemId); // Assuming you have a state for outletId

  // Function to fetch data from Supabase
  const fetchData = async () => {
    if (!selectedOutletId) return; // Ensure selectedOutletId is present
    try {
      setLoading(true);
      const { data: orders, error } = await supabase
        .from("orders_view")
        .select("*")
        .eq("outlet_id", selectedOutletId);

      if (error){
        console.log("Orders"+ error.message)
      }else{
        const filteredData = orders.filter((order) =>
            order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())||
            order.space_name.toLowerCase().includes(searchTerm.toLowerCase())||
            order.status.toLowerCase().includes(searchTerm.toLowerCase())
          );

      setData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Failed to fetch orders data.", "error");
    }
    finally {
      setLoading(false); // Set loading to false after fetching data, regardless of success or failure
    }
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const togglefilter = (value) => {
    setInputFilter(value);
  };

  /* The `useEffect` hook in the provided code snippet is responsible for setting up a subscription to
real-time changes in the "orders" table using Supabase. Here's a breakdown of what it does: */
  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel("order_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          setData((currentData) => [...currentData, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [selectedOutletId,searchTerm]);


  // const handleExportPDF = () => {
  //   console.log("Exporting PDF from Orders component");
  // };


  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Customer",
      dataIndex: "customer_name",
      key: "customer_name",
      render: (text) => <span style={{ color: "#007bff" }}>{text}</span>,
    },
    {
      title: "Space",
      dataIndex: "space_name",
      key: "space_name",
      render: (_, record) => `${record.space_name}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          style={{
            color: status === "Completed" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Payments",
      dataIndex: "total_payments",
      key: "total_payments",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Pending Amount",
      dataIndex: "pending_amount",
      key: "pending_amount",
      render: (amount) => (
        <span style={{ color: amount > 0 ? "#ff9900" : "#24a0ed" }}>
          ${amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Payment Transactions",
      dataIndex: "total_payment_transactions",
      key: "total_payment_transactions",
      render: (count) => `${count} transactions`,
    },
  ];

  // Chart data preparation
  // Assuming `data` is your array of orders and each order has a `status` property
const statusCounts = data.reduce((acc, order) => {
  acc[order.status] = (acc[order.status] || 0) + 1;
  return acc;
}, {});

const chartSeries = [{
  name: "Order Count",
  data: Object.values(statusCounts) // Array of counts for each status
}];

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
    categories: Object.keys(statusCounts) // Array of unique statuses
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
            <h4>Orders List</h4>
            <h6>Manage your Orders</h6>
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
            inputFilter={inputFilter}
            togglefilter={togglefilter}
            onSearchTermChange={handleSearchTermChange} 
            />
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} rowKey="order_id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
