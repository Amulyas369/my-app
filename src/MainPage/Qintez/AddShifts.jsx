import React, { useState } from "react";
import { supabase } from "../../custom/supabaseClient";
import { useHistory } from "react-router-dom";

const AddShifts = () => {
  const history = useHistory();

  const [shiftsData, setShiftsData] = useState({
    start_time: "",
    end_time: "",
    profile_id: "",
    outlet_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShiftsData({ ...shiftsData, [name]: value });
  };

  const insertShifts = async () => {
    if (!shiftsData.start_time || !shiftsData.profile_id) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const { data: insertedShiftsData, error: shiftsError } = await supabase
        .from("shifts")
        .insert([
          {
            ...shiftsData,
            start_time: new Date(shiftsData.start_time),
            end_time: shiftsData.end_time
              ? new Date(shiftsData.end_time)
              : null,
          },
        ]);
      if (shiftsError) {
        throw shiftsError;
      }
      alert("Shift added successfully!");
      console.log("Shift added: ", insertedShiftsData);
    } catch (error) {
      console.error("Error inserting shift data:", error.message);
      alert("Error inserting shift data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await insertShifts();
  };

  const handleClick = () => {
    history.push("/dream-pos/qintez/shifts");
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Add Shift</h4>
            <h6>Create new shift entry</h6>
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
                      name="profile_id"
                      value={shiftsData.profile_id}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Outlet ID</label>
                    <input
                      type="number"
                      name="outlet_id"
                      value={shiftsData.outlet_id}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="datetime-local"
                      name="start_time"
                      value={shiftsData.start_time}
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
                      value={shiftsData.end_time}
                      onChange={handleChange}
                      className="form-control"
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

export default AddShifts;
