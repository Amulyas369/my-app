/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  LoginImage,
  Logo,
  MailIcon,
  GoogleIcon,
  FacebookIcon,
} from "../EntryFile/imagePath";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { supabase } from "../custom/supabaseClient";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/actions";
import Swal from "sweetalert2";

const SignInPage = (props) => {
  const [eye, seteye] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const fetchUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    // if (error) {
    //     console.error('Error fetching user profile:', error.message);
    // } else {
    //     console.log('User profile:', data);
    //     setProfile(data); // Save user profile in state
    // }

    if (error) {
      console.error("Error fetching user profile:", error.message);
    } else {
      console.log("User profile:", data);
      setProfile(data); // Save user profile in state
      console.log(">>>>>>>>3232", data);
      console.log(">>>>>>>>555442", data.user_type);
      sessionStorage.setItem("userProfile", JSON.stringify(data)); // Store profile data in session storage
    }
  };

  const onEyeClick = () => {
    seteye(!eye);
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //     const onSubmit = async (data) => {
  //         console.log('>>>>>>>>565', JSON.stringify(data, null, 2));
  //         console.log('>>>>>>>>565', data.email);

  // const { loginData, error } = await supabase.auth.signInWithPassword({
  //     email:'user@qintez.app',
  //     password: '123456',
  //   })
  //   console.log('>>>>>>>>4242', loginData);
  //   props.history.push('/dream-pos/dashboard')
  //   const { sessionData } = await supabase.auth.getSession()
  // console.log('>>>>>>>>3232', sessionData);
  //     };
  // const handleSignIn = async () => {

  // };
  const handleSignIn = async (formData) => {
    console.log(">>>>>>>>565", formData.email);
    console.log(">>>>>>>>565", formData.password);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
      // email: "user@qintez.app",
      // password: "123456",
    });

    if (error) {
      console.error("Error signing in:", error.message);
      Swal.fire({
        title: "Oops!",
        text: error.message,
        icon: "question",
      });
    } else {
      console.log("User signed in:", data.user);
      setUser(data.user); // Save user details in state
      fetchUserProfile(data.user.id); // Fetch and save user profile details
      props.history.push("/dream-pos/dashboard");
    }
  };
  // const onSubmit = async (data) => {
  //     console.log('>>>>>>>>565', JSON.stringify(data, null, 2));
  //     console.log('>>>>>>>>565', data.email);
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //         email: 'user@qintez.app',
  //         password: '123456',
  //     });

  //     if (error) {
  //         console.error('Error signing in:', error.message);
  //     } else {
  //         console.log('User signed in:', data.user);
  //         setUser(data.user); // Save user details in state
  //         fetchUserProfile(data.user.id); // Fetch and save user profile details
  //     }
  //     // const { sessionData, error } = await supabase.auth.signInWithPassword({
  //     //   email: 'user@qintez.app',
  //     //   password: '123456',
  //     // });
  //     // console.log('>>>>>556', sessionData);

  //     // if (error) {
  //     //   console.error('Error signing in:', error.message);
  //     //   return; // Stop execution if there's an error
  //     // }

  //     console.log('>>>>>>>>4242', sessionData?.user?.id);
  //     props.history.push('/dream-pos/dashboard');

  //     // Get the user session after successful login
  //     const { session, error: sessionError } = await supabase.auth.getUser();
  //     if (sessionError) {
  //         console.error('Error getting session:', sessionError.message);

  //         return; // Stop execution if there's an error
  //       }

  //     console.log('>>>>>>>>3232', session);
  //   };
  const dispatch = useDispatch();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          console.log("User signed in:", session.user);
          setUser(session.user); // Update user details in state
          fetchUserProfile(session.user.id); // Fetch and save user profile details
          dispatch(setUserId(session.user.id));
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out");
          setUser(null); // Clear user details from state
          setProfile(null); // Clear user profile details from state
        }
      }
    );

    return () => {
      // authListener.unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //     console.log('hi');
  //     window.location.reload();
  //   }, []);
  useEffect(() => {
    // console.log('hi');

    if (!localStorage.getItem("reloaded")) {
      localStorage.setItem("reloaded", true);
      window.location.reload();
    }
  }, []);
  return (
    <>
      <div className="main-wrapper">
        <Helmet>
          <title>SignIn - Qintez</title>
          <meta name="description" content="SignIn page" />
        </Helmet>
        <div className="account-content">
          <div className="login-wrapper">
            <div className="login-content">
              <div className="login-userset">
                <form onSubmit={handleSubmit(handleSignIn)}>
                  <div className="login-logo">
                    <img src={Logo} alt="img" />
                  </div>
                  <div className="login-userheading">
                    <h3>Sign In</h3>
                    <h4>Please login to your account</h4>
                  </div>
                  <div className="form-login">
                    <label>Email</label>
                    <div className="form-addons">
                      <input
                        type="text"
                        {...register("email")}
                        className={` ${errors.email ? "is-invalid" : ""}`}
                        placeholder="Enter your email address"
                        // defaultValue="admin@dreamguystech.com"
                      />
                      <img src={MailIcon} alt="img" />
                      <div className="invalid-feedback">
                        {errors.email?.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-login">
                    <label>Password</label>
                    <div className="pass-group">
                      <input
                        type={eye ? "password" : "text"}
                        className={` ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Enter your password"
                        {...register("password")}
                        defaultValue={123456}
                      />
                      <span
                        onClick={onEyeClick}
                        className={`fas toggle-password ${
                          eye ? "fa-eye-slash" : "fa-eye"
                        } `}
                      />
                      <div className="invalid-feedback">
                        {errors.password?.message}
                      </div>
                    </div>
                  </div>
                  <div className="form-login">
                    <div className="alreadyuser">
                      <h4>
                        <Link to="/forgetPassword" className="hover-a">
                          Forgot Password?
                        </Link>
                      </h4>
                    </div>
                  </div>
                  <div className="form-login">
                    <button className="btn btn-login">Sign In</button>
                  </div>
                </form>
                <div className="signinform text-center">
                  <h4>
                    Don’t have an account?{" "}
                    <Link to="/signUp" className="hover-a">
                      Sign Up
                    </Link>
                  </h4>
                </div>

                <div className="form-setlogin">
                  <h4>Or sign up with</h4>
                </div>
                <div className="form-sociallink">
                  <ul>
                    <li>
                      <Link to="/signin">
                        <img src={GoogleIcon} className="me-2" alt="google" />
                        Sign Up using Google
                      </Link>
                    </li>
                    <li>
                      <Link to="/signin">
                        <img src={FacebookIcon} className="me-2" alt="google" />
                        Sign Up using Facebook
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="login-img">
              <img src={LoginImage} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
