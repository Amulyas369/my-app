// // import React, { useState } from "react";
// // import { supabase } from "../../custom/supabaseClient";

// // const EditStores = () => {
// //   const [storesData, setStoresData] = useState({
// //     brand_id: "",
// //     outlet_name: "",
// //     location: "",
// //     // contact_info: "",
// //     // address: "",
// //     // vat_gst: "",
// //     // currency: "",
// //   });

// //   // Handle input change
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setStoresData({ ...storesData, [name]: value });
// //   };

// //   // Function to insert outlet data
// //   // const insertOutlet = async () => {
// //   //   const { data: storesData, error: storesError } = await supabase
// //   //   .from("outlets")
// //   //   .insert([storesData]);

// //   //   if (storesError) {
// //   //     console.error("Error inserting outlet data:", storesError);
// //   //     alert("Error inserting outlet data");
// //   //     return;
// //   //   }

// //   //   alert("Outlet added successfully!");
// //   //   console.log("Outlet added: ", storesData);
// //   // };
// //   const updateStores = async (inventoryId) => {
// //     const updatedData = {
// //       ...storesData,
// //       created_at: new Date().toISOString(), // Set created_at to current date and time
// //     };
// //     const { error } = await supabase
// //       .from("outlets")
// //       .update([updatedData])
// //       .eq("id", inventoryId);
// //     if (error) {
// //       console.error("Error updating inventory:", error);
// //       return;
// //     }
// //     console.log("Inventory updated successfully!");
// //   };
// //   // Handle form submission
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // insertOutlet();
// //     updateStores();
// //   };

// //   return (
// //     <div className="page-wrapper">
// //       <div className="content">
// //         <div className="page-header">
// //           <h4>Add Outlet</h4>
// //           <h6>Create new outlet entry</h6>
// //         </div>
// //         <div className="card">
// //           <div className="card-body">
// //             <form onSubmit={handleSubmit}>
// //               <div className="row">
// //                 <div className="col-md-6">
// //                   <div className="form-group">
// //                     <label>Brand ID</label>
// //                     <input
// //                       type="number"
// //                       name="brand_id"
// //                       value={storesData.brand_id}
// //                       onChange={handleChange}
// //                       className="form-control"
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="col-md-6">
// //                   <div className="form-group">
// //                     <label>Outlet Name</label>
// //                     <input
// //                       type="text"
// //                       name="outlet_name"
// //                       value={storesData.outlet_name}
// //                       onChange={handleChange}
// //                       className="form-control"
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="col-md-6">
// //                   <div className="form-group">
// //                     <label>Location</label>
// //                     <input
// //                       type="text"
// //                       name="location"
// //                       value={storesData.location}
// //                       onChange={handleChange}
// //                       className="form-control"
// //                       required
// //                     />
// //                   </div>
// //                 </div>
// //                 <div className="col-12">
// //                   <button type="submit" className="btn btn-primary">
// //                     Submit
// //                   </button>
// //                 </div>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EditStores;

// import React, { useState } from "react";
// import { supabase } from "../../custom/supabaseClient";
// import { useHistory, useLocation } from "react-router-dom";

// const EditStores = () => {
//   const history = useHistory();
//   const location = useLocation();
//   const storeData = location.state.storesData;
//   console.log("Location state:", location.state);

//   const [formData, setFormData] = useState({
//     brand_id: storeData.brand_id || "",
//     outlet_name: storeData.outlet_name || "",
//     location: storeData.location || "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const updateStore = async (storeId) => {
//     const updatedData = {
//       ...formData,
//     };
//     const { error } = await supabase
//       .from("outlets")
//       .update(updatedData)
//       .eq("id", storeId);
//     if (error) {
//       console.error("Error updating store:", error);
//       return;
//     }
//     console.log("Store updated successfully!");
//   };

//   const handleSubmit = async (storeId) => {
//     // Check if any field is edited
//     const isDataEdited = Object.keys(formData).some(
//       (key) => formData[key] !== storeData[key]
//     );

//     // If no data is edited, show an alert and return
//     if (!isDataEdited) {
//       alert("No data edited!");
//       return;
//     }

//     // Update store only if data is edited
//     await updateStore(storeId);
//     history.push("/dream-pos/qintez/stores");
//     alert("Store updated successfully!");
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="page-header">
//           <div className="page-title">
//             <h4>Edit Store</h4>
//             <h6>Edit store entry</h6>
//           </div>
//         </div>
//         <div className="card">
//           <div className="card-body">
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSubmit(storeData.id); // Pass the store ID to handleSubmit
//               }}
//             >
//               <div className="row">
//                 <div className="col-md-6">
//                   <div className="form-group">
//                     <label>Brand ID</label>
//                     <input
//                       type="number"
//                       name="brand_id"
//                       value={formData.brand_id}
//                       onChange={handleChange}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="form-group">
//                     <label>Outlet Name</label>
//                     <input
//                       type="text"
//                       name="outlet_name"
//                       value={formData.outlet_name}
//                       onChange={handleChange}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="form-group">
//                     <label>Location</label>
//                     <input
//                       type="text"
//                       name="location"
//                       value={formData.location}
//                       onChange={handleChange}
//                       className="form-control"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="col-12">
//                   <button type="submit" className="btn btn-primary">
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

// export default EditStores;

import React, { useState } from "react";
import { supabase } from "../../custom/supabaseClient";
import { useHistory, useLocation } from "react-router-dom";

const EditStores = () => {
  const history = useHistory();
  const location = useLocation();
  const storesData = location.state.storesData; // Fix typo here

  const [formData, setFormData] = useState({
    brand_id: storesData.brand_id || "",
    outlet_name: storesData.outlet_name || "",
    location: storesData.location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateStore = async (storeId) => {
    const updatedData = {
      ...formData,
    };
    const { error } = await supabase
      .from("outlets")
      .update(updatedData)
      .eq("id", storeId);
    if (error) {
      console.error("Error updating store:", error);
      return;
    }
    console.log("Store updated successfully!");
  };

  const handleSubmit = async (storeId) => {
    // Check if any field is edited
    const isDataEdited = Object.keys(formData).some(
      (key) => formData[key] !== storesData[key]
    );

    // If no data is edited, show an alert and return
    if (!isDataEdited) {
      alert("No data edited!");
      return;
    }

    // Update store only if data is edited
    await updateStore(storeId);
    history.push("/dream-pos/qintez/stores");
    alert("Store updated successfully!");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Edit Store</h4>
            <h6>Edit store entry</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(storesData.id); // Pass the store ID to handleSubmit
              }}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Brand ID</label>
                    <input
                      type="number"
                      name="brand_id"
                      value={formData.brand_id}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Outlet Name</label>
                    <input
                      type="text"
                      name="outlet_name"
                      value={formData.outlet_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStores;
