import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { supabase } from "../../custom/supabaseClient";

const EditShifts = () => {
  const history = useHistory();
  const location = useLocation();
  const shiftData = location.state.shiftData;
  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    start_time: formatDate(shiftData.start_time) || "",
    end_time: formatDate(shiftData.end_time) || "",
    first_name: shiftData.profiles?.first_name || "",
    last_name: shiftData.profiles?.last_name || "",
    outlet_id: shiftData.outlet_id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateShift = async (shiftId) => {
    const updatedData = {
      start_time: formData.start_time,
      end_time: formData.end_time,
      // Add any additional fields you need to update
    };
    const { error } = await supabase
      .from("shifts")
      .update(updatedData)
      .eq("shift_id", shiftId);
    if (error) {
      console.error("Error updating shift:", error);
      return;
    }
    console.log("Shift updated successfully!");
  };

  const handleSubmit = async (shiftId) => {
    // Check if the start time or end time is edited
    const isDataEdited = (
      formData.start_time !== formatDate(shiftData.start_time) ||
      formData.end_time !== formatDate(shiftData.end_time)
    );

    // If date is not edited, show an alert and return
    if (!isDataEdited) {
      alert("No date edited!");
      return;
    }

    // Update shift only if data is edited
    await updateShift(shiftId);
    history.push("/dream-pos/qintez/shifts");
    alert("Shift updated successfully!");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Edit Shift</h4>
            <h6>Edit existing shift entry</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(shiftData.id); // Pass the shift ID to handleSubmit
            }}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="datetime-local"
                      name="start_time"
                      value={formData.start_time}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="datetime-local"
                      name="end_time"
                      value={formData.end_time}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      className="form-control"
                      disabled // Disabled field
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      className="form-control"
                      disabled // Disabled field
                    />
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
                      disabled // Disabled field
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

export default EditShifts;
