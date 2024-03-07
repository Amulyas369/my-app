import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import { PlusIcon, EditIcon, DeleteIcon } from "../../EntryFile/imagePath";
import "react-select2-wrapper/css/select2.css";
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
import formatDate from "../../components/utils";
import { Switch } from "antd";
import Lazyloading from "../../components/Lazyloading";

const Coupons = () => {
  const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const selectedOutletId = useSelector((state) => state.selectedItemId);
  console.log(">>>>>>>>>>3543534", selectedOutletId);

  const fetchData = async () => {
    console.log(">>>>>>>>>>>>>>>898", selectedOutletId);
    try{
      setLoading(true);
    const { data: coupons, error } = await supabase
      .from("coupons")
      .select(
        `
        *,
        outlets:outlet_id (outlet_name)`
      )
      .eq("outlet_id", selectedOutletId);
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      const enhancedCoupons = coupons.map((coupon) => ({
        ...coupon,
        outlet_name: coupon.outlets.outlet_name,
      }));
      const filteredData = enhancedCoupons.filter((coupons) =>
        coupons.coupon_code.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setData(filteredData);
      // setData(enhancedCoupons);
      console.log(">>>>>>>>>>>>>>>898", enhancedCoupons);
    }
  }catch(error){
      console.log(error.message);
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("coupon_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "coupons" },
        (payload) => {
          console.log("New insert:", payload);
          setData((currentData) => [...currentData, payload.new]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedOutletId,searchTerm]);

  const togglefilter = (value) => {
    setInputFilter(value);
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handleAutoApplyChange = async (checked, record) => {
    console.log("129", record.coupons_id);
    console.log("129", checked);
    try {
      const { error } = await supabase
        .from("coupons")
        .update({ auto_apply: checked })
        .match({ coupons_id: record.coupons_id });

      if (error) {
        throw error;
      }
      setData((prevData) =>
        prevData.map((item) =>
          item.coupons_id === record.coupons_id
            ? { ...item, auto_apply: checked }
            : item
        )
      );
    } catch (error) {
      console.error("Error handling toggle change:", error);
    }
  };
  const handleServicesChange = async (checked, record) => {
    console.log("129", record.coupons_id);
    console.log("129", checked);
    try {
      const { error } = await supabase
        .from("coupons")
        .update({ valid_for_services: checked })
        .match({ coupons_id: record.coupons_id });

      if (error) {
        throw error;
      }
      setData((prevData) =>
        prevData.map((item) =>
          item.coupons_id === record.coupons_id
            ? { ...item, valid_for_services: checked }
            : item
        )
      );
    } catch (error) {
      console.error("Error handling toggle change:", error);
    }
  };
  const handleProductsChange = async (checked, record) => {
    console.log("129", record.coupons_id);
    console.log("129", checked);
    try {
      const { error } = await supabase
        .from("coupons")
        .update({ valid_for_products: checked })
        .match({ coupons_id: record.coupons_id });
      if (error) {
        throw error;
      }
      setData((prevData) =>
        prevData.map((item) =>
          item.coupons_id === record.coupons_id
            ? { ...item, valid_for_products: checked }
            : item
        )
      );
    } catch (error) {
      console.error("Error handling toggle change:", error);
    }
  };
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        image: "centered-image",
        position: "center",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("coupons")
          .delete()
          .match({ coupons_id: id });

        if (error) {
          console.error("Error deleting product:", error);
        } else {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          fetchData(); 
        }
      }
    });
  };
  const columns = [
    {
      title: "Coupon Code ",
      dataIndex: "coupon_code",
      key: "coupon_code",
      render:(coupon_code)=><div className="text-primary fs-6 text">{coupon_code}</div>
    },
    {
      title: "Outlet Name",
      dataIndex: ["outlets", "outlet_name"],
      key: "outlet_name",
      render:(outlet_name)=><div className="text-info-emphasis fs-6 text">{outlet_name}</div>
    },
    {
      title: "Discount",
      dataIndex: "discount_value",
      key: "discount_value",
      render:(discount_value)=><div className="text-success fs-6 text">{discount_value} %</div>
    },
    // {
    //   title: "Discount Type",
    //   dataIndex: "discount_type",
    //   key: "discount_type",
    // },
    {
      title: "Auto Apply",
      dataIndex: "auto_apply",
      key: "auto_apply",
      render: (auto_apply, record) => (
        <Switch
          className="switch"
          checked={auto_apply}
          onChange={(checked) => handleAutoApplyChange(checked, record)}
        />
      ),
    },
    {
      title: "Products",
      dataIndex: "valid_for_products",
      key: "valid_for_products",
      render: (valid_for_products, record) => (
        <Switch
          className="switch"
          checked={valid_for_products}
          onChange={(checkedProduct) =>
            handleProductsChange(checkedProduct, record)
          }
        />
      ),
    },
    {
      title: "Services",
      dataIndex: "valid_for_services",
      key: "valid_for_services",
      render: (valid_for_services, record) => (
        <Switch
          className="switch"
          checked={valid_for_services}
          onChange={(checkedServices) =>
            handleServicesChange(checkedServices, record)
          }
        />
      ),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (text) =><div className="text-warning fs-6 text"> {`${formatDate(text)}`}</div> // Format price as currency
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-icons">
          <Link
            to={{
              pathname: `/dream-pos/qintez/editcoupons`,
              state: { record: record },
            }}
            className="action-icon"
          >
            <img src={EditIcon} alt="Edit" />
          </Link>

          <button
            onClick={() => confirmDelete(record.id)}
            className="action-icon"
            style={{ border: "none", background: "none" }}
          >
            <img src={DeleteIcon} alt="Delete" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
       {loading && (
        <Lazyloading/>
       )}
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Coupons List</h4>
            <h6>Manage your coupons</h6>
          </div>
          <div className="page-btn">
            <Link to="/dream-pos/qintez/addcoupons" className="btn btn-added">
              <img src={PlusIcon} alt="img" className="me-1" />
              Add New Coupon
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <Tabletop inputFilter={inputFilter} 
            togglefilter={togglefilter}
            onSearchTermChange={handleSearchTermChange}
            columns={columns} 
            data={data} />
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} rowKey="id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
