// import React, { useState } from "react";
// import { Upload } from "../../EntryFile/imagePath";
// import Select2 from "react-select2-wrapper";
// import "react-select2-wrapper/css/select2.css";
// import { supabase } from "../../custom/supabaseClient";
// import { useHistory, useLocation } from "react-router-dom";


// const EditProduct = () => {
//   // State for product and inventory data
//   const history = useHistory();
//   const location = useLocation();
//   const productData = location.state.productData;
//   // const [formData, setFormData] = useState({
//   //   product_name: "Chocolates",
//   //   product_img:
//   //     "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsmoor.in%2Fproducts%2Fluxury-couverture-chocolates-box-of-36&psig=AOvVaw3IMD0ZAYnlLEZWHetlReSB&ust=1707060801743000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDF-J2_j4QDFQAAAAAdAAAAABAE",
//   //   barcode: "FKLNDFIAHEFDASD",
//   //   outlet_id: 1,
//   //   selling_rate: 5.6,
//   //   purchase_rate: 10.8,
//   //   stock: 112,
//   //   unit_of_measure: "Pack",
//   // });

//   const [formData, setFormData] = useState({
//     product_name: productData.product_name || '',
//     product_img: productData.product_img || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsmoor.in%2Fproducts%2Fluxury-couverture-chocolates-box-of-36&psig=AOvVaw3IMD0ZAYnlLEZWHetlReSB&ust=1707060801743000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDF-J2_j4QDFQAAAAAdAAAAABAE',
//     barcode: productData.barcode || '',
//     unit_of_measure: productData.unit_of_measure || '',
//     outlet_id: productData.outlet_id || 0,
//     selling_rate: productData.selling_rate || 0,
//     purchase_rate: productData.purchase_rate || 0,
//     stock: productData.stock || 0,

//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const intValue = ["outlet_id", "selling_rate", "purchase_rate", "stock"].includes(name)
//       ? parseInt(value, 10) || 0
//       : value;
//     setFormData({ ...formData, [name]: intValue });
//   };


//   // Function to update product data
//   const updateProduct = async (productId) => {
//     let { data: updatedProduct, error: productUpdateError } = await supabase
//       .from("products")
//       .update([productUpdateData]) // Update data
//       .eq("id", productId); // Where the product id matches

//     if (productUpdateError) {
//       console.error("Error updating product:", productUpdateError);
//       return;
//     }
//     console.log("Product updated successfully:", updatedProduct);
//   };

//   // Function to update inventory data
//   // Example handler for updating product and inventory
//   // const handleUpdate = async (productId) => {
//   //   await updateProduct(productId);
//   //   alert("Product  updated successfully!");
//   // };
//   const handleSubmit = async (productId) => {

//     const isDataEdited = Object.keys(formData).some(
//       key => formData[key] !== productData[key]
//     );
  
//     // If no data is edited, show an alert and return
//     if (!isDataEdited) {
//       alert("No data edited!");
//       return;
//     }
//     e.preventDefault(); // Prevent default form submission behavior
//     await updateProduct(productId);
//     history.push("/dream-pos/qintez/products");
//     alert("Products updated successfully!");
//   };
//   // Assuming you have a way to capture the productId and inventoryId to update
//   // For example, from a form or selection in your UI

//   return (
//     <>
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="page-header">
//             <div className="page-title">
//               <h4> Edit Product</h4>
//               <h6>Edit existing product</h6>
//             </div>
//           </div>
//           {/* /add */}
//           <div className="card">
//             <div className="card-body">
//               <form onClick={handleUpdate}>
//                 <div className="row">
                  
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="form-group">
//                       <label>Product Name</label>
//                       <input type="text" />
//                     </div>
//                   </div>
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="form-group">
//                       <label>Barcode</label>
//                       <input type="text" />
//                     </div>
//                   </div>
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="form-group">
//                       <label>Outlet Id</label>
//                       <input type="text" />
//                     </div>
//                   </div>
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="form-group">
//                       <label> Selling Rate</label>
//                       <input type="text" />
//                     </div>
//                   </div>
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="form-group">
//                       <label>Purchase Rate</label>
//                       <input type="text" />
//                     </div>
//                   </div>
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="form-group">
//                       <label>Stock</label>
//                       <input type="text" />
//                     </div>
//                   </div>
//                   <div className="col-lg-3 col-sm-6 col-12">
//                     <div className="form-group">
//                       <label>Unit Of Measure</label>
//                       <input type="text" />
//                     </div>
//                   </div>
                
//                   <div className="col-lg-12">
//                     <div className="form-group">
//                       <label> Product Image</label>
//                       <div className="image-upload">
//                         <input type="file" />
//                         <div className="image-uploads">
//                           <img src={Upload} alt="img" />
//                           <h4>Drag and drop a file to upload</h4>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-12">
//                     <button
//                       className="btn btn-submit me-2"
//                       onClick={() => handleSubmit(9, 12)}
//                     >
//                       Submit
//                     </button>
//                     <button className="btn btn-cancel" data-bs-dismiss="modal">
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//           {/* /add */}
//         </div>
//       </div>
//     </>
//   );
// };
// export default EditProduct;
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { supabase } from "../../custom/supabaseClient";

const EditProduct = () => {
  const history = useHistory();
  const location = useLocation();
  const productData = location.state.productData;

  const [formData, setFormData] = useState({
    product_name: productData.product_name || "",
    product_img: productData.product_img || "",
    barcode: productData.barcode || "",
    outlet_id: productData.outlet_id || "",
    selling_rate: productData.selling_rate || "",
    purchase_rate: productData.purchase_rate || "",
    stock: productData.stock || "",
    unit_of_measure: productData.unit_of_measure || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const intValue = ["in", "out", "outlet_id", "selling_rate", "purchase_rate", "stock"].includes(name)
    ? parseInt(value, 10) || 0
    : value;
    setFormData({ ...formData, [name]: intValue });
  };

  const updateProduct = async (productId) => {
  
    const { error } = await supabase
    .from("products")
    .update(formData)
    .eq("id", productId);
  if (error) {
    console.error("Error updating products:", error);
    return;
  }
  console.log("Products updated successfully!");
  };

  const handleSubmit = async ( productId) => {
    const isDataEdited = Object.keys(formData).some(
      (key) => formData[key] !== productData[key]
    );

    if (!isDataEdited) {
      alert("No data edited!");
      return;
    }

    await updateProduct(productId);
        alert("Product updated successfully!");
        history.push("/dream-pos/qintez/products");
  };
  const handleDelete = () => {
    history.push("/dream-pos/qintez/products");
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4> Edit Product</h4>
              <h6>Edit existing product</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Product Image</label>
                      <input
                        type="text"
                        name="product_img"
                        value={formData.product_img}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Barcode</label>
                      <input
                        type="text"
                        name="barcode"
                        value={formData.barcode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Outlet Id</label>
                      <input
                        type="text"
                        name="outlet_id"
                        value={formData.outlet_id}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Selling Rate</label>
                      <input
                        type="text"
                        name="selling_rate"
                        value={formData.selling_rate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Purchase Rate</label>
                      <input
                        type="text"
                        name="purchase_rate"
                        value={formData.purchase_rate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Stock</label>
                      <input
                        type="text"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Unit Of Measure</label>
                      <input
                        type="text"
                        name="unit_of_measure"
                        value={formData.unit_of_measure}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button
                      className="btn btn-submit me-2"
                      // onClick={() => handleSubmit(productData.id)}
                      // onClick={() => handleSubmit()}
                      onSubmit={ () =>handleSubmit(productData.id)}
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-cancel"
                    onClick={handleDelete}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
