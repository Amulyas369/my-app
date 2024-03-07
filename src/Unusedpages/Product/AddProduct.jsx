/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { supabase } from "../../custom/supabaseClient";

const options = [
  { id: 1, text: "Product Id", text: "In", text: "Out", text: "Created At" },
  { id: 2, text: "Computers", text: "Computers" },
];
const options1 = [
  {
    id: 1,
    text: "Product Name",
    text: "Product Image",
    text: "Barcode",
    text: "Outlet Id",
  },
  { id: 2, text: "Fruits", text: "Fruits" },
];
const options2 = [
  { id: 1, text: "Choose Brand", text: "Choose Brand" },
  { id: 2, text: "Brand", text: "Brand" },
];
const options3 = [
  { id: 1, text: "Choose Unit", text: "Choose Unit" },
  { id: 2, text: "Unit", text: "Unit" },
];
const options4 = [
  { id: 1, text: "Choose Tax", text: "Choose Tax" },
  { id: 2, text: "2%", text: "2%" },
];
const options5 = [
  { id: 1, text: "Percentage", text: "Percentage" },
  { id: 2, text: "10%", text: "10%" },
  { id: 3, text: "20%", text: "20%" },
];
const options6 = [
  { id: 1, text: "Closed", text: "Closed" },
  { id: 2, text: "Open", text: "Open" },
];

const AddProduct = () => {
  // State for product and inventory data
  const [productData, setProductData] = useState({
    product_name: "Chocolates",
    product_img:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsmoor.in%2Fproducts%2Fluxury-couverture-chocolates-box-of-36&psig=AOvVaw3IMD0ZAYnlLEZWHetlReSB&ust=1707060801743000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDF-J2_j4QDFQAAAAAdAAAAABAE",
    barcode: "FKLNDFIAHEFDASD",
    outlet_id: 1,
    selling_rate: 5.6,
    purchase_rate: 10.8,
    stock: 112,
    unit_of_measure: "Pack",
  });
  const [inventoryData, setInventoryData] = useState({
    in: 2,
    out: 1,
    notes: "",
  });

  // Update product data
  const handleProductChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Update inventory data
  const handleInventoryChange = (e) => {
    setInventoryData({ ...inventoryData, [e.target.name]: e.target.value });
  };

  // Function to insert product and inventory data
  const insertProductAndInventory = async () => {
    let { data: product, error: productError } = await supabase
      .from("products")
      .insert([productData])
      .select("*");

    if (productError) {
      console.error("Error inserting product:", productError);
      return;
    }
    console.log("7979 : ", product);

    const productId = product[0].id; // Assuming the first record is the inserted product

    let { error: inventoryError } = await supabase
      .from("inventory")
      .insert([{ ...inventoryData, product_id: productId }]);

    if (inventoryError) {
      console.error("Error inserting inventory:", inventoryError);
      return;
    }

    console.log("Product and inventory inserted successfully.");
    alert("Product and inventory added successfully!");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    insertProductAndInventory();
  };

  const [productUpdateData, setProductUpdateData] = useState({
    product_name: "Vegetables",
    product_img:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsmoor.in%2Fproducts%2Fluxury-couverture-chocolates-box-of-36&psig=AOvVaw3IMD0ZAYnlLEZWHetlReSB&ust=1707060801743000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDF-J2_j4QDFQAAAAAdAAAAABAE",
    barcode: "YYLLHHDDOOPPUUTT",
    outlet_id: 1,
    selling_rate: 3.3,
    purchase_rate: 6.8,
    stock: 222,
    unit_of_measure: "Kgs",
  });
  const [inventoryUpdateData, setInventoryUpdateData] = useState({
    in: 20,
    out: 11,
    notes: "ABCD Sample Notes",
  });

  // Function to update product data
  const updateProduct = async (productId) => {
    let { data: updatedProduct, error: productUpdateError } = await supabase
      .from("products")
      .update([productUpdateData]) // Update data
      .eq("id", productId); // Where the product id matches

    if (productUpdateError) {
      console.error("Error updating product:", productUpdateError);
      return;
    }
    console.log("Product updated successfully:", updatedProduct);
  };

  // Function to update inventory data
  const updateInventory = async (inventoryId) => {
    let { data: updatedInventory, error: inventoryUpdateError } = await supabase
      .from("inventory")
      .update([inventoryUpdateData]) // Update data
      .eq("id", inventoryId); // Where the inventory id matches

    if (inventoryUpdateError) {
      console.error("Error updating inventory:", inventoryUpdateError);
      return;
    }
    console.log("Inventory updated successfully:", updatedInventory);
  };

  // Example handler for updating product and inventory
  const handleUpdate = async (productId, inventoryId) => {
    await updateProduct(productId);
    await updateInventory(inventoryId);
    alert("Product and inventory updated successfully!");
  };

  // Assuming you have a way to capture the productId and inventoryId to update
  // For example, from a form or selection in your UI

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4> Add Inventory</h4>
              <h6>Create new product</h6>
            </div>
          </div>
          {/* /add */}
          <div className="card">
            <div className="card-body">
              <div className="row">
                {/* <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Product Id</label>
                                        <input type="text" />
                                    </div>
                                </div> */}
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>In</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Out</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Notes</label>
                    <input type="text" />
                  </div>
                </div>

                {/* <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Category</label>
                                        <Select2
                                            className="select"
                                            data={options}
                                            options={{
                                                placeholder: 'Choose Category',
                                            }} />

                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Sub Category</label>
                                        <Select2
                                            className="select"
                                            data={options1}
                                            options={{
                                                placeholder: 'Choose Sub Category',
                                            }} />
                                    </div>
                                </div> */}
                {/* <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Brand</label>
                                        <Select2
                                            className="select"
                                            data={options2}
                                            options={{
                                                placeholder: 'Choose Brand',
                                            }} />
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Unit</label>
                                        <Select2
                                            className="select"
                                            data={options3}
                                            options={{
                                                placeholder: 'Choose Unit',
                                            }} />
                                    </div>
                                </div> */}
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Barcode</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Outlet Id</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label> Selling Rate</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Purchase Rate</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Stock</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Unit Of Measure</label>
                    <input type="text" />
                  </div>
                </div>
                {/* <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" defaultValue={""} />
                                    </div>
                                </div> */}
                {/* <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Tax</label>
                                        <Select2
                                            className="select"
                                            data={options4}
                                            options={{
                                                placeholder: 'Choose Tax',
                                            }} />

                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 col-12"> */}
                {/* <div className="form-group">
                                        <label>Discount Type</label>
                                        <Select2
                                            className="select"
                                            data={options5}
                                            options={{
                                                placeholder: 'Percentage',
                                            }} />
                                    </div>
                                </div> */}
                {/* <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input type="text" />
                                    </div>
                                </div> */}
                {/* <div className="col-lg-3 col-sm-6 col-12">
                                    <div className="form-group">
                                        <label> Status</label>
                                        <Select2
                                            className="select"
                                            data={options6}
                                            options={{
                                                placeholder: 'Choose Product',
                                            }} />
                                    </div>
                                </div> */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <label> Product Image</label>
                    <div className="image-upload">
                      <input type="file" />
                      <div className="image-uploads">
                        <img src={Upload} alt="img" />
                        <h4>Drag and drop a file to upload</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    className="btn btn-submit me-2"
                    onClick={() => handleUpdate(9, 12)}
                  >
                    Submit
                  </button>
                  <button className="btn btn-cancel">Cancel</button>
                </div>
              </div>
            </div>
          </div>
          {/* /add */}
        </div>
      </div>
    </>
  );
};
export default AddProduct;
