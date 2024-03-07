import React, { useState } from "react";
import { supabase } from "../../custom/supabaseClient";

const EditLoyality = () => {
  const [loyalityData, setLoyalityData] = useState({
    customer_id: "13ab90cb-ed8d-4dcd-a1ba-8be64da4935a	",
    brand_name: "123 Snooker",
    points: "20",
       expiration_date: "",
    // points_type: "", // Assuming you have predefined types or a way to input this
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoyalityData({ ...loyalityData, [name]: value });
  };

  // Function to insert loyalty points data
  const insertLoyaltyPoints = async () => {
    const { data, error } = await supabase
      .from("loyalty_points")
      .insert([loyalityData]);

    if (error) {
      console.error("Error inserting loyalty points data:", error);
      alert("Error inserting loyalty points data");
      return;
    }

    alert("Loyalty points added successfully!");
    console.log("Loyalty points added: ", data);
  };
  const [loyalityUpdateData] = useState({
    customer_id: "13ab90cb-ed8d-4dcd-a1ba-8be64da4935a	",
    brand_name: "123 Snooker",
    points: "20",
       expiration_date: "",
    // points_type: "", // Assuming you have predefined types or a way to input this
  });
  const updateLoyalityPoints = async (loyalityId) => {
    let { data: updatedLoyalityPoints, error: loyalityUpdateError } = await supabase
      .from("loyality_points")
      .update([loyalityUpdateData]) // Update data
      .eq("id", loyalityId); // Where the product id matches

    if (loyalityUpdateError) {
      console.error("Error updating Loyality points:", loyalityUpdateError);
      return;
    }
    console.log("Loyality points updated successfully:", updatedLoyalityPoints);
  };
  const handleUpdate = async (loyalityId) => {
    await updateLoyalityPoints(loyalityId);
    alert("Loyality points updated successfully!");
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    insertLoyaltyPoints();
    updateLoyalityPoints();
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <h4>Add Loyalty Points</h4>
          <h6>Create new loyalty points entry</h6>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Customer ID (UUID)</label>
                    <input
                      type="text"
                      name="customer_id"
                      value={loyalityData.customer_id}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Brand Name</label>
                    <input
                      type="text"
                      name="brand_name"
                      value={loyalityData.brand_name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Points</label>
                    <input
                      type="number"
                      step="0.01"
                      name="points"
                      value={loyalityData.points}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                                <div className="col-12">
                  <button type="submit" className="btn btn-primary"
                                       onClick={() => handleUpdate(9, 12)}
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

export default EditLoyality;
