import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { supabase } from "../custom/supabaseClient";

const BlankPage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [selectOptions, setSelectOptions] = useState([]);
  const fetchUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error.message);
    } else {
      console.log("User profile:", data);
      setProfile(data);
      sessionStorage.setItem("userProfile", JSON.stringify(data));
      updateSelectOptions(data);
    }
  };
  const updateSelectOptions = async (profileData) => {
    let options = [];
    switch (profileData.user_type) {
      case "superadmin": {
        const { data: brandsForAdmin, error: brandsForAdminError } =
          await supabase
            .from("brands")
            .select("name, outlets(id, outlet_name)");

        if (!brandsForAdminError) {
          options = brandsForAdmin.flatMap((brand) =>
            brand.outlets.map((outlet) => ({
              id: outlet.id,
              text: `${brand.name} -> ${outlet.outlet_name}`,
            }))
          );
        } else {
          console.error("Error fetching brands:", brandsForAdminError.message);
        }
        break;
      }
      case "brandadmin": {
        const brandId = profileData.brand_id; // Assuming brand_id is stored in the user profile
        const { data: outletsForBrandAdmin, error: outletsForBrandAdminError } =
          await supabase
            .from("outlets")
            .select("id, outlet_name")
            .eq("brand_id", brandId);

        if (!outletsForBrandAdminError) {
          options = outletsForBrandAdmin.map((outlet) => ({
            id: outlet.id,
            text: outlet.outlet_name,
          }));
        } else {
          console.error(
            "Error fetching outlets for brand:",
            outletsForBrandAdminError.message
          );
        }
        break;
      }

      case "outletuser": {
        const outletId = profileData.outlet_id; // Assuming outlet_id is stored in the user profile
        const { data: outletForUser, error: outletForUserError } =
          await supabase
            .from("outlets")
            .select("id, outlet_name")
            .eq("id", outletId)
            .single();

        if (!outletForUserError && outletForUser) {
          options = [
            {
              id: outletForUser.id,
              text: outletForUser.outlet_name,
            },
          ];
        } else {
          console.error(
            "Error fetching outlet for user:",
            outletForUserError.message
          );
        }
        break;
      }

      case "customer":
        break;

      default:
        console.error("Unknown user type");
    }
    setSelectOptions(options);
  };
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "superadmin@qintez.app",
      password: "123456",
    });

    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      console.log("User signed in:", data.user);
      setUser(data.user);
      fetchUserProfile(data.user.id);
    }
  };
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("User signed out");
      setUser(null); 
      setProfile(null); 
      sessionStorage.removeItem("userProfile"); 
    }
  };
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          console.log("User signed in:", session.user);
          setUser(session.user); 
          fetchUserProfile(session.user.id); 
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out");
          setUser(null); 
          setProfile(null);
        }
      }
    );
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  return (
    <>
      <div className="page-wrapper pagehead">
        <div className="content">
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Blank Page</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/dream-pos/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Blank Page</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              {user && profile ? (
                <div>
                  <div>Welcome, {user.email}</div>
                  {/* Display additional profile details */}
                  <div>Name: {profile.name}</div>
                  {/* Add more profile details as needed */}
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              ) : (
                <button onClick={handleSignIn}>Sign In</button>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Select2
                className="select"
                data={selectOptions}
                options={{
                  placeholder: "Select State",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlankPage;
