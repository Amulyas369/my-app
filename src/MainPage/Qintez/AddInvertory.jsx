import React, { useState, useEffect } from "react";
import { Upload } from "../../EntryFile/imagePath";
import "react-select2-wrapper/css/select2.css";
import { supabase } from "../../custom/supabaseClient";
import { useHistory } from "react-router-dom";

const AddInventory = () => {
  const outletId = 1;
  const [products, setProducts] = useState([]);
  const history = useHistory();
  const [inventoryData, setInventoryData] = useState({
    product_id: "",
    in: "",
    out: "",
    notes: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: fetchedProducts, error } = await supabase
        .from("products")
        .select("id, product_name")
        .eq("outlet_id", outletId);

      if (error) {
        console.error("Error fetching products", error);
      } else {
        setProducts(fetchedProducts);
      }
    };

    fetchProducts();
  }, [outletId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventoryData({ ...inventoryData, [name]: value });
  };

  const handleProductChange = (e) => {
    const selectedproduct_id = e.target.value;
    setInventoryData({ ...inventoryData, product_id: selectedproduct_id });
    console.log(">>>>>>>>>>>>>>>>>4343", selectedproduct_id);
  };

  const insertInventory = async () => {
    const { data: inventory, error: inventoryError } = await supabase
      .from("inventory")
      .insert([inventoryData])
      .select("*");

    if (inventoryError) {
      console.error("Error inserting inventory data", inventoryError);
      return;
    }
    alert("Inventory added successfully!");
    console.log(">>>>>>>>>>>>>>>>>9090", inventory);
    history.push("/dream-pos/qintez/inventory");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inventoryData.product_id) {
      alert("Please select a product.");
      return;
    }
    if (!inventoryData.in || !inventoryData.out) {
      alert("Please fill in all the fields.");
      return;
    }
    insertInventory();
  };

  const handleClick = () => {
    history.push("/dream-pos/qintez/inventory");
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Add Inventory</h4>
              <h6>Create new Inventory</h6>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Product</label>
                      <select
                        name="product_id"
                        value={inventoryData.product_id}
                        onChange={handleProductChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.product_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Inputs for In, Out, and Notes with corrections */}
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>In</label>
                      <input
                        type="text"
                        name="in"
                        value={inventoryData.in}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Out</label>
                      <input
                        type="text"
                        name="out"
                        value={inventoryData.out}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Notes</label>
                      <input
                        type="text"
                        name="notes"
                        value={inventoryData.notes}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  {/* Assuming Upload component works correctly */}
                  {/* Upload input field corrected */}
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Product Image</label>
                      <div className="image-upload">
                        <input type="file" name="image" />
                        {/* Assuming Upload variable holds the correct path */}
                        <div className="image-uploads">
                          <img src={Upload} alt="Upload" />
                          <h4>Drag and drop a file to upload</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button type="submit" className="btn btn-submit me-2">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-cancel"
                      onClick={handleClick}
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

export default AddInventory;
