import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable"; // Ensure this is the correct path to your Table component
import Tabletop from "../../EntryFile/tabletop"; // Ensure this is the correct path to your Tabletop component
import { PlusIcon, EditIcon, DeleteIcon } from "../../EntryFile/imagePath";
import "react-select2-wrapper/css/select2.css"; // Ensure you need this stylesheet
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import Lazyloading from "../../components/Lazyloading";
// import "react-tooltip/dist/index.css";

const Stores = () => {
  const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const selectedStoresId = useSelector((state) => state.selectedItemId); // Assuming you have a state for storesId
  const fetchData = async () => {
    console.log(">>>>>>>>>>>>>>>898", selectedStoresId);
    try{
      setLoading(true)
    const { data: stores, error } = await supabase
      .from("outlets")
      .select(
        `*,
      brands:brand_id (brand_name)
    `
      )
      .eq("brand_id", selectedStoresId);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      const filteredData = stores.filter((store) =>
      store.outlet_name.toLowerCase().includes(searchTerm.toLowerCase())
          );

      setData(filteredData);
      // setData(stores);
      console.log(">>>>>>>>>>>>>>>898", stores);
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
      .channel("stores_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "outlets" },
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
  }, [selectedStoresId,searchTerm]);

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
        const { error } = await supabase.from("outlets").delete().match({ id });

        if (error) {
          console.error("Error deleting outlets:", error);
        } else {
          Swal.fire("Deleted!", "Your outlets has been deleted.", "success");
          // fetchData(); // Refresh the data after deletion
        }
      }
    });
  };

  // Table column definitions
  const columns = [
    {
      title: "Brand Name",
      dataIndex: "name",
      key: "brand_name",
      render: (_, record) => <div className="text-primary fs-6 text">{record.brands?.brand_name || "No Brand Name"}</div>
    },
    {
      title: "Stores Name",
      dataIndex: "outlet_name",
      key: "outlet_name",
      render: (text, record) => (
        <div
          className="link-button fs-6 text"
          onClick={() => showStoreDetails(record)}
          style={{
            color: "#24509c",
            fontWeight: "700",
            cursor: "pointer"
          }}
          
        >
          <Tooltip id="storeTooltip" place="top" type="dark" effect="solid">
            Click to see full details
          </Tooltip>
          {text}
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => <div className="text-success fs-6 text">{`${text}`}</div>, // Format price as currency
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-icons">
          <Link
            to={{
              pathname: "/dream-pos/qintez/editstores",
              state: { storesData: record }, // Pass the inventory data
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
  const showStoreDetails = (store) => {
    Swal.fire({
      title: "Store Details",
      html: `
        <div>
          <p><strong>Brand Name:</strong> ${store.brands?.brand_name || "No Brand Name"}</p>
          <p><strong>Stores Name:</strong> ${store.outlet_name}</p>
          <p><strong>Address:</strong> ${store.address?store.address:"Not Available"}</p>
          <p><strong>Location:</strong> ${store.location?store.location:"Not Available"}</p>
          <p><strong>Contact:</strong> ${store.contact_info?store.contact_info:"Not Available"}</p>
          
        </div>
      `,
      confirmButtonText: "Close",
    });
  };



  return (
    <div className="page-wrapper">
      {loading && (
        <Lazyloading/>
      )}
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Stores List</h4>
            <h6>Manage your outlets</h6>
          </div>
          <div className="page-btn">
            <Link to="/dream-pos/qintez/addoutlets" className="btn btn-added">
              <img src={PlusIcon} alt="img" className="me-1" />
              Add New Store
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

export default Stores;
