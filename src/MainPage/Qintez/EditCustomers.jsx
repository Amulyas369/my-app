import React, { useState } from "react";
import { supabase } from "../../custom/supabaseClient";

const EditCustomers = () => {
  const [customersData, setCustomersData] = useState({
    customer_id: "", // Assuming this is a UUID string input by the user or selected from a list
    brand_id: "1", // Assuming this is selected from a list of brands and matches a bigint brand_id in the database
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomersData({ ...customersData, [name]: value });
  };

  // Function to insert customer-brand association
  const insertCustomer = async () => {
    // Ensure UUID and bigint formats are correctly handled here
    const { data, error } = await supabase
      .from("customer_brands")
      .insert([customersData]);

    if (error) {
      console.error("Error inserting customer brand data:", error);
      alert("Error inserting customer data");
      return;
    }

    alert("Customer brand association added successfully!");
    console.log("Added data: ", data);
  };
  // eslint-disable-next-line no-unused-vars
  const [customersUpdateData, setCustomersUpdateData] = useState({
    customer_id: "", // Assuming this is a UUID string input by the user or selected from a list
    brand_id: "1", // Assuming this is selected from a list of brands and matches a bigint brand_id in the database
  });
  const updateCustomer = async (customerId) => {
    let { data: customersUpdate, error: customersUpdateError } = await supabase
      .from("customer_brands")
      .update([customersUpdateData]) // Update data
      .eq("id", customerId); // Where the Customer id matches

    if (customersUpdateError) {
      console.error("Error updating Customer:", customersUpdateError);
      return;
    }
    console.log("Customer updated successfully:", customersUpdate);
  };

  // Function to update inventory data
  // Example handler for updating Customer and inventory
  const handleUpdate = async (customerId) => {
    await updateCustomer(customerId);
    alert("Customer  updated successfully!");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    insertCustomer();
    updateCustomer();
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <h4>Add Customer Brand Association</h4>
          <h6>Link a customer to a brand</h6>
        </div>
        <div className="card">
          <div className="card-body">
            <form onClick={handleUpdate}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Customer ID (UUID)</label>
                    <input
                      type="text"
                      name="customer_id"
                      value={customersData.customer_id}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Brand ID</label>
                    <input
                      type="number"
                      name="brand_id"
                      value={customersData.brand_id}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onSubmit={handleSubmit}
                  >
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

export default EditCustomers;
