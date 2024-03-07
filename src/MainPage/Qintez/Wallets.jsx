import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Table from "../../EntryFile/datatable";
import Tabletop from "../../EntryFile/tabletop";
import { DeleteIcon } from "../../EntryFile/imagePath";
import "react-select2-wrapper/css/select2.css";
import { supabase } from "../../custom/supabaseClient";
import { useSelector } from "react-redux";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Lazyloading from "../../components/Lazyloading";

const Wallets = () => {
  const [inputFilter, setInputFilter] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const selectedOutletId = useSelector((state) => state.selectedItemId);

  const fetchCustomerIds = async () => {
    if (!selectedOutletId) return;

   
      const { data: userWallets, error } = await supabase
        .from("user_wallets")
        .select(`
          *,
          profiles:customer_id (first_name, last_name, avatar_url)
        `)
        .eq("brand_id", selectedOutletId);

      if (error) {
        console.error("Error fetching customer IDs:", error);
        return [];
      } else {
        return userWallets.map((item) => item.customer_id);
      }
  };

  const fetchCustomers = async (customerIds) => {
    try {
      setLoading(true);
    const { data: customers, error } = await supabase
      .from("profiles")
      .select(`
        *,
        brands:brand_id (brand_name, description),
        user_wallets!inner(*)
      `)
      .in("id", customerIds);

    if (error) {
      console.error("Error fetching customers:", error);
    } else {
      const filteredData = customers
        .filter((customer) =>
          customer.brands.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((customer) => ({
          ...customer,
          balance: customer.user_wallets?.[0]?.balance,
          created_at:customer.user_wallets?.[0]?.created_at,
        }));
      setData(filteredData);
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    const fetchData = async () => {
      const customerIds = await fetchCustomerIds();
      if (customerIds.length > 0) {
        await fetchCustomers(customerIds);
      }
    };
    fetchData();

    const channel = supabase
      .channel("wallet_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "user_wallets" },
        (payload) => {
          setData((currentData) => [...currentData, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [selectedOutletId, searchTerm]);

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const togglefilter = (value) => {
    setInputFilter(value);
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("user_wallets")
          .delete()
          .match({ id });

        if (error) {
          console.error("Error deleting wallet:", error);
        } else {
          Swal.fire("Deleted!", "Your wallet has been deleted.", "success");
        }
      }
    });
  };

  const columns = [
    {
      title: "Name",
      key: "name_and_avatar",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center",gap:"1rem",justifyContent:"flex-start" }}>
          <div className="outerCircle">
            {record.profiles?.avatar_url ? (
              <img
                src={record.profiles.avatar_url}
                alt="Avatar"
                className="innerCircle"
              />
            ) : (
              <div
              className="innerCircle"
            >
              {record.first_name.charAt(0)}
            </div>
              


              // <AccountCircleIcon style={{ fontSize:"40px",
              //   borderRadius: "50%",
              //   backgroundColor:"#f0f6fc",
              //   outline:"none",
              //   border:"none",
              //   boxShadow: "inset 4px 4px 6px -1px rgba(0,0,0,.2),inset -4px -4px 6px -1px hsla(0,0%,100%,.7),-.5px -.5px 0 #fff,.5px .5px 0 rgba(0,0,0,.15),0 12px 10px -10px rgba(0,0,0,.05)" }} />
            )}
          </div>
          <div style={{color:"#2C4A7F",fontWeight:"700"}}>
            {(record.first_name || "-") +
              " " +
              (record.last_name || "-")}
          </div>
        </div>
      ),
    },
    {
      title: "Brand Name",
      dataIndex: "brands",
      key: "brand_name",
      render: (_, record) =>
      <div style={{color:"#146954", fontWeight:"600"}}>
        {record.brands?.brand_name
          ? record.brands.brand_name
          : record.profiles?.brands?.[0]?.brand_name || "-"}
          </div>
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text) => <div style={{color:"#146954", fontWeight:"600"}}>RM {text}</div>,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => <div style={{color:"#E5E013", fontWeight:"600"}}> {formatDateTime(created_at)}</div>
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="action-icons">
          <button
            onClick={() => confirmDelete(record.wallet_id)}
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
      {loading && <Lazyloading />}
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Wallet List</h4>
            <h6>Manage your wallets</h6>
          </div>
          <div className="page-btn"></div>
        </div>
        <div className="card">
          <div className="card-body">
            <Tabletop
              inputFilter={inputFilter}
              togglefilter={togglefilter}
              onSearchTermChange={handleSearchTermChange}
              columns={columns}
              data={data}
            />
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} rowKey="id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallets;
