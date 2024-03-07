import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import { PlusIcon, EditIcon, DeleteIcon } from "../../EntryFile/imagePath";
import "react-select2-wrapper/css/select2.css";
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
import Lazyloading from "../../components/Lazyloading";
import "../../App.css";
const Customers = () => {
  const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const selectedOutletId = useSelector((state) => state.selectedItemId);

  useEffect(() => {
    const fetchCustomerIds = async () => {
      if (!selectedOutletId) return;
      const { data: customerBrands, error } = await supabase
        .from("customer_brands")
        .select(
          `*,
      customer_id,
      brands:brand_id (brand_name),
      profiles:customer_id (first_name, last_name, avatar_url)
    `
        )
        .eq("brand_id", selectedOutletId);

      if (error) {
        console.log("Error fetching customer IDs: 4567", customerBrands);
        return [];
      } else {
        return customerBrands.map((item) => item.customer_id);
      }
    };
    const fetchCustomers = async (customerIds) => {
      try{
        setLoading(true);
      const { data: customers, error } = await supabase
        .from("profiles")
        .select("*")
        .in("id", customerIds);

      if (error) {
        console.error("Error fetching customers:", error);
      } else {
        const filteredData = customers.filter((customer) =>
            customer.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email_id.toLowerCase().includes(searchTerm.toLowerCase())
          );

          setData(filteredData);
        // setData(customers);
        console.log("Customers Data:", customers);
      }
    }catch(error){
      console.log(error.message)
    }finally{
      setLoading(false)
    }
    };
    const fetchData = async () => {
      const customerIds = await fetchCustomerIds();
      if (customerIds.length > 0) {
        await fetchCustomers(customerIds);
      }
    };
    fetchData();

    // Subscribe to new insertions in the 'inventory' table using channels
    const channel = supabase
      .channel("inventory_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "inventory" },
        (payload) => {
          setData((currentData) => [...currentData, payload.new]);
        }
      )
      .subscribe();

    // Cleanup function to remove the channel subscription on component unmount
    return () => supabase.removeChannel(channel);
  }, [selectedOutletId,searchTerm]); // Ensure useEffect is directly inside the component

  const togglefilter = (value) => {
    setInputFilter(value);
  };
  
  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("memberships")
          .delete()
          .match({ id });

        if (error) {
          console.error("Error deleting product:", error);
        } else {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          // fetchData(); // Refresh the data after deletion
        }
      }
    });
  };
  const columns = [
    {
      title: "Name",
      key: "name_and_avatar",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center",gap:"1rem",justifyContent:"flex-start" }}>
          <div className="outerCircle">
            {record.avatar_url ? (
              <img
                src={record.avatar_url}
                alt="Avatar"
                className="innerCircle"
              />
            ) : (
              <div className="innerCircle">
                  {record.first_name.charAt(0)}
              </div>
            )}
          </div>
          <div style={{color:"#2C4A7F",fontWeight:"600"}}>
            {(record.first_name || "-") + " " + (record.last_name || "-")}
          </div>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email_id",
      key: "email_id",
      render:(email_id)=><div style={{color:"#A63232",fontWeight:"500"}}>{email_id}</div>
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-icons">
          <Link className="me-3" to="/dream-pos/qintez/editcustomers">
            <img src={EditIcon} alt="img" />
          </Link>
          <button
            onClick={() => confirmDelete(record.id)}
            className="action-icon"
            style={{ border: "none", background: "none" }}
          >
            <img src={DeleteIcon} alt="Delete" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="page-wrapper">
       {loading && (
        <Lazyloading/>
      )}
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Customers List</h4>
            <h6>Manage your customers</h6>
          </div>
          <div className="page-btn">
            <Link to="/dream-pos/qintez/addcustomers" className="btn btn-added">
              <img src={PlusIcon} alt="img" className="me-1" />
              Add New Product
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <Tabletop inputFilter={inputFilter}
             togglefilter={togglefilter} 
             onSearchTermChange={handleSearchTermChange}
            columns={columns} 
            data={data}
             />
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} rowKey="id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
