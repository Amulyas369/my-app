/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import FeatherIcon from "feather-icons-react";
import { useSelector } from "react-redux";
import // inventory,
// management,
// marketing,
// orders,
// reports,
// inventoryYellow,
// managementYellow,
// storeYellow,
// reportsYellow,
// marketingYellow,
// ordersYellow,
"../../EntryFile/imagePath"; // Ensure these are the correct paths to your icons

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");

  // const [path, setPath] = useState("");
  // const [userType, setUserType] = useState("");
  const history = useHistory();

  const toggleSidebar = (value) => {
    setSideMenu(value);
  };

  // const handleHover = (itemId) => {
  //   setHoveredItem(itemId);
  // };
  // const toggleSidebarInventory = (value) => {
  //   setSideMenuInventory(value);
  // };

  // const handleHoverInventory = (itemId) => {
  //   setHoveredItemInventory(itemId);
  // };
  // const handleClick = (itemId) => {
  //   setClickedItem((prevItem) => (prevItem === itemId ? "" : itemId));
  //   setHoveredItem(""); // Clear hovered item when a link is clicked
  // };
  // const handleClick = (itemId) => {
  //   setClickedItem(itemId);
  //   setHoveredItem(""); // Clear hovered item when a link is clicked
  // };
  // const handleClickOrders = (itemId) => {
  //   setClickedItem((prevItem) => (prevItem === itemId ? "" : itemId));
  //   if (itemId !== "orders") {
  //     toggleSidebar(isSideMenu == "orders" ? "" : "orders"); // Deselect "Orders" when another item is clicked
  //   }
  //   setHoveredItem(""); // Clear hovered item when a link is clicked
  // };

  // const handleClickInventory = (itemId) => {
  //   // setClickedItem((prevItem) => (prevItem === itemId ? "" : itemId));
  //   setClickedItemInventory((prevItem) => (prevItem === itemId ? "" : itemId));

  //   if (itemId !== "inventory") {
  //     toggleSidebar(isSideMenu == "inventory" ? "" : "inventory"); // Deselect "Orders" when another item is clicked
  //   }
  //   // setHoveredItem("");
  //   setHoveredItemInventory(""); // Clear hovered item when a link is clicked
  // };

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };
  const pageRefresh = (url, page) => {
    history.push(`/dream-pos/${url}/${page}`);
    window.location.reload();
  };
  const location = useLocation();
  let pathname = location.pathname;

  useEffect(() => {
    document.querySelector(".main-wrapper").classList.remove("slide-nav");
    document.querySelector(".sidebar-overlay").classList.remove("opened");
    document.querySelector(".sidebar-overlay").onclick = function () {
      this.classList.remove("opened");
      document.querySelector(".main-wrapper").classList.remove("slide-nav");
    };
  }, [pathname]);
  const exclusionArray = [
    "/reactjs/template/dream-pos/index-three",
    "/reactjs/template/dream-pos/index-four",
    "/reactjs/template/dream-pos/index-two",
    "/reactjs/template/dream-pos/index-one",
  ];
  if (exclusionArray.indexOf(window.location.pathname) >= 0) {
    return "";
  }
  const selectedItemId = useSelector((state) => state.selectedItemId);

  const handleQintezClick = () => {
    console.log("Selected Item ID from Redux:", selectedItemId);
    // Your existing toggle logic for the sidebar
    toggleSidebar(isSideMenu === "Qintez" ? "" : "Qintez");
  };

  // const selectedItemId = useSelector(state => state.selectedItemId);
  return (
    <>
      <div
        className={`sidebar index-4 ${
          pathname.includes("/index-three") ? "d-none" : ""
        }`}
        id="sidebar"
      >
        <Scrollbars>
          <div className="slimScrollDiv ">
            <div className="sidebar-inner slimscroll">
              <div
                id="sidebar-menu"
                className="sidebar-menu"
                onMouseOver={expandMenuOpen}
                onMouseLeave={expandMenu}
              >
                <ul>
                  <li className="submenu-open">
                    <ul>
                      <li
                        className={
                          pathname.includes("dashboard") ? "active" : ""
                        }
                      >
                        <Link to="/dream-pos/dashboard">
                          <FeatherIcon icon="grid" />
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/pos">
                          <FeatherIcon icon="hard-drive" />
                          <span>POS</span>
                        </Link>
                      </li>
                      <li className="submenu">
                        <Link
                          to="#"
                          className={
                            pathname.includes("/dream-pos/orders")
                              ? "subdrop active"
                              : "" || isSideMenu == "orders"
                              ? "subdrop active"
                              : ""
                          }
                          onClick={() =>
                            toggleSidebar(
                              isSideMenu == "orders" ? "" : "orders"
                            )
                          }
                        >
                          <FeatherIcon
                            icon="shopping-cart"
                            style={{ marginRight: "8px" }}
                          />

                          <span>Orders</span>
                          <span className="menu-arrow" />
                        </Link>
                        {isSideMenu == "orders" ? (
                          <ul>
                            <li>
                              <Link
                                to="/dream-pos/qintez/orders"
                                className={
                                  pathname.includes("orders") ? "active" : ""
                                }
                              >
                                <FeatherIcon
                                  icon="shopping-bag"
                                  // className="svg-icon svg-container"
                                  style={{ marginRight: "8px" }}
                                />
                                Orders List{" "}
                                {/* Updated subheading here, if needed */}
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/qintez/payments"
                                className={
                                  pathname.includes("payments") ? "active" : ""
                                }
                              >
                                <FeatherIcon
                                  icon="credit-card"
                                  // className="svg-icon svg-container"
                                  style={{ marginRight: "8px" }}
                                />
                                Payments{" "}
                                {/* Kept the same or update as needed */}
                              </Link>
                            </li>
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>

                      <li className="submenu">
                        <Link
                          to="#"
                          className={
                            pathname.includes("/dream-pos/qintez/customers")
                              ? "subdrop active"
                              : "" || isSideMenu == "customers"
                              ? "subdrop active"
                              : ""
                          }
                          onClick={() =>
                            toggleSidebar(
                              isSideMenu == "customers" ? "" : "customers"
                            )
                          }
                        >
                          <FeatherIcon icon="users" />
                          <span>Customers</span> <span className="menu-arrow" />
                        </Link>
                        {isSideMenu == "customers" ? (
                          <ul>
                            <li>
                              <Link
                                to="/dream-pos/qintez/customers"
                                className={
                                  pathname.includes("customers") ? "active" : ""
                                }
                              >
                                <FeatherIcon
                                  icon="book-open"
                                  // className="svg-icon svg-container"
                                  style={{
                                    marginRight: "8px",
                                    // display: "flex",
                                    // alignItems: "flex-start",
                                  }}
                                />
                                Customers list
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/qintez/memberships"
                                className={
                                  pathname.includes("memberships")
                                    ? "active"
                                    : ""
                                }
                              >
                                <FeatherIcon
                                  icon="user-plus"
                                  // className="svg-icon svg-container"
                                  style={{ marginRight: "8px" }}
                                />
                                Memberships
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/qintez/loyality"
                                className={
                                  pathname.includes("loyality") ? "active" : ""
                                }
                              >
                                <FeatherIcon
                                  icon="gift"
                                  // className="svg-icon svg-container"
                                  style={{ marginRight: "8px" }}
                                />
                                Loyalty
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/qintez/wallets"
                                className={
                                  pathname.includes("wallets") ? "active" : ""
                                }
                              >
                                <FeatherIcon
                                  icon="save"
                                  // className="svg-icon svg-container"
                                  style={{ marginRight: "8px" }}
                                />
                                Wallets
                              </Link>
                            </li>
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                      <li className="submenu">
                        <Link
                          to="#"
                          className={
                            pathname.includes("/dream-pos/inventory")
                              ? "subdrop active"
                              : "" || isSideMenu == "inventory"
                              ? "subdrop active"
                              : ""
                          }
                          onClick={() =>
                            toggleSidebar(
                              isSideMenu == "inventory" ? "" : "inventory"
                            )
                          }
                        >
                          {/* <FeatherIcon icon="users" /> */}
                          <FeatherIcon
                            icon="layers"
                            // className="svg-icon svg-container"
                            style={{ marginRight: "8px" }}
                          />
                          <span>Inventory</span> <span className="menu-arrow" />
                        </Link>

                        {isSideMenu == "inventory" ? (
                          <ul>
                            <li>
                              <Link
                                className={
                                  pathname.includes("transferlist-")
                                    ? "active"
                                    : ""
                                }
                                to="/dream-pos/transfer/transferlist-transfer"
                              >
                                <FeatherIcon
                                  icon="repeat"
                                  // className="svg-icon svg-container"
                                  style={{
                                    marginRight: "8px",
                                    // display: "flex",
                                    // alignItems: "flex-start",
                                  }}
                                />
                                Transfers
                              </Link>
                              <li>
                                <Link
                                  to="/dream-pos/qintez/inventory"
                                  className={
                                    pathname.includes("inventory")
                                      ? "active"
                                      : ""
                                  }
                                >
                                  <FeatherIcon
                                    icon="shuffle"
                                    // className="svg-icon svg-container"
                                    style={{
                                      marginRight: "8px",
                                      // display: "flex",
                                      // alignItems: "flex-start",
                                    }}
                                  />
                                  Transactions
                                </Link>
                              </li>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/qintez/products"
                                className={
                                  pathname.includes("products") ? "active" : ""
                                }
                              >
                                <FeatherIcon
                                  icon="package"
                                  // className="svg-icon svg-container"
                                  style={{
                                    marginRight: "8px",
                                    // display: "flex",
                                    // alignItems: "flex-start",
                                  }}
                                />
                                Products
                              </Link>
                            </li>
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                      <li className="submenu">
                        <Link
                          to="#"
                          className={
                            pathname.includes("/dream-pos/marketing")
                              ? "subdrop active"
                              : "" || isSideMenu == "marketing"
                              ? "subdrop active"
                              : ""
                          }
                          onClick={() =>
                            toggleSidebar(
                              isSideMenu == "marketing" ? "" : "marketing"
                            )
                          }
                        >
                          {" "}
                          {/* <FeatherIcon icon="shuffle" /> */}
                          <FeatherIcon
                            icon="share-2"
                            // className="svg-icon svg-container"
                            style={{ marginRight: "8px" }}
                          />
                          {/*   <img
                            src={marketing}
                            alt="marketing"
                            className="svg-iconsvg-container"
                            style={{ marginRight: "8px" }}
                          /> */}
                          <span>Marketing</span>
                          <span className="menu-arrow"></span>
                        </Link>
                        {isSideMenu == "marketing" ? (
                          <ul>
                            <li>
                              <li>
                                <Link
                                  to="/dream-pos/qintez/coupons"
                                  className={
                                    pathname.includes("coupons") ? "active" : ""
                                  }
                                >
                                  <FeatherIcon
                                    icon="tag"
                                    // className="svg-icon svg-container"
                                    style={{ marginRight: "8px" }}
                                  />
                                  Coupons
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/dream-pos/qintez/memberships"
                                  className={
                                    pathname.includes("memberships")
                                      ? "active"
                                      : ""
                                  }
                                >
                                  <FeatherIcon
                                    icon="key"
                                    // className="svg-icon svg-container"
                                    style={{ marginRight: "8px" }}
                                  />
                                  Memberships
                                </Link>
                              </li>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/qintez/ads"
                                className={
                                  pathname.includes("ads") ? "active" : ""
                                }
                              >
                                <FeatherIcon
                                  icon="camera"
                                  // className="svg-icon svg-container"
                                  style={{
                                    marginRight: "8px",
                                    // display: "flex",
                                    // alignItems: "flex-start",
                                  }}
                                />
                                Self Ads
                              </Link>
                            </li>
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                      <li className="submenu">
                        <Link
                          to="#"
                          className={
                            pathname.includes("/dream-pos/management")
                              ? "subdrop active"
                              : "" || isSideMenu == "management"
                              ? "subdrop active"
                              : ""
                          }
                          onClick={() =>
                            toggleSidebar(
                              isSideMenu == "management" ? "" : "management"
                            )
                          }
                        >
                          {" "}
                          {/* <FeatherIcon icon="shuffle" /> */}
                          <FeatherIcon
                            icon="map"
                            style={{ marginRight: "8px" }}
                          />
                          <span>Outlet Management</span>
                          <span className="menu-arrow"></span>
                        </Link>
                        {isSideMenu == "management" ? (
                          <ul>
                            <li>
                              <Link
                                className={
                                  pathname.includes("rates") ? "active" : ""
                                }
                                to="/dream-pos/qintez/rates"
                              >
                                <FeatherIcon
                                  icon="dollar-sign"
                                  // className="svg-icon svg-container"
                                  style={{
                                    marginRight: "8px",
                                    // display: "flex",
                                    // alignItems: "flex-start",
                                  }}
                                />
                                Rates
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/qintez/spaces"
                                className={
                                  pathname.includes("spaces") ? "active" : ""
                                }
                              >
                                <FeatherIcon
                                  icon="layout"
                                  // className="svg-icon svg-container"
                                  style={{
                                    marginRight: "8px",
                                    // display: "flex",
                                    // alignItems: "flex-start",
                                  }}
                                />
                                Spaces + Rate Assign
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/qintez/stores"
                                className={
                                  pathname.includes("stores") ? "active" : ""
                                }
                              >
                                <FeatherIcon
                                  icon="home"
                                  // className="svg-icon svg-container"
                                  style={{ marginRight: "8px" }}
                                />
                                Stores
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/qintez/shifts"
                                className={
                                  pathname.includes("shifts") ? "active" : ""
                                }
                              >
                                <FeatherIcon
                                  icon="watch"
                                  // className="svg-icon svg-container"
                                  style={{ marginRight: "8px" }}
                                />
                                Shifts
                              </Link>
                            </li>
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>

                      <li className="submenu">
                        <Link
                          to="#"
                          className={
                            pathname.includes("/dream-pos/reports")
                              ? "subdrop active"
                              : "" || isSideMenu == "reports"
                              ? "subdrop active"
                              : ""
                          }
                          onClick={() =>
                            toggleSidebar(
                              isSideMenu == "reports" ? "" : "reports"
                            )
                          }
                        >
                          {/* <FeatherIcon icon="users" /> */}
                          <FeatherIcon
                            icon="trending-up"
                            // className="svg-icon svg-container"
                            style={{ marginRight: "8px" }}
                          />
                          <span>Reports</span> <span className="menu-arrow" />
                        </Link>
                        {isSideMenu == "reports" ? (
                          <ul>
                            <li
                              className={
                                pathname.includes("salesreport") ? "active" : ""
                              }
                            >
                              <Link
                                to="/dream-pos/report/salesreport"
                                className={
                                  pathname.includes("salesreport")
                                    ? "active"
                                    : ""
                                }
                              >
                                {/* <i data-feather="bar-chart-2" /> */}
                                <FeatherIcon icon="bar-chart-2" />
                                <span>Sales Report</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/report/shiftreports"
                                className={
                                  pathname.includes("shiftreports")
                                    ? "active"
                                    : ""
                                }
                              >
                                {/* <i data-feather="pie-chart" /> */}
                                <FeatherIcon icon="calendar" />
                                <span>Shifts report</span>
                              </Link>
                            </li>
                            <li
                              className={
                                pathname.includes("inventoryreport")
                                  ? "active"
                                  : ""
                              }
                            >
                              <Link
                                to="/dream-pos/report/inventoryreport"
                                className={
                                  pathname.includes("inventoryreport")
                                    ? "active"
                                    : ""
                                }
                              >
                                {/* <i data-feather="credit-card" /> */}
                                <FeatherIcon icon="database" />
                                <span>Inventory Report</span>
                              </Link>
                            </li>
                            <li
                              className={
                                pathname.includes("customerreport")
                                  ? "active"
                                  : ""
                              }
                            >
                              <Link
                                to="/dream-pos/report/customerreport"
                                className={
                                  pathname.includes("customerreport")
                                    ? "active"
                                    : ""
                                }
                              >
                                {/* <i data-feather="pie-chart" /> */}
                                <FeatherIcon icon="file" />
                                <span>Customer Report</span>
                              </Link>
                            </li>
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                    </ul>
                  </li>
                  <li className="submenu-open">
                    <h6 className="submenu-hdr">Settings</h6>
                    <ul>
                      <li className="submenu">
                        <Link
                          to="#"
                          className={
                            pathname.includes("/dream-pos/settings")
                              ? "subdrop active"
                              : "" || isSideMenu == "Settings"
                              ? "subdrop active"
                              : ""
                          }
                          onClick={() =>
                            toggleSidebar(
                              isSideMenu == "Settings" ? "" : "Settings"
                            )
                          }
                        >
                          {/* <img src={settings} alt="img" /> */}
                          <FeatherIcon icon="settings" />
                          <span> Settings</span> <span className="menu-arrow" />
                        </Link>
                        {isSideMenu == "Settings" ? (
                          <ul>
                            <li>
                              <Link
                                to="/dream-pos/settings/generalsettings"
                                className={
                                  pathname.includes("generalsettings")
                                    ? "active"
                                    : ""
                                }
                              > <FeatherIcon icon="sliders" />
                                General Settings
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/settings/paymentsettings"
                                className={
                                  pathname.includes("paymentsettings")
                                    ? "active"
                                    : ""
                                }
                              >
                               <FeatherIcon icon="dollar-sign" />
                                Payment Settings
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/settings/taxrates"
                                className={
                                  pathname.includes("taxrates") ? "active" : ""
                                }
                              > <FeatherIcon icon="percent" />
                                Tax Rates
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/settings/users"
                                className={
                                  pathname.includes("users") ? "active" : ""
                                }
                              >
                               <FeatherIcon icon="user" />
                                Users
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/settings/profilesettings"
                                className={
                                  pathname.includes("profilesettings")
                                    ? "active"
                                    : ""
                                }
                              >
                               <FeatherIcon icon="user-check" />
                                Profile Settings
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/dream-pos/settings/grouppemissions"
                                className={
                                  pathname.includes("grouppemissions")
                                    ? "active"
                                    : ""
                                }
                              >
                               <FeatherIcon icon="lock" />
                                Group Permissions
                              </Link>
                            </li>
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                      <li>
                        <Link
                          to="/signIn"
                          className={
                            pathname.includes("signIn") ? "active" : ""
                          }
                        >
                          <FeatherIcon icon="log-out" />
                          <span>Logout</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

export default withRouter(Sidebar);
