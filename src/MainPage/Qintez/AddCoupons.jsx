import React, { useState } from "react";
import "react-select2-wrapper/css/select2.css";
import { supabase } from "../../custom/supabaseClient";
import { useHistory } from "react-router-dom";

const AddCoupons = () => {
  const history = useHistory();
  const [couponsData, setCouponsData] = useState({
    coupon_code: "",
    outlet_id: "",
    discount_type: "percent",
    discount_value: 0,
    auto_apply: false,
    valid_for_products: false,
    valid_for_services: false,
    start_date: new Date().toISOString().slice(0, 16),
    end_date: new Date().toISOString().slice(0, 16),
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setCouponsData({ ...couponsData, [name]: finalValue });
  };
  
  const insertCoupon = async () => {
    let { data: coupons, error: couponsError } = await supabase
      .from("coupons")
      .insert([couponsData])
      .select("*");
    if (couponsError) {
      console.error("Error inserting coupon data:", couponsError);
      return;
    }
    console.log("7979 : ", coupons);
    alert("Coupon added successfully!");
    history.push("/dream-pos/qintez/coupons");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await insertCoupon();
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header" style={{ marginBottom: "6px" }}>
          <h4>Add Coupon</h4>
        </div>
        <div className="page-header">
          <h6>Create a new coupon entry</h6>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Coupon Code</label>
                    <input
                      type="text"
                      name="coupon_code"
                      value={couponsData.coupon_code}
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
      value={couponsData.outlet_id}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>
</div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Discount Type</label>
                    <input
                      type="text"
                      name="discount_type"
                      value={couponsData.discount_type}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Discount Value</label>
                    <input
                      type="number"
                      step="0.01"
                      name="discount_value"
                      value={couponsData.discount_value}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="datetime-local"
                      name="start_date"
                      value={couponsData.start_date.slice(0, 16)}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="datetime-local"
                      name="end_date"
                      value={couponsData.end_date.slice(0, 16)}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Valid for Products</label>
                    <select
                      name="valid_for_products"
                      value={couponsData.valid_for_products}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Valid for Services</label>
                    <select
                      name="valid_for_services"
                      value={couponsData.valid_for_services}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Auto Apply</label>
                    <select
                      name="auto_apply"
                      value={couponsData.auto_apply}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
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

export default AddCoupons;
