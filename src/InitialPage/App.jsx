import React, { useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import SignIn from "./SignIn";
import ForgetPassword from "./ForgetPassword";
import SignUp from "./SignUp";
import Pos from "./pos/pos";
import DefaultLayout from "./Sidebar/DefaultLayout";
import Error404 from "../MainPage/ErrorPage/Error404";
import Error500 from "../MainPage/ErrorPage/Error500";
import HomeThree from "../MainPage/Home/home3";
import { getStoreAndPersistor } from "../redux/store"; 
export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.includes("signIn") ||
      location.pathname.includes("signUp") ||
      location.pathname.includes("index-three") ||
      location.pathname.includes("forgetPassword")
    ) {
      document.body.classList.add("account-page");
    }
    return () => {
      document.body.classList.remove("account-page");
    };
  }, [location.pathname]);

  if (location.pathname === "/") {
    return <Redirect to="/signIn" />;
  }
  const { store, persistor } = getStoreAndPersistor();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Switch>
          <Route path="/signIn" component={SignIn} />
          <Route path="/forgetPassword" component={ForgetPassword} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/dream-pos" component={DefaultLayout} />
          <Route path="/error-404" component={Error404} />
          <Route path="/error-500" component={Error500} />
          <Route path="/pos" component={Pos} />
          <Route path="/index-three" component={HomeThree} />
        </Switch>
      </PersistGate>
    </Provider>
  );
}
