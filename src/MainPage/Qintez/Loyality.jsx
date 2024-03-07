import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable"; // Ensure this is the correct path to your Table component
import Tabletop from "../../EntryFile/tabletop"; // Ensure this is the correct path to your Tabletop component
import { DeleteIcon } from "../../EntryFile/imagePath"; // Ensure these are the correct paths to your icons
import "react-select2-wrapper/css/select2.css"; // Ensure you need this stylesheet
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
import Lazyloading from "../../components/Lazyloading";
import "../../App.css"

const Loyality = () => {
  const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const selectedOutletId = useSelector((state) => state.selectedItemId); // Assuming you have a state for outletId

  // Function to fetch data from Supabase

  useEffect(() => {
    const fetchData = async () => {
      
      if (selectedOutletId) {
        try{
          setLoading(true)
        const { data: loyalityPoints, error } = await supabase
          .from("loyalty_points")
          .select(
            `
      *,
      brands:brand_id (
        brand_name
      ),
      profiles:customer_id (first_name, last_name, avatar_url)

    `
          )
          .eq("brand_id", selectedOutletId);

        if (error) {
          console.error("Error fetching data:", error);
        } else {
          const filteredData = loyalityPoints.filter((loyalitypoint) =>
          loyalitypoint.profiles.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loyalitypoint.profiles.last_name.toLowerCase().includes(searchTerm.toLowerCase())  
          );

      setData(filteredData);
          // setData(loyalityPoints);
          console.log("fetching data:4040", loyalityPoints);
        }
      }catch(error){
        console.log(error.message)
      }finally{
        setLoading(false)
      }
      } else {
        console.error("No outlet_id found in session metadata");
      }
   
    };

    fetchData(); // Fetch existing data initially

    // Subscribe to new insertions in the 'products' table using channels
    const channel = supabase
      .channel("loyalityPoints_changes") // Unique channel name for this subscription
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "loyality_points" },
        (payload) => {
          console.log("New insert:", payload);
          setData((currentData) => [...currentData, payload.new]);
        }
      )
      .subscribe();

    // Cleanup function to remove the channel subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedOutletId,searchTerm]);

  // Function to toggle filter visibility
  const togglefilter = (value) => {
    setInputFilter(value);
  };
  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  // Function to handle delete confirmation and action
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
          .from("loyality_points")
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

  // Table column definitions
  const columns = [

    {
      title: "Name",
      key: "name_and_avatar",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center",gap:"1rem",justifyContent:"flex-start" }}>
          <div className="outerCircle">
            {record.profiles?.avatar_url ? (
              <img
                src={record.profiles.avatar_url}
                alt="Avatar"
                className="innerCircle"
              />
            ) : (
              <div className="innerCircle">
                {record.profiles.first_name.charAt(0)}
              </div>
            )}
          </div>
          <div style={{color:"#17476C", fontWeight:"700"}}>
            {(record.profiles?.first_name || "-") +
              " " +
              (record.profiles?.last_name || "-")}
          </div>
        </div>
      ),
    },
    {
      title: "Brand Name",
      dataIndex: "brand_name",
      key: "brand_name",
      render: (_, record) => <div style={{color:"#491E76", fontWeight:"600"}}>{record.brands?.brand_name || "No Brand Name"}
     </div> 
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      render:(points)=>(
        <div style={{backgroundColor:points<30?"#a63232":points>50?"#00ac47":"F8A725",
        padding:"5px", borderRadius:"20px",
        color:"#fff",textAlign:"center",width:"100px" }}>
         {points}
        </div>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-icons">
          {/*  <Link to={`/dream-pos/qintez/editloyality`} className="action-icon">
            <img src={EditIcon} alt="Edit" />
          </Link>*/}
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
            <h4>Loyality List</h4>
            <h6>Manage your loyality</h6>
          </div>
          <div className="page-btn">
            {/* <Link to="/dream-pos/qintez/addloyality" className="btn btn-added">
              <img src={PlusIcon} alt="img" className="me-1" />
              Add New Product
            </Link> */}
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <Tabletop inputFilter={inputFilter} 
            togglefilter={togglefilter} 
            onSearchTermChange={handleSearchTermChange}
            columns={columns} 
            data={data}/>
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} rowKey="id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loyality;
