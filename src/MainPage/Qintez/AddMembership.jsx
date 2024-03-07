import React, { useState, useEffect } from "react";
import { supabase } from "../../custom/supabaseClient";
import { useHistory } from "react-router-dom";

const AddMemberships = () => {
  const history = useHistory();
  const [membershipsData, setMembershipsData] = useState({
    name: "",
    price: "",
    validity: 5,
    service_discount: "",
    food_discount: "",
    slots: "",
    brand_id: 1,
  });
  const [brandName, setBrandName] = useState("");
  const fetchBrandName = async () => {
    try {
      const { data, error } = await supabase
        .from("brands")
        .select("brand_name")
        .eq("brand_id", 1)
        .single();

      if (error) {
        console.error("Error fetching brand name:", error.message);
      } else {
        console.log("brand name:", data.name);
        setBrandName(data.name);
      }
    } catch (error) {
      console.error("Error fetching brand name:", error.message);
    }
  };

  useEffect(() => {
    fetchBrandName();
  }, [membershipsData.brand_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMembershipsData({ ...membershipsData, [name]: value });
  };

  const insertMembership = async () => {
    try {
      const { data, error } = await supabase
        .from("memberships")
        .insert([membershipsData]);

      if (error) {
        throw error;
      }

      alert("Membership added successfully!");
      console.log("Membership added:", data);
      history.push("/dream-pos/qintez/memberships");
    } catch (error) {
      console.error("Error inserting membership data:", error.message);
      alert("Error inserting membership data");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const numericFields = [
      "price",
      "service_discount",
      "food_discount",
      "slots",
    ];
    const updatedData = { ...membershipsData };
    let isValid = true;

    numericFields.forEach((field) => {
      if (updatedData[field] === "" || isNaN(updatedData[field])) {
        alert(`Please enter a valid number for ${field}.`);
        isValid = false;
        return;
      } else {
        updatedData[field] = Number(updatedData[field]);
      }
    });

    if (isValid) {
      insertMembership();
    }
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Add Membership</h4>
            <h6>Create new membership entry</h6>
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
                      name="name"
                      value={membershipsData.name}
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
                      value={membershipsData.price}
                      onChange={handleChange}
                      className="form-control"
                      required
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
                      value={membershipsData.service_discount}
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
                      value={membershipsData.food_discount}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Brand</label>
                    <input
                      type="text"
                      name="brand_name"
                      value={brandName}
                      disabled
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Slots</label>
                    <input
                      type="number"
                      name="slots"
                      value={membershipsData.slots}
                      onChange={handleChange}
                      className="form-control"
                      required
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

export default AddMemberships;
