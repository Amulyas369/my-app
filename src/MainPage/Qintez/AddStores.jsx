import React, { useState, useEffect } from "react";
import { supabase } from "../../custom/supabaseClient";
import { useHistory } from "react-router-dom";

const AddStores = () => {
  // eslint-disable-next-line no-unused-vars
  // const brandId = 1;
  const history = useHistory();
  const [storesData, setStoreData] = useState({
    brand_id: "1",
    outlet_name: "",
    location: "",
  });
  const [brandName, setBrandName] = useState("");
  const fetchBrandName = async () => {
    try {
      const { data, error } = await supabase
        .from("outlet_brand_view")
        .select("brand_name")
        .eq("brand_id", 1);

      if (error) {
        console.error("Error fetching brand name:", error.message);
      } else {
        console.log("brand name:", data);
        setBrandName(data[0].brand_name);
      }
    } catch (error) {
      console.error("Error fetching brand name:", error.message);
    }
  };
  useEffect(() => {
    fetchBrandName();
  }, [storesData.brand_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData({ ...storesData, [name]: value });
  };

  const insertStores = async () => {
    try {
      const { data, error } = await supabase
        .from("outlets")
        .insert([storesData]);
      console.log(">>>>>>>>50", storesData);

      if (error) {
        console.error("Error inserting store data:", error);

        throw error;
      }
      alert("Stores added successfully!");
      console.log("Stores added:", data);
      history.push("/dream-pos/qintez/stores");
    } catch (error) {
      console.error("Error inserting stores data:", error.message);
      alert("Error inserting stores data");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    insertStores();
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Add Store</h4>
            <h6>Create a new store entry</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
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
                    <label>Store Name</label>
                    <input
                      type="text"
                      name="outlet_name"
                      value={storesData.outlet_name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={storesData.location}
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

export default AddStores;
