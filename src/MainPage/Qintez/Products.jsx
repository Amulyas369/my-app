import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable"; // Ensure this is the correct path to your Table component
import Tabletop from "../../EntryFile/tabletop"; // Ensure this is the correct path to your Tabletop component
import { PlusIcon, EditIcon, DeleteIcon } from "../../EntryFile/imagePath"; // Ensure these are the correct paths to your icons
import "react-select2-wrapper/css/select2.css"; // Ensure you need this stylesheet
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
import Lazyloading from "../../components/Lazyloading";


const ProductList = () => {
  const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const selectedOutletId = useSelector((state) => state.selectedItemId); // Assuming you have a state for outletId

  const fetchData = async () => {
    console.log(">>>>>>>>>>>>>>>898", selectedOutletId);
    if (selectedOutletId) {
      try{
        setLoading(true)
      const { data: products, error } = await supabase
        .from("products")
        .select("*,outlets(outlet_name,currency)")
        .eq("outlet_id", selectedOutletId);
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        const filteredData = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) 
          );

      setData(filteredData);
        // setData(products);
        // console.log("Products List"+ products )
      }
    }catch(error){
      console.log(error.message);
    }finally{
      setLoading(false)
    }
    }
   else {
      console.error("No outlet_id found in session metadata");
    }
  };
  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("product_changes") // Unique channel name for this subscription
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "products" },
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
          .from("products")
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
  const columns = [
    {
      title: "Name",
      key: "product_name_and_product_img",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center",gap:"1rem",justifyContent:"flex-start" }}>
          <div className="outerCircle">
            {record.product_img ? (
              <img
                src={record.product_img}
                alt={record.product_name.charAt(0)}
                className="innerCircle"
              />
            ) : (
              <div className="innerCircle">
            P
          </div>
            )}
          </div>
          <div className="text-primary-emphasis fs-6 text" style={{fontWeight:"600"}}>
            {record.product_name}
          </div>
        </div>
      ),
    },
    // {
    //   title: "Name",
    //   dataIndex: "product_name",
    //   key: "product_name",
    // },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
      render:(barcode)=><div className="text-primary fs-7 text">{barcode}</div>
    },
    {
      title: "Selling Rate",
      key: "selling_rate",
      dataIndex: "selling_rate", // This remains for the selling_rate
      render: (sellingRate, record) =>(
        <div className="text-success fs-6 text">
          {`${record.outlets.currency} ${sellingRate}`} {/* Format as "Currency SellingRate" */}
        </div>
      ),
      sorter: (a, b) => a.selling_rate - b.selling_rate,
    },
    {
      title: "Buying Rate",
      key: "purchase_rate",
      dataIndex: "purchase_rate",
      render: (buyingRate, record) => (
        <div className="text-info fs-6 text">
          {`${record.outlets.currency} ${buyingRate}`}
        </div>
      ),
      sorter: (a, b) => a.purchase_rate - b.purchase_rate,
    }
    ,
    {
      title: "Outlet",
      dataIndex: ["outlets", "outlet_name"],
      key: "outlet_name",
      render:(outlet_name)=><div className="text-warning fs-6 text">{outlet_name}</div>
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-icons">
          {/* <Link className="me-3" to="/dream-pos/qintez/">
            <img src={EditIcon} alt="img" />
          </Link> */}
          <Link
            to={{
              pathname: "/dream-pos/qintez/editproducts",
              state: { productData: record }, // Pass the inventory data
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
  return (
    <div className="page-wrapper">
      {loading && (
        <Lazyloading/>
      )}
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Product List</h4>
            <h6>Manage your products</h6>
          </div>
          <div className="page-btn">
            <Link to="/dream-pos/qintez/addproducts" className="btn btn-added">
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

export default ProductList;
