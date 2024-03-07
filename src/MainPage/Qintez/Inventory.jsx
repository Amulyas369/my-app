import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import { PlusIcon, EditIcon, DeleteIcon } from "../../EntryFile/imagePath";
import "react-select2-wrapper/css/select2.css";
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
import formatDateTime from "../../components/utils";
import Lazyloading from "../../components/Lazyloading";

const Inventory = () => {
  const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const selectedOutletId = useSelector((state) => state.selectedItemId); // Assuming you have a state for outletId

  const fetchProductIds = async () => {
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("id")
      .eq("outlet_id", selectedOutletId);
    if (productError) {
      console.error("Error fetching product data:", productError);
      return [];
    }
    return productData.map((product) => product.id);
  };
  const fetchData = async () => {
    const productIds = await fetchProductIds();
    if (productIds.length > 0) {
      try{
        setLoading(true)
      const { data: inventoryData, error } = await supabase
        .from("inventory")
        .select(
          `
            id,   
            product_id,
            in,
            out,
            created_at,
            notes,
            products (
                product_name,
                product_img,
                barcode,
                outlet_id,
                selling_rate,
                purchase_rate,
                stock,
                unit_of_measure,
                outlets:outlet_id (outlet_name) 
            )
        `
        )
        .in("product_id", productIds)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching inventory data:", error);
      } else {
        const filteredData = inventoryData.filter((inventory) =>
        inventory.products.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        
          );

      setData(filteredData);
        // setData(inventoryData);
        console.log(">>>>>>676", inventoryData);
      }
    }catch(error){
      console.log(error.message)
    }finally{
      setLoading(false)
    }
    }
  };
  useEffect(() => {
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
  }, [selectedOutletId,searchTerm]);
  // Dependency array includes selectedOutletId to refetch datawhenitchanges
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
          .from("inventory")
          .delete()
          .match({ id });

        if (error) {
          console.error("Error deleting product:", error);
        } else {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          fetchData(); // Refresh the data after deletion
        }
      }
    });
  };
  // Table column definitions
  const columns = [
    {
      title: "Product Name",
      // Removed dataIndex and used render to correctly access nested product_name
      key: "product_name",
      render: (_, record) =><div className="text-primary-emphasis fs-6 text "style={{fontWeight:"700"}}>{record.products?.product_name || "No Product Name"}</div> 
    },
    {
      title: "In",
      dataIndex: "in",
      key: "in",
      sorter: (a, b) => a.in - b.in,
      render:(inValue)=><div className="text-success fs-6 text">{inValue} Pack</div>,
    },
    {
      title: "Out",
      key: "out",
      dataIndex: "out", // This remains for the selling_rate
      sorter: (a, b) => a.out - b.out,
      render:(outValue)=>< div className="text-danger fs-6 text">{outValue} Pack</ div>,
    },
    {
      title: "Outlet Name",
      // Adjusted to correctly access nested outlet_name using render
      key: "outlet_name",
      render: (_, record) =>
      <div className="text-info fs-6 text">
        {record.products?.outlets?.outlet_name || "No Outlet Name"}
        </div>
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) =><div className="text-warning fs-6 text"> {`${formatDateTime(record.created_at)} `}</div>,
      sorter: (a, b) => a.created_at.length - b.created_at.length,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-icons">
          <Link
            to={{
              pathname: "/dream-pos/qintez/editinventory",
              state: { inventoryData: record }, // Pass the inventory data
            }}
            className="action-icon"
          >
            <img src={EditIcon} alt="Edit" />
          </Link>
          {/* <Link
            className="me-3"
            // to="/dream-pos/product/addproduct-product"
            to="/dream-pos/product/addproduct-product"
          >
            <img src={EditIcon} alt="img" />
          </Link> */}
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
            <h4>Inventory List</h4>
            <h6>Manage your inventory</h6>
          </div>
          <div className="page-btn">
            <Link to="/dream-pos/qintez/addinventory" className="btn btn-added">
              {" "}
              <img src={PlusIcon} alt="img" className="me-1" />
              Add New Inventory
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

export default Inventory;
