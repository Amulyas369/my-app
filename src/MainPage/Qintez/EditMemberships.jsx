import React, { useState } from "react";
import { supabase } from "../../custom/supabaseClient";
import { useHistory, useLocation } from "react-router-dom";

const EditMemberships = () => {
  const history = useHistory();
  const location = useLocation();
  const membershipData = location.state.membershipData;

  const [formData, setFormData] = useState({
    name: membershipData.name || "",
    price: membershipData.price || "",
    validity: membershipData.validity || "",
    service_discount: membershipData.service_discount || "",
    food_discount: membershipData.food_discount || "",
    brand_id: membershipData.brand_id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateMembership = async (membershipId) => {
    const updatedData = {
      ...formData,
    };
    const { error } = await supabase
      .from("memberships")
      .update(updatedData)
      .eq("id", membershipId);
    if (error) {
      console.error("Error updating membership:", error);
      return;
    }
    console.log("Membership updated successfully!");
  };

  const handleSubmit = async (membershipId) => {
    // Check if any field is edited
    const isDataEdited = Object.keys(formData).some(
      (key) => formData[key] !== membershipData[key]
    );

    // If no data is edited, show an alert and return
    if (!isDataEdited) {
      alert("No data edited!");
      return;
    }

    // Update membership only if data is edited
    await updateMembership(membershipId);
    history.push("/dream-pos/qintez/memberships");
    alert("Membership updated successfully!");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Edit Membership</h4>
            <h6>Edit membership entry</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(membershipData.id); // Pass the membership ID to handleSubmit
              }}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Validity</label>
                    <input
                      type="text"
                      name="validity"
                      value={formData.validity}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Service Discount (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="service_discount"
                      value={formData.service_discount}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Food Discount (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="food_discount"
                      value={formData.food_discount}
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
                      value={formData.brand_id}
                      onChange={handleChange}
                      className="form-control"
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

export default EditMemberships;
