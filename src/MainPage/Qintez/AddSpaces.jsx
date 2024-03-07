import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "../../custom/supabaseClient";

const AddSpaces = () => {
  const history = useHistory();
  const [spaceData, setSpaceData] = useState({
    space_name: "",
    space_size: "",
    space_type: "",
    icon: "",
    time_billing: "false",
    qr_code: "",
    outlet_id: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSpaceData({
      ...spaceData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const insertSpace = async () => {
    if (
      !spaceData.space_name ||
      !spaceData.space_type ||
      !spaceData.time_billing
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const submissionData = {
      ...spaceData,
      outlet_id: spaceData.outlet_id ? parseInt(spaceData.outlet_id) : null,
      time_billing: spaceData.time_billing === "true",
    };
    let { data: space, error: spaceError } = await supabase
      .from("spaces")
      .insert([submissionData])
      .select("*");
    if (spaceError) {
      console.error("Error inserting space:", spaceError);
      return;
    }
    console.log("Space inserted successfully:", space);
    alert("Space added successfully!");
    history.push("/dream-pos/qintez/spaces");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    insertSpace();
  };
  const handleClick = () => {
    history.push("/dream-pos/qintez/spaces");
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header" style={{ marginBottom: "6px" }}>
          <h4>Add Spaces</h4>
        </div>
        <div className="page-header">
          <h6>Create a new space entry</h6>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Space Name</label>
                    <input
                      type="text"
                      name="space_name"
                      className="form-control"
                      value={spaceData.space_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Space Type</label>
                    <select
                      name="space_type"
                      value={spaceData.space_type}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Snooker">Snooker</option>
                      <option value="Food">Food</option>
                      <option value="Room">Room</option>
                      <option value="Area">Area</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Time Billing</label>
                    <select
                      name="time_billing"
                      value={spaceData.time_billing}
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Outlet Name</label>
                    <input
                      type="number"
                      name="outlet_id"
                      className="form-control"
                      value={spaceData.outlet_id}
                      onChange={handleChange}
                    />
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
  );
};

export default AddSpaces;
