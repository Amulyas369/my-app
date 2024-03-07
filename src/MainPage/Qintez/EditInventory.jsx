  import React, { useState } from "react";
  import { supabase } from "../../custom/supabaseClient";
  import { useHistory, useLocation } from "react-router-dom";

  const EditInventory = () => {
    const history = useHistory();
    const location = useLocation();
    const inventoryData = location.state.inventoryData;

    const [formData, setFormData] = useState({
      in: inventoryData.in || 0,
      out: inventoryData.out || 0,
      notes: inventoryData.notes || "",
      product_id: inventoryData.product_id || "",
      // product_name: inventoryData.products?.product_name || "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      const intValue = ["in", "out"].includes(name)
        ? parseInt(value, 10) || 0
        : value;
      setFormData({ ...formData, [name]: intValue });
    };

    const updateInventory = async (inventoryId) => {

      const updatedData = {
        ...formData,
        created_at: new Date().toISOString(), // Set created_at to current date and time
      };
      const { error } = await supabase
        .from("inventory")
        .update([updatedData])
        .eq("id", inventoryId);
      if (error) {
        console.error("Error updating inventory:", error);
        return;
      }
      console.log("Inventory updated successfully!");
    };
  
    const handleSubmit = async (inventoryId) => {
      // Check if any field is edited
      const isDataEdited = Object.keys(formData).some(
        key => formData[key] !== inventoryData[key]
      );
    
      // If no data is edited, show an alert and return
      if (!isDataEdited) {
        alert("No data edited!");
        return;
      }
    
      // Update inventory only if data is edited
      await updateInventory(inventoryId);
      history.push("/dream-pos/qintez/inventory");
      alert("Inventory updated successfully!");
    };
    

    return (
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
              <form  onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(inventoryData.id); // Pass the inventory ID to handleSubmit
              }}>
               <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="product_name"
                      value={inventoryData.products?.product_name}
                      disabled
                      className="form-control"
                    />
                  </div>
                </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>In (Quantity)</label>
                      <input
                        type="number"
                        name="in"
                        value={formData.in}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Out (Quantity)</label>
                      <input
                        type="number"
                        name="out"
                        value={formData.out}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="form-control"
                      ></textarea>
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

  export default EditInventory;
