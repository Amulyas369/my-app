import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable"; // Ensure this is the correct path to your Table component
import Tabletop from "../../EntryFile/tabletop"; // Ensure this is the correct path to your Tabletop component
import { PlusIcon, EditIcon, DeleteIcon } from "../../EntryFile/imagePath"; // Ensure these are the correct paths to your icons
import "react-select2-wrapper/css/select2.css"; // Ensure you need this stylesheet
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
import { Switch } from "antd";
import Lazyloading from "../../components/Lazyloading";

const Spaces = () => {
  const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);
  const selectedOutletId = useSelector((state) => state.selectedItemId); // Assuming you have a state for outletId
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  // Function to fetch data from Supabase
  const fetchData = async () => {
    // const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    // const outletId = userProfile.outlet_id;
    // Retrieve the outlet_id from session metadata (adjust as per your metadata structure)
    // const outlet_id = session?.user?.user_metadata?.outlet_id;
    console.log(">>>>>>>>>>>>>>>898", selectedOutletId);
    try{
      setLoading(true);
    const { data: spaces, error } = await supabase
      .from("spaces")
      .select(
        `
    *,
    outlets:outlet_id (outlet_name)
  `
      ) // Joining with the outlets table to fetch the outlet_name
      .eq("outlet_id", selectedOutletId);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      const filteredData = spaces.filter((space) =>
      space.space_type.toLowerCase().includes(searchTerm.toLowerCase())||
      space.space_name.toLowerCase().includes(searchTerm.toLowerCase())
          );

      setData(filteredData);
      // setData(spaces);
      console.log(">>>>>>>>>>>>>>>898", spaces);
    }
  }catch(error){
    console.log(error.message);
  }finally{
    setLoading(false);
  }
  };

  useEffect(() => {
    fetchData(); // Fetch existing data initially

    // Subscribe to new insertions in the 'products' table using channels
    const channel = supabase
      .channel("spaces_changes") // Unique channel name for this subscription
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "spaces" },
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
  const handleTimeBillingChange = async (checked, record) => {
    console.log("129", record.space_id);
    console.log("129", checked);
    try {
      // Attempt to update the "time_billing" status in the database
      const { error } = await supabase
        .from("spaces")
        .update({ time_billing: checked })
        .match({ space_id: record.space_id });

      if (error) {
        throw error; // Throw error to catch block if any
      }

      // Update the data in state directly without re-fetching all data
      setData((prevData) =>
        prevData.map((item) =>
          item.space_id === record.space_id
            ? { ...item, time_billing: checked }
            : item
        )
      );
    } catch (error) {
      console.error("Error handling toggle change:", error);
      // Optionally, revert the toggle or show an error message to the user
    }
  };
  // Function to handle delete confirmation and action
  const confirmDelete = (space_id) => {
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
          .from("spaces")
          .delete()
          .match({ space_id });

        if (error) {
          console.error("Error deleting spaces:", error);
        } else {
          Swal.fire("Deleted!", "Your spaces has been deleted.", "success");
          fetchData(); // Refresh the data after deletion
        }
      }
    });
  };

  // Table column definitions
  const columns = [
    {
      title: "Name",
      dataIndex: "space_name",
      key: "space_name",
      render:(space_name)=><div className="text-primary fs-6 text" style={{fontWeight:"600"}}>{space_name}</div>
    },
    {
      title: "Type",
      dataIndex: "space_type",
      key: "space_type",
      render:(space_type)=><div className="text-primary-emphasis fs-6 text" style={{fontWeight:"600"}}>{space_type}</div>
    },
    // {
    //   title: 'Selling Rate',
    //   key: 'selling_rate',
    //   dataIndex: 'selling_rate', // This remains for the selling_rate
    //   render: (sellingRate, record) => {
    //     // Access currency from the nested outlets object
    //     const currency = record.outlets.currency;
    //     return `${currency} ${sellingRate}`; // Format as "Currency SellingRate"
    //   },
    // },
    // {
    //   title: 'Buying Rate',
    //   key: 'purchase_rate',
    //   dataIndex: 'purchase_rate', // This remains for the selling_rate
    //   render: (buyingRate, record) => {
    //     // Access currency from the nested outlets object
    //     const currency = record.outlets.currency;
    //     return `${currency} ${buyingRate}`; // Format as "Currency SellingRate"
    //   },
    // },

    {
      title: "Time Billing",
      dataIndex: "time_billing",
      key: "time_billing",
      render: (time_billing, record) => (
        <Switch
          className="switch"
          checked={time_billing}
          onChange={(checked) => handleTimeBillingChange(checked, record)}
        />
      ),
    },
    {
      title: "Outlet",
      key: "outlet_name",
      render: (_, record) =><div className="text-success fs-6 text"> {record.outlets?.outlet_name || "No Outlet Name"}</div>
    },
    // {
    //   title: 'Quantity',
    //   dataIndex: 'qty',
    //   key: 'qty',
    // },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-icons">
          {/* <Link to={`/dream-pos/qintez/editspaces`} className="action-icon">
            <img src={EditIcon} alt="Edit" />
          </Link> */}
          <Link
            to={{
              pathname: "/dream-pos/qintez/editspaces",
              state: { spacesData: record }, // Pass the inventory data
            }}
            className="action-icon"
          >
            <img src={EditIcon} alt="Edit" />
          </Link>
          <button
            onClick={() => confirmDelete(record.space_id)}
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
            <h4>Spaces List</h4>
            <h6>Manage your spaces</h6>
          </div>
          <div className="page-btn">
            <Link to="/dream-pos/qintez/addspaces" className="btn btn-added">
              <img src={PlusIcon} alt="img" className="me-1" />
              Add New{" "}
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <Tabletop inputFilter={inputFilter} 
            togglefilter={togglefilter}
            onSearchTermChange={handleSearchTermChange}
            columns={columns} 
            data={data} />
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} rowKey="id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spaces;
