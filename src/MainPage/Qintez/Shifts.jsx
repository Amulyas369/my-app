import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable"; // Ensure this is the correct path to your Table component
import Tabletop from "../../EntryFile/tabletop"; // Ensure this is the correct path to your Tabletop component
import {PlusIcon, EditIcon, DeleteIcon } from "../../EntryFile/imagePath"; // Ensure these are the correct paths to your icons
import "react-select2-wrapper/css/select2.css"; // Ensure you need this stylesheet
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
import formatDateTime from "../../components/utils";
import "../../App.css"
import Lazyloading from "../../components/Lazyloading";

const Shifts = () => {
  const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const selectedOutletId = useSelector((state) => state.selectedItemId); // Assuming you have a state for outletId
  console.log(">>>>>>>>>>3543534", selectedOutletId);
  // Function to fetch data from Supabase
  const fetchData = async () => {
    console.log(">>>>>>>>>>>>>>>898", selectedOutletId);
    try{
    setLoading(true)
    const { data: shiftsData, error: shiftsError } = await supabase
      .from("shifts")
      .select(
        `
      *,
      outlets:outlet_id (outlet_name),
      profiles:profile_id (first_name, last_name, avatar_url)
     `
      ) // Joining with the outlets table to get the outlet_name
      .eq("outlet_id", selectedOutletId);

    if (shiftsError) {
      console.error("Error fetching data:", shiftsError);
    } else {
      const filteredData = shiftsData.filter((shifts) =>
      shifts.profiles.first_name.toLowerCase().includes(searchTerm.toLowerCase())||
      shifts.profiles.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      setData(filteredData);
      console.log(">>>>>>>>>>>>>>>898", shiftsData);
    }
  }catch(error){
    console.log(error.message)
  }finally{
    setLoading(false)
  }
  };
  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("shifts_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "shifts" },
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
          .from("shifts")
          .delete()
          .match({ shift_id: id }); // Assuming 'id' is the correct identifier you want to match

        if (error) {
          console.error("Error deleting shifts:", error);
        } else {
          Swal.fire("Deleted!", "Your shifts has been deleted.", "success");
          fetchData(); // Refresh the data after deletion
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
            {record.profiles?.avatar_url ? (
              <img
                src={record.profiles.avatar_url}
                alt="Avatar"
                className="innerCircle"
              />
            ) : (
              <div className="innerCircle">
                 {record.first_name.charAt(0)}
              </div>
            )}
          </div>
          <div style={{color:"#2C4A7F",fontWeight:"700"}}>
            {(record.profiles?.first_name || "-") +
              " " +
              (record.profiles?.last_name || "-")}
          </div>
        </div>
      ),
    },
    {
      title: "Shift Start Time",
      key: "start_time",
      render: (text, record) =>
      <div className="text-warning fs-6 text">
        {`${formatDateTime(record.start_time)} `}
        </div>
    },
    {
      title: "Shift End Time",
      key: "end_time",
      render: (text, record) =>
      <div className="text-warning fs-6 text" >
       { `${formatDateTime(
          record.end_time
        )}`}
        </div>
    },
    {
      title: "Outlet Name",
      dataIndex: "outlet_name",
      key: "outlet_id",
      render: (_, record) =><div className="text-success fs-6 text"> {record.outlets?.outlet_name || "No Outlet Name"}</div>
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-icons">
           <Link to={{
  pathname: "/dream-pos/qintez/editshifts",
  state: { shiftData: record } // Pass the inventory data
}} className="action-icon">
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
  return (
    <div className="page-wrapper">
      {loading && (
        <Lazyloading/>
      )}
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Shift List</h4>
            <h6>Manage your shifts</h6>
          </div>
          <div className="page-btn">
            <Link to="/dream-pos/qintez/addshifts" className="btn btn-added">
              {" "}
              <img src={PlusIcon} alt="img" className="me-1" />
              Add New 
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

export default Shifts;
