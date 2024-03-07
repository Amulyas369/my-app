// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import Table from '../../EntryFile/datatable'; // Ensure this is the correct path to your Table component
// import Tabletop from '../../EntryFile/tabletop'; // Ensure this is the correct path to your Tabletop component
// import { PlusIcon, EyeIcon, EditIcon, DeleteIcon } from '../../EntryFile/imagePath'; // Ensure these are the correct paths to your icons
// import 'react-select2-wrapper/css/select2.css'; // Ensure you need this stylesheet
// import { supabase } from '../../custom/supabaseClient';

// const ProductList = () => {
//   const [inputFilter, setInputFilter] = useState(false);
//   const [data, setData] = useState([]);

//   // Function to fetch data from Supabase
//   const fetchData = async () => {
//     const { data: products, error } = await supabase
//       .from('products')
//       .select('*,outlets(outlet_name,currency)');

//     if (error) {
//       console.error('Error fetching data:', error);
//     } else {
//       setData(products);
//     }
//   };

//   useEffect(() => {
//     fetchData(); // Fetch existing data initially

//     // Subscribe to new insertions in the 'products' table using channels
//     const channel = supabase
//       .channel('product_changes') // Unique channel name for this subscription
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'products' }, (payload) => {
//         console.log('New insert:', payload);
//         setData((currentData) => [...currentData, payload.new]);
//       })
//       .subscribe();

//     // Cleanup function to remove the channel subscription on component unmount
//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   // Function to toggle filter visibility
//   const toggleFilter = (value) => {
//     setInputFilter(value);
//   };

//   // Function to handle delete confirmation and action
//   const confirmDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const { error } = await supabase
//           .from('products')
//           .delete()
//           .match({ id });

//         if (error) {
//           console.error('Error deleting product:', error);
//         } else {
//           Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
//           fetchData(); // Refresh the data after deletion
//         }
//       }
//     });
//   };

//   // Table column definitions
//   const columns = [
//     {
//       title: 'Image',
//       dataIndex: 'product_img',
//       key: 'product_img',
//       render: (text, record) => (
//         <div className="product-name-cell">
//           <Link to="#" className="product-img">
//             {/* Replace with actual image rendering logic */}
//             <img alt={record.productName} src={PlusIcon} style={{ width: 50, height: 50 }} />
//           </Link>
//           <Link to="#" className="product-name-link" style={{ marginLeft: 10 }}>
//             {record.productName}
//           </Link>
//         </div>
//       ),
//     },
//     {
//       title: 'Name',
//       dataIndex: 'product_name',
//       key: 'product_name',
//     },
//     {
//       title: 'Barcode',
//       dataIndex: 'barcode',
//       key: 'barcode',
//     },
//     {
//       title: 'Selling Rate',
//       key: 'selling_rate',
//       dataIndex: 'selling_rate', // This remains for the selling_rate
//       render: (sellingRate, record) => {
//         // Access currency from the nested outlets object
//         const currency = record.outlets.currency;
//         return `${currency} ${sellingRate}`; // Format as "Currency SellingRate"
//       },
//     },
//     {
//       title: 'Buying Rate',
//       key: 'purchase_rate',
//       dataIndex: 'purchase_rate', // This remains for the selling_rate
//       render: (buyingRate, record) => {
//         // Access currency from the nested outlets object
//         const currency = record.outlets.currency;
//         return `${currency} ${buyingRate}`; // Format as "Currency SellingRate"
//       },
//     },

//     {
//       title: 'Outlet',
//       dataIndex: ['outlets', 'outlet_name'],
//       key: 'outlet_name',
//     },
//     // {
//     //   title: 'Price',
//     //   dataIndex: 'price',
//     //   key: 'price',
//     //   render: (text) => `$${text}`, // Format price as currency
//     // },
//     // {
//     //   title: 'Quantity',
//     //   dataIndex: 'qty',
//     //   key: 'qty',
//     // },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <div className="action-icons">
//           <Link to={`/product-details/${record.id}`} className="action-icon">
//             <img src={EyeIcon} alt="View" />
//           </Link>
//           <Link to={`/edit-product/${record.id}`} className="action-icon">
//             <img src={EditIcon} alt="Edit" />
//           </Link>
//           <button onClick={() => confirmDelete(record.id)} className="action-icon" style={{ border: 'none', background: 'none' }}>
//             <img src={DeleteIcon} alt="Delete" />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="page-title">
//             <h4>Product List</h4>
//             <h6>Manage your products</h6>
//           </div>
//           <div className="page-btn">
//           <Link
//                 to="/dream-pos/product/addproduct-product"
//                 className="btn btn-added"
//               >
//                 <img src={PlusIcon} alt="img" className="me-1" />
//                 Add New Product
//               </Link>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-body">
//             <Tabletop inputFilter={inputFilter} toggleFilter={toggleFilter} />
//             <div className="table-responsive">
//               <Table columns={columns} dataSource={data} rowKey="id" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../EntryFile/datatable"; // Ensure this is the correct path to your Table component
import Tabletop from "../EntryFile/tabletop"; // Ensure this is the correct path to your Tabletop component
import {
  PlusIcon,
  EyeIcon,
  EditIcon,
  DeleteIcon,
} from "../EntryFile/imagePath"; // Ensure these are the correct paths to your icons
import "react-select2-wrapper/css/select2.css"; // Ensure you need this stylesheet
import { supabase } from "../custom/supabaseClient";

const ProductList = () => {
  const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);

  // Function to fetch data from Supabase
  const fetchData = async () => {
    // Retrieve the current session
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const outletId = userProfile.outlet_id;
    // Retrieve the outlet_id from session metadata (adjust as per your metadata structure)
    // const outlet_id = session?.user?.user_metadata?.outlet_id;

    if (outletId) {
      const { data: products, error } = await supabase
        .from("products")
        .select("*,outlets(outlet_name,currency)")
        .eq("outlet_id", outletId); // Filter products by outlet_id

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setData(products);
      }
    } else {
      console.error("No outlet_id found in session metadata");
    }
  };

  useEffect(() => {
    fetchData(); // Fetch existing data initially

    // Subscribe to new insertions in the 'products' table using channels
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

    // Cleanup function to remove the channel subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Function to toggle filter visibility
  const toggleFilter = (value) => {
    setInputFilter(value);
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

  // Table column definitions
  const columns = [
    {
      title: "Image",
      dataIndex: "product_img",
      key: "product_img",
      render: (text, record) => (
        <div className="product-name-cell">
          <Link to="#" className="product-img">
            {/* Replace with actual image rendering logic */}
            <img
              alt={record.productName}
              src={PlusIcon}
              style={{ width: 50, height: 50 }}
            />
          </Link>
          <Link to="#" className="product-name-link" style={{ marginLeft: 10 }}>
            {record.productName}
          </Link>
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Selling Rate",
      key: "selling_rate",
      dataIndex: "selling_rate", // This remains for the selling_rate
      render: (sellingRate, record) => {
        // Access currency from the nested outlets object
        const currency = record.outlets.currency;
        return `${currency} ${sellingRate}`; // Format as "Currency SellingRate"
      },
    },
    {
      title: "Buying Rate",
      key: "purchase_rate",
      dataIndex: "purchase_rate", // This remains for the selling_rate
      render: (buyingRate, record) => {
        // Access currency from the nested outlets object
        const currency = record.outlets.currency;
        return `${currency} ${buyingRate}`; // Format as "Currency SellingRate"
      },
    },
    // {
    //   title: 'Buying Rate',
    //   key: 'purchase_rate',
    //   dataIndex: 'purchase_rate', // This remains for the selling_rate
    //   render: (buyingRate, record) => {
    //     // Access currency from the nested outlets object
    //     const currency = record.outlets.currency;
    //     return ${currency} ${buyingRate}; // Format as "Currency SellingRate"
    //   },
    // },

    {
      title: "Outlet",
      dataIndex: ["outlets", "outlet_name"],
      key: "outlet_name",
    },
    // {
    //   title: 'Price',
    //   dataIndex: 'price',
    //   key: 'price',
    //   render: (text) => $${text}, // Format price as currency
    // },
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
          <Link to={`/product-details/${record.id}`} className="action-icon">
            <img src={EyeIcon} alt="View" />
          </Link>
          <Link to={`/edit-product/${record.id}`} className="action-icon">
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
            <Tabletop inputFilter={inputFilter} toggleFilter={toggleFilter} />
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
