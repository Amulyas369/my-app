

import React, { useState } from "react";
import { supabase } from "../../custom/supabaseClient";
import { useHistory, useLocation } from "react-router-dom";

const EditSpaces = () => {
  const history = useHistory();
  const location = useLocation();
  const spacesData = location.state.spacesData;

  const [editSpaceType, setEditSpaceType] = useState(false);
  const [formData, setFormData] = useState({
    space_name: spacesData.space_name || "",
    space_type: spacesData.space_type || "snooker",
    outlet_id: spacesData.outlet_id || 0,
    time_billing: spacesData.time_billing || false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "time_billing" ? e.target.checked : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const updateSpaces = async (spaceId) => {
    const updatedData = {
      // ...formData,
      space_name: formData.space_name,
      space_type: formData.space_type,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("spaces")
      .update(updatedData)
      .eq("space_id", spaceId);
    if (error) {
      console.error("Error updating spaces:", error);
      return;
    }
    console.log("Spaces updated successfully!");
  };

  const handleSubmit = async (spaceId) => {
    const isDataEdited = Object.keys(formData).some(
      (key) => formData[key] !== spacesData[key]
    );

    if (!isDataEdited) {
      alert("No data edited!");
      return;
    }

    await updateSpaces(spaceId);
    history.push("/dream-pos/qintez/spaces");
    alert("Spaces updated successfully!");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Edit Spaces</h4>
            <h6>Edit Spaces Information</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(spacesData.id);
              }}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Space Name</label>
                    <input
                      type="text"
                      name="space_name"
                      value={formData.space_name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Space Type</label>
                    {editSpaceType ? (
                      <select
                        name="space_type"
                        value={formData.space_type}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="snooker">Snooker</option>
                        <option value="food">Food</option>
                        <option value="room">Room</option>
                        <option value="area">Area</option>
                      </select>
                    ) : (
                      <div onClick={() => setEditSpaceType(true)}>
                        {formData.space_type}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Outlet ID</label>
                    <input
                      type="number"
                      name="outlet_id"
                      value={formData.outlet_id}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Time Billing</label>
                    <select
                      name="time_billing"
                      value={formData.time_billing}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
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

export default EditSpaces;
