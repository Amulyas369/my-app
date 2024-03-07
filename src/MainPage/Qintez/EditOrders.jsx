// import React, { useState } from "react";
// import { supabase } from "../../custom/supabaseClient";

// const EditOrders = () => {
//   const [ordersData, setOrdersData] = useState({
//     customer_id: "",
//     balance: "",
//     brand_id: "",
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOrdersData({ ...ordersData, [name]: value });
//   };

//   // Function to insert Orders data
//   const insertOrders = async () => {
//     // Adjustments might be needed to correctly format or validate UUID and numeric fields
//     const { data, error } = await supabase
//       .from("orders")
//       .insert([ordersData]);

//     if (error) {
//       console.error("Error inserting orders data:", error);
//       alert("Error inserting orders data");
//       return;
//     }

//     alert("orders added successfully!");
//     console.log("orders added: ", data);
//   };

//     const [ordersUpdateData] = useState({
//       customer_id: "",
//       balance: "567",
//       brand_id: "3",
//     });

//     // Function to update orders data
//     const updateOrders = async (ordersId) => {
//       let { data: updatedOrders, error: ordersUpdateError } = await supabase
//         .from("orders")
//         .update([ordersUpdateData]) // Update data
//         .eq("id", ordersId); // Where the orders id matches

//       if (ordersUpdateError) {
//         console.error("Error updating orders:", ordersUpdateError);
//         return;
//       }
//       console.log("orders updated successfully:", updatedOrders);
//     };

//     // Example handler for updating product and orders
//     const handleUpdate = async (ordersId) => {
//       // await updateProduct(productId);
//       await updateOrders(ordersId);
//       alert("orders updated successfully!");
//     };

//     // Handle form submission
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       insertOrders();
//       handleUpdate();
//     };

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div  className="page-title" >
//           <h4>Add Orders</h4>
//           <h6>Create new Orders entry</h6>
//           </div>

//         </div>
//         <div className="card">
//           <div className="card-body">
//             <form onSubmit={handleSubmit}>
//               <div className="row">
//                 <div className="col-md-6">
//                   <div className="form-group">
//                     <label>Customer ID (UUID)</label>
//                     <input
//                       type="text"
//                       name="customer_id"
//                       value={ordersData.customer_id}
//                       onChange={handleChange}
//                       className="form-control"
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="form-group">
//                     <label>Balance</label>
//                     <input
//                       type="number"
//                       step="0.01"
//                       name="balance"
//                       value={ordersData.balance}
//                       onChange={handleChange}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="form-group">
//                     <label>Brand ID</label>
//                     <input
//                       type="number"
//                       name="brand_id"
//                       value={ordersData.brand_id}
//                       onChange={handleChange}
//                       className="form-control"
//                     />
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <button type="submit" className="btn btn-primary"  onClick={() => handleUpdate}>
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditOrders;

import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { supabase } from "../../custom/supabaseClient";

const EditOrders = () => {
  const history = useHistory();
  const location = useLocation();
  // Assuming order data is passed through location.state on navigation
  const orderData = location.state?.orderData || {};

  const [ordersData, setOrdersData] = useState({
    space_id: orderData.space_id || "",
    outlet_id: orderData.outlet_id || "",
    customer_id: orderData.customer_id || "",
    status: orderData.status || "Ongoing",
    created_at: orderData.created_at || "",
    shift_id: orderData.shift_id || "",
  });

  // useEffect(() => {
  //   if (!orderData.id) {
  //     alert("No order data provided!");
  //     history.push("/dream-pos/qintez/orders"); // Adjust this to your orders list path
  //   }
  // }, [orderData, history]);

  useEffect(() => {
    const fetchOutletDetails = async () => {
      if (!ordersData.outlet_id) return;

      const { data, error } = await supabase
        .from("outlets")
        .select("first_name, last_name, location, contact_number, address")
        .eq("id", ordersData.outlet_id)
        .single(); // Assuming outlet_id uniquely identifies an outlet

      if (error) {
        console.error("Error fetching outlet details:", error);
      } else {
        // Assuming you want to store these details directly in ordersData
        // Alternatively, store in a separate state variable if preferred
        setOrdersData((prev) => ({ ...prev, ...data }));
      }
    };

    fetchOutletDetails();
  }, [ordersData.outlet_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrdersData({ ...ordersData, [name]: value });
  };

  const updateOrders = async () => {
    if (!orderData.id) return; // Ensure there's an ID for the order to update

    const { error } = await supabase
      .from("orders")
      .update([ordersData])
      .eq("id", orderData.id);

    if (error) {
      console.error("Error updating order:", error);
      alert("Error updating order");
      return;
    }

    alert("Order updated successfully!");
    history.push("/dream-pos/qintez/editorders"); // Redirect to the orders list or the updated order's page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOrders();
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Edit Order</h4>
            <h6>Update order details</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Add form fields for each order attribute */}
              {/* Outlet Details */}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={ordersData.first_name}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={ordersData.last_name}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={ordersData.location}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input
                      type="text"
                      value={ordersData.contact_number}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      value={ordersData.address}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Customer name</label>
                    <input
                      type="text"
                      name="customer_id"
                      value={ordersData.customer_id}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={ordersData.status}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Created At</label>
                    <input
                      type="text"
                      name="created_at"
                      value={ordersData.created_at}
                      // onChange={handleChange}
                      className="form-control"
                      // disabled // Assuming created_at is not editable
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrders;
