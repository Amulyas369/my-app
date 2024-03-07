/* eslint-disable react/prop-types */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductLists from "../../Unusedpages/ProductList";
import Coupons from "./Coupons";
import Loyality from "./Loyality";
import inventory from "./Inventory";
import Spaces from "./Spaces";
import Memberships from "./Memberships";
import Shifts from "./Shifts";
import Orders from "./Orders";
import Wallets from "./Wallets";
import Customers from "./Customers";
import AddCoupons from "./AddCoupons";
import AddInventory from "./AddInvertory";
import AddLoyalty from "./EditLoyality";
import AddMemberships from "./AddMembership";
import AddStores from "./AddStores";
import AddProduct from "./AddProducts";
import AddShifts from "./AddShifts";
import AddCustomers from "./AddCustomers";
import EditCoupons from "./EditCoupons";
import EditInventory from "./EditInventory";
import EditProduct from "./EditProduct";
import Stores from "./Stores";
import EditStores from "./EditStores";
import EditLoyality from "./EditLoyality";
import EditOrders from "./EditOrders";
import ProductList from "./Products";
import EditShifts from "./EditShifts";
import EditMemberships from "./EditMemberships";
import EditCustomers from "./EditCustomers";
import AddSpaces from "./AddSpaces";
import Payments from "./Payments";

const Qintez = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/tables-basic`} />
    <Route path={`${match.url}productlist`} component={ProductLists} />
    <Route path={`${match.url}/products`} component={ProductList} />
    <Route path={`${match.url}/coupons`} component={Coupons} />
    <Route path={`${match.url}/inventory`} component={inventory} />
    <Route path={`${match.url}/loyality`} component={Loyality} />
    <Route path={`${match.url}/stores`} component={Stores} />
    <Route path={`${match.url}/memberships`} component={Memberships} />
    <Route path={`${match.url}/spaces`} component={Spaces} />
    <Route path={`${match.url}/shifts`} component={Shifts} />
    <Route path={`${match.url}/orders`} component={Orders} />
    <Route path={`${match.url}/payments`} component={Payments} />
    <Route path={`${match.url}/customers`} component={Customers} />
    <Route path={`${match.url}/wallets`} component={Wallets} />
    <Route path={`${match.url}/addcoupons`} component={AddCoupons} />
    <Route path={`${match.url}/addinventory`} component={AddInventory} />
    <Route path={`${match.url}/addloyality`} component={AddLoyalty} />
    <Route path={`${match.url}/addmemberships`} component={AddMemberships} />
    <Route path={`${match.url}/editorders`} component={EditOrders} />
    <Route path={`${match.url}/addoutlets`} component={AddStores} />
    <Route path={`${match.url}/addproducts`} component={AddProduct} />
    <Route path={`${match.url}/addshifts`} component={AddShifts} />
    <Route path={`${match.url}/addspaces`} component={AddSpaces} />
    <Route path={`${match.url}/addcustomers`} component={AddCustomers} />
    <Route path={`${match.url}/editcoupons`} component={EditCoupons} />
    <Route path={`${match.url}/editinventory`} component={EditInventory} />
    <Route path={`${match.url}/editproducts`} component={EditProduct} />
    <Route path={`${match.url}/editstores`} component={EditStores} />
    <Route path={`${match.url}/editinventory`} component={EditInventory} />
    <Route path={`${match.url}/editloyality`} component={EditLoyality} />
    <Route path={`${match.url}/editshifts`} component={EditShifts} />
    <Route path={`${match.url}/editmemberships`} component={EditMemberships} />
    <Route path={`${match.url}/editcustomers`} component={EditCustomers} />
    <Route path={`${match.url}/editcustomers`} component={EditCustomers} />
  </Switch>
);

export default Qintez;
