import React, { useState } from "react";
import { Upload } from "../../EntryFile/imagePath";
import { supabase } from "../../custom/supabaseClient";
import { useHistory } from "react-router-dom";

const AddProduct = () => {
  const history = useHistory();
  const [productData, setProductData] = useState({
    product_name: "",
    product_img:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsmoor.in%2Fproducts%2Fluxury-couverture-chocolates-box-of-36&psig=AOvVaw3IMD0ZAYnlLEZWHetlReSB&ust=1707060801743000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDF-J2_j4QDFQAAAAAdAAAAABAE",
    barcode: "",
    outlet_id: "",
    selling_rate: "",
    purchase_rate: "",
    stock: "",
    unit_of_measure: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "selling_rate" ||
      name === "purchase_rate" ||
      name === "outlet_id" ||
      name === "stock"
    ) {
      if (!Number.isNaN(Number(value))) {
        setProductData({ ...productData, [name]: value });
      }
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const insertProduct = async () => {
    const isAnyFieldEmpty = Object.values(productData).some(
      (value) => value === ""
    );
    if (isAnyFieldEmpty) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert([productData])
        .select("*");

      if (productError) {
        console.error("Error inserting product:", productError);
        return;
      }

      console.log("Product inserted successfully:", product);
      alert("Product added successfully!");
      history.push("/dream-pos/qintez/products");
    } catch (error) {
      console.error("Error inserting product:", error.message);
    }
  };

  const handleClick = () => {
    history.push("/dream-pos/qintez/products");
    console.log("Close button clicked!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    insertProduct();
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4> Add Products</h4>
              <h6>Create new product</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                        name="product_name"
                        value={productData.product_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Product Image</label>
                      <input
                        type="text"
                        name="product_img"
                        value={productData.product_img}
                        onChange={handleChange}
                      />
                    </div>
                  </div> */}
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Barcode</label>
                      <input
                        type="text"
                        name="barcode"
                        value={productData.barcode}
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
                        value={productData.outlet_id}
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
                        value={productData.selling_rate}
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
                        value={productData.purchase_rate}
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
                        value={productData.stock}
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
                        value={productData.unit_of_measure}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
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
                    <button className="btn btn-submit me-2" type="submit">
                      Submit
                    </button>
                    <button className="btn btn-cancel" onClick={handleClick}>
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

export default AddProduct;
