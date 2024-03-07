import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import { PlusIcon, EditIcon, DeleteIcon } from "../../EntryFile/imagePath";
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
import "react-select2-wrapper/css/select2.css"; // Ensure you need this stylesheet
import Lazyloading from "../../components/Lazyloading";

const Memberships = () => {
  // const history = useHistory();
  const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const selectedOutletId = useSelector((state) => state.selectedItemId);

  const fetchData = async () => {
    try{
      setLoading(true);
    const { data: memberships, error } = await supabase
      .from("memberships")
      .select("*")
      .eq("brand_id", selectedOutletId);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      

      const filteredData = memberships.filter((plan) =>
            plan.name.toLowerCase().includes(searchTerm.toLowerCase())
            
          );

      setData(filteredData);
      // setData(memberships);
    }}catch(error){
      console.error("Error fetching data:", error);
    }finally{
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("memberships_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "memberships" },
        (payload) => {
          console.log("New insert:", payload);
          setData((currentData) => [...currentData, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedOutletId,searchTerm]);

  

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
          fetchData();
        }
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render:(name)=><div style={{color:"#1C886D",fontWeight:"600"}}>{name}</div>
    },
    {
      title: "Validity",
      dataIndex: "validity",
      key: "validity",
      sorter: (a, b) => a.validity - b.validity,
      render: (validity) => (
        <div style={{ backgroundColor: "#1da1f2",
        padding:"5px", borderRadius:"20px",
        color:"#fff",textAlign:"center",width:"100px" }}>
         {validity} Days
     </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <div style={{color:"#2C4A7F",fontWeight:"600"}}>
          RM {price}
        </div>
      ),
    },
    {
      title: "Slot",
      dataIndex: "slots",
      key: "slots",
      sorter: (a, b) => a.slots - b.slots,
      render: (slots) => (
        <div style={{ backgroundColor:"#3da288",
        padding:"5px", borderRadius:"20px",
        color:"#fff",textAlign:"center",width:"100px" }}>
         {slots} Free
     </div>
      ),
    },
    {
      title: "Service Discount",
      dataIndex: "service_discount",
      key: "service_discount",
      sorter: (a, b) => a.service_discount - b.service_discount,
      render: (service_discount) => (
        < div style={{color:"#0DA54D",fontWeight:"600"}}>
          {service_discount}%
        </div>
      ),
    },
    {
      title: "Food Discount",
      dataIndex: "food_discount",
      key: "food_discount",
      sorter: (a, b) => a.food_discount - b.food_discount,
      render: (food_discount) => (
        < div style={{color:"#0DA54D",fontWeight:"600"}}>
          {food_discount}%
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-icons">
          <Link
            to={{
              pathname: "/dream-pos/qintez/editmemberships",
              state: { membershipData: record }, // Pass the inventory data
            }}
            className="action-icon"
          >
            <img src={EditIcon} alt="Edit" />
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
  
  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const togglefilter = (value) => {
    setInputFilter(value);
  };



  return (
    <div className="page-wrapper">
       {loading && (
        <Lazyloading/>
      )}
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Membership List</h4>
            <h6>Manage your membership</h6>
          </div>
          <div className="page-btn">
            <Link
              to="/dream-pos/qintez/addmemberships"
              className="btn btn-added"
            >
              <img src={PlusIcon} alt="img" className="me-1" />
              Add New Memberships
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

export default Memberships;
