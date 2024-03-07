import React, { useState } from "react";
import "react-select2-wrapper/css/select2.css";
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const AddCustomers = () => {
  const history = useHistory();
  const selectOptions = useSelector((state) => state.selectOptions);
  const [customersData, setCustomersData] = useState({
    first_name: "",
    brand_id: "",
  });
  const handleChange = (e) => {
    console.log("7979 : ", selectOptions);
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setCustomersData({ ...customersData, [name]: finalValue });
  };
  const insertCustomer = async () => {
    const { data: customers, error: customerError } = await supabase
      .from("customer_brands")
      .insert([customersData])
      .select("*");
    if (customerError) {
      console.error("Error inserting customer brand data:", customerError);
      alert("Error inserting customer data");
      return;
    }
    alert("Customer brand association added successfully!");
    console.log("Added data:>>>>>> ", customers);
    history.push("/dream-pos/qintez/customers");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await insertCustomer();
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div>
            <h4>Add Customer Brand Association</h4>
            <h6>Link a customer to a brand</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="customer_id"
                      value={customersData.brand_id}
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

export default AddCustomers;
