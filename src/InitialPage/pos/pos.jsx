// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// import React, { useEffect, useState } from "react";
// import Header from "./posheader";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import POS from "./posleft";
// import Transactions from "./transactions";
// import Select2 from "react-select2-wrapper";
// import "react-select2-wrapper/css/select2.css";
// import { useSelector } from "react-redux";

// import {
//   Product34,
//   wallet1,
//   transcation,
//   trash12,
//   scan,
//   Edit6,
//   pause1,
//   debitcard,
//   cash,
//   Product30,
//   Product31,
//   Product35,
//   delete2,
//   ellipise1,
//   scanner1,
// } from "../../EntryFile/imagePath";

// const Pos = () => {
//   const userId = useSelector((state) => state.userId); // TO GET THE USER_ID
//   const selectedOutletId = useSelector((state) => state.selectedItemId); // TO GET THE OUTLET_ID

//   console.log(">>>>>>>>>>>>>1234", userId);
//   console.log(">>>>>>>>>>>>>5678", selectedOutletId);

//   useEffect(() => {
//     $("ul.tabs li").click(function () {
//       var $this = $(this);
//       var $theTab = $(this).attr("id");
//       console.log($theTab);
//       if ($this.hasClass("active")) {
//         // do nothing
//       } else {
//         $this
//           .closest(".tabs_wrapper")
//           .find("ul.tabs li, .tabs_container .tab_content")
//           .removeClass("active");
//         $(
//           '.tabs_container .tab_content[data-tab="' +
//             $theTab +
//             '"], ul.tabs li[id="' +
//             $theTab +
//             '"]'
//         ).addClass("active");
//       }
//     });
//     $(document).on("click", ".productset", function () {
//       $(this).toggleClass("active");
//     });
//   });
//   const confirmText = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       type: "warning",
//       showCancelButton: !0,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//       confirmButtonClass: "btn btn-primary",
//       cancelButtonClass: "btn btn-danger ml-1",
//       buttonsStyling: !1,
//     }).then(function (t) {
//       t.value &&
//         Swal.fire({
//           type: "success",
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           confirmButtonClass: "btn btn-success",
//         });
//     });
//   };
//   const [counter, setCounter] = useState(0);
//   const [counter1, setCounter1] = useState(0);
//   const [counter2, setCounter2] = useState(0);
//   const [counter3, setCounter3] = useState(0);

//   const options = [
//     { id: 1, text: "Walk-in Customer", text1: "Walk-in Customer" },
//     { id: 2, text: "Chris Moris", text2: "Chris Moris" },
//   ];
//   const options1 = [
//     { id: 1, text: "Product", text1: "Product" },
//     { id: 2, text: "Barcode", text2: "Barcode" },
//   ];
//   const options2 = [
//     { id: 1, text: "Exclusive", text1: "Exclusive" },
//     { id: 2, text: "Inclusive", text2: "Inclusive" },
//   ];
//   return (
//     <>
//       <div className="main-wrappers">
//         <Header />
//         <div className="page-wrapper ms-0">
//           <div className="content">
//             <div className="row">
//               <POS />
//               <div className="col-lg-4 col-sm-12 ">
//                 <div className="order-list">
//                   <div className="orderid">
//                     <h4>Order List</h4>
//                     <h5>Transaction id : #65565</h5>
//                   </div>
//                   <div className="actionproducts">
//                     <ul>
//                       <li>
//                         <Link
//                           to="#"
//                           className="deletebg confirm-text"
//                           onClick={confirmText}
//                         >
//                           <img src={delete2} alt="img" />
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="#"
//                           data-bs-toggle="dropdown"
//                           aria-expanded="false"
//                           className="dropset"
//                         >
//                           <img src={ellipise1} alt="img" />
//                         </Link>
//                         <ul
//                           className="dropdown-menu"
//                           aria-labelledby="dropdownMenuButton"
//                           data-popper-placement="bottom-end"
//                         >
//                           <li>
//                             <Link to="#" className="dropdown-item">
//                               Action
//                             </Link>
//                           </li>
//                           <li>
//                             <Link to="#" className="dropdown-item">
//                               Another Action
//                             </Link>
//                           </li>
//                           <li>
//                             <Link to="#" className="dropdown-item">
//                               Something Elses
//                             </Link>
//                           </li>
//                         </ul>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="card card-order">
//                   <div className="card-body">
//                     <div className="row">
//                       <div className="col-12">
//                         <Link
//                           to="#"
//                           className="btn btn-adds"
//                           data-bs-toggle="modal"
//                           data-bs-target="#create"
//                         >
//                           <i className="fa fa-plus me-2" />
//                           Add Customer
//                         </Link>
//                       </div>
//                       <div className="col-lg-12">
//                         <div className="select-split ">
//                           <div className="select-group w-100">
//                             <Select2
//                               className="select"
//                               data={options}
//                               options={{
//                                 placeholder: "Walk-in Customer",
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-lg-12">
//                         <div className="select-split">
//                           <div className="select-group w-100">
//                             <Select2
//                               className="select"
//                               data={options1}
//                               options={{
//                                 placeholder: "Product",
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <div className="text-end">
//                           <Link to="#" className="btn btn-scanner-set">
//                             <img src={scanner1} alt="img" className="me-2" />
//                             Scan bardcode
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="split-card"></div>
//                   <div className="card-body pt-0">
//                     <div className="totalitem">
//                       <h4>Total items : 4</h4>
//                       <Link to="#">Clear all</Link>
//                     </div>
//                     <div className="product-table">
//                       <ul className="product-lists">
//                         <li>
//                           <div className="productimg">
//                             <div className="productimgs">
//                               <img src={Product30} alt="img" />
//                             </div>
//                             <div className="productcontet">
//                               <h4>Pineapple</h4>
//                               <div className="productlinkset">
//                                 <h5>PT001</h5>
//                               </div>
//                               <div className="increment-decrement">
//                                 <div className="input-groups">
//                                   <input
//                                     onClick={() => setCounter(counter - 1)}
//                                     type="button"
//                                     defaultValue="-"
//                                     className="button-minus dec button"
//                                   />
//                                   <input
//                                     type="text"
//                                     name="child"
//                                     value={counter}
//                                     className="quantity-field"
//                                   />
//                                   <input
//                                     onClick={() => setCounter(counter + 1)}
//                                     type="button"
//                                     defaultValue="+"
//                                     className="button-plus inc button "
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                         <li>3000.00 </li>
//                         <li>
//                           <Link
//                             to="#"
//                             className="confirm-text"
//                             onClick={confirmText}
//                           >
//                             <img src={delete2} alt="img" />
//                           </Link>
//                         </li>
//                       </ul>
//                       <ul className="product-lists">
//                         <li>
//                           <div className="productimg">
//                             <div className="productimgs">
//                               <img src={Product34} alt="img" />
//                             </div>
//                             <div className="productcontet">
//                               <h4>Green Nike</h4>
//                               <div className="productlinkset">
//                                 <h5>PT001</h5>
//                               </div>
//                               <div className="increment-decrement">
//                                 <div className="input-groups">
//                                   <input
//                                     onClick={() => setCounter1(counter1 - 1)}
//                                     type="button"
//                                     defaultValue="-"
//                                     className="button-minus dec button"
//                                   />
//                                   <input
//                                     type="text"
//                                     name="child"
//                                     value={counter1}
//                                     className="quantity-field"
//                                   />
//                                   <input
//                                     onClick={() => setCounter1(counter1 + 1)}
//                                     type="button"
//                                     defaultValue="+"
//                                     className="button-plus inc button "
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                         <li>3000.00 </li>
//                         <li>
//                           <Link
//                             to="#"
//                             className="confirm-text"
//                             onClick={confirmText}
//                           >
//                             <img src={delete2} alt="img" />
//                           </Link>
//                         </li>
//                       </ul>
//                       <ul className="product-lists">
//                         <li>
//                           <div className="productimg">
//                             <div className="productimgs">
//                               <img src={Product35} alt="img" />
//                             </div>
//                             <div className="productcontet">
//                               <h4>Banana</h4>
//                               <div className="productlinkset">
//                                 <h5>PT001</h5>
//                               </div>
//                               <div className="increment-decrement">
//                                 <div className="input-groups">
//                                   <input
//                                     onClick={() => setCounter2(counter2 - 1)}
//                                     type="button"
//                                     defaultValue="-"
//                                     className="button-minus dec button"
//                                   />
//                                   <input
//                                     type="text"
//                                     name="child"
//                                     value={counter2}
//                                     className="quantity-field"
//                                   />
//                                   <input
//                                     onClick={() => setCounter2(counter2 + 1)}
//                                     type="button"
//                                     defaultValue="+"
//                                     className="button-plus inc button "
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                         <li>3000.00 </li>
//                         <li>
//                           <Link
//                             to="#"
//                             className="confirm-text"
//                             onClick={confirmText}
//                           >
//                             <img src={delete2} alt="img" />
//                           </Link>
//                         </li>
//                       </ul>
//                       <ul className="product-lists">
//                         <li>
//                           <div className="productimg">
//                             <div className="productimgs">
//                               <img src={Product31} alt="img" />
//                             </div>
//                             <div className="productcontet">
//                               <h4>Strawberry</h4>
//                               <div className="productlinkset">
//                                 <h5>PT001</h5>
//                               </div>
//                               <div className="increment-decrement">
//                                 <div className="input-groups">
//                                   <input
//                                     onClick={() => setCounter3(counter3 - 1)}
//                                     type="button"
//                                     defaultValue="-"
//                                     className="button-minus dec button"
//                                   />
//                                   <input
//                                     type="text"
//                                     min={0}
//                                     name="child"
//                                     value={counter3}
//                                     className="quantity-field"
//                                   />
//                                   <input
//                                     onClick={() => setCounter3(counter3 + 1)}
//                                     type="button"
//                                     defaultValue="+"
//                                     className="button-plus inc button "
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                         <li>3000.00 </li>
//                         <li>
//                           <Link
//                             to="#"
//                             className="confirm-text"
//                             onClick={confirmText}
//                           >
//                             <img src={delete2} alt="img" />
//                           </Link>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                   <div className="split-card"></div>
//                   <div className="card-body pt-0 pb-2">
//                     <div className="setvalue">
//                       <ul>
//                         <li>
//                           <h5>Subtotal </h5>
//                           <h6>55.00$</h6>
//                         </li>
//                         <li>
//                           <h5>Tax </h5>
//                           <h6>5.00$</h6>
//                         </li>
//                         <li className="total-value">
//                           <h5>Total</h5>
//                           <h6>60.00$</h6>
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="setvaluecash">
//                       <ul>
//                         <li>
//                           <Link to="#" className="paymentmethod">
//                             <img src={cash} alt="img" className="me-2" />
//                             Cash
//                           </Link>
//                         </li>
//                         <li>
//                           <Link to="#" className="paymentmethod">
//                             <img src={debitcard} alt="img" className="me-2" />
//                             Debit
//                           </Link>
//                         </li>
//                         <li>
//                           <Link to="#" className="paymentmethod">
//                             <img src={scan} alt="img" className="me-2" />
//                             Scan
//                           </Link>
//                         </li>
//                       </ul>
//                     </div>
//                     <div className="btn-totallabel">
//                       <h5>Checkout</h5>
//                       <h6>60.00$</h6>
//                     </div>
//                     <div className="btn-pos">
//                       <ul>
//                         <li>
//                           <Link to="#" className="btn">
//                             <img src={pause1} alt="img" className="me-1" />
//                             Hold
//                           </Link>
//                         </li>
//                         <li>
//                           <Link to="#" className="btn">
//                             <img src={Edit6} alt="img" className="me-1" />
//                             Quotation
//                           </Link>
//                         </li>
//                         <li>
//                           <Link to="#" className="btn">
//                             <img src={trash12} alt="img" className="me-1" />
//                             Void
//                           </Link>
//                         </li>
//                         <li>
//                           <Link to="#" className="btn">
//                             <img src={wallet1} alt="img" className="me-1" />
//                             Payment
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             to="#"
//                             className="btn"
//                             data-bs-toggle="modal"
//                             data-bs-target="#recents"
//                           >
//                             <img src={transcation} alt="img" className="me-1" />{" "}
//                             Transaction
//                           </Link>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         className="modal fade"
//         id="create"
//         tabIndex={-1}
//         aria-labelledby="create"
//         aria-hidden="true"
//       >
//         <div
//           className="modal-dialog modal-lg modal-dialog-centered"
//           role="document"
//         >
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Create</h5>
//               <button
//                 type="button"
//                 className="close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               >
//                 <span aria-hidden="true">×</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="row">
//                 <div className="col-lg-6 col-sm-12 col-12">
//                   <div className="form-group">
//                     <label>Customer Name</label>
//                     <input type="text" />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-sm-12 col-12">
//                   <div className="form-group">
//                     <label>Email</label>
//                     <input type="text" />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-sm-12 col-12">
//                   <div className="form-group">
//                     <label>Phone</label>
//                     <input type="text" />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-sm-12 col-12">
//                   <div className="form-group">
//                     <label>Country</label>
//                     <input type="text" />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-sm-12 col-12">
//                   <div className="form-group">
//                     <label>City</label>
//                     <input type="text" />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-sm-12 col-12">
//                   <div className="form-group">
//                     <label>Address</label>
//                     <input type="text" />
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-12">
//                 <Link to="#" className="btn btn-submit me-2">
//                   Submit
//                 </Link>
//                 <Link to="#" className="btn btn-cancel" data-bs-dismiss="modal">
//                   Cancel
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Transactions />
//     </>
//   );
// };

// export default Pos;

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Header from "./posheader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import POS from "./posleft";
import Transactions from "./transactions";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { useSelector } from "react-redux";
import { supabase } from "../../custom/supabaseClient";
import ProductsGridModal from './ProductsGridModal'; // Adjust the path as necessary


import {
  Product34,
  wallet1,
  transcation,
  trash12,
  scan,
  Edit6,
  pause1,
  debitcard,
  cash,
  Product30,
  Product31,
  Product35,
  delete2,
  ellipise1,
  scanner1,
} from "../../EntryFile/imagePath";

const Pos = () => {
  // Define a state for options
  const [customerList, setOptions] = useState([
    { id: 1, text: "Walk-in Customer", text1: "Walk-in Customer" },
  ]);
  const userId = useSelector((state) => state.userId); // TO GET THE USER_ID
  const selectedOutletId = useSelector((state) => state.selectedItemId); // TO GET THE OUTLET_ID
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const [products, setProducts] = useState([]); // Initialize with empty array
  const [categories, setCategories] = useState([]); // Initialize with empty array


  console.log(">>>>>>>>>>>>>1234", userId);
  console.log(">>>>>>>>>>>>>5678", selectedOutletId);
  // useEffect(() => {
  //   checkForOpenShift();
  //   fetchCustomersForOutlet();
  //   checkTablesData();
  //   // Removed jQuery code for handling tab clicks
  // }, [userId, selectedOutletId]);
  useEffect(() => {
    checkForOpenShift();
    fetchCustomersForOutlet();
    checkTablesData();
    
    const fetchProductsData = async () => {   
      try { // Introduce error handling
        const { data: ProductsData, productsError } = await supabase.from("products_view").select("*").eq('outlet_id', selectedOutletId);
        const { data: categoriesData, categoriesError } = await supabase.from("product_categories").select("*");
  
        // Handle errors or throw if needed
        if (productsError) throw productsError;
        if (categoriesError) throw categoriesError;
  
        console.log('Products Data', ProductsData);
        console.log('Categories Data', categoriesData);
  
        // Do something with fetched data ONLY after it's available:
        // Example: 
        setProducts(ProductsData); 
        setCategories(categoriesData);
  
      } catch (error) {
        // Handle errors appropriately
        console.error("Error fetching data:", error);
      }
    };
    fetchProductsData();
    
    $("ul.tabs li").click(function () {
      var $this = $(this);
      var $theTab = $(this).attr("id");
      console.log($theTab);
      if ($this.hasClass("active")) {
        // do nothing
      } else {
        $this
          .closest(".tabs_wrapper")
          .find("ul.tabs li, .tabs_container .tab_content")
          .removeClass("active");
        $(
          '.tabs_container .tab_content[data-tab="' +
            $theTab +
            '"], ul.tabs li[id="' +
            $theTab +
            '"]'
        ).addClass("active");
      }
    });
    $(document).on("click", ".productset", function () {
      $(this).toggleClass("active");
    });
  }, []);

  const checkForOpenShift = async () => {
    try {
      const { data, error } = await supabase.rpc("manage_shifts", {
        outlet_id_input: selectedOutletId,
        profile_id_input: userId,
      });

      if (error) throw error;

      // Check if shift_id exists and is a positive integer
      if (!data || typeof data.shift_id !== "number" || data.shift_id <= 0) {
        console.log(data);
        // No valid shift_id found, prompt user to start a new one
        askToStartShift();
      }
      // If a valid shift_id is found, you might want to handle this case as well,
      // such as by storing the shift_id for later use or simply continuing with the application flow
    } catch (error) {
      console.error("Failed to check for open shifts:", error.message);
      // Handle error appropriately
    }
  };

  /**
   * The function askToStartShift displays a confirmation dialog to ask the user if they want to
   * start a new shift, and if confirmed, it calls the startNewShift function.
   */
  const askToStartShift = () => {
    Swal.fire({
      title: "Start New Shift?",
      text: "You currently do not have an open shift. You must start one to continue.",
      icon: "warning",
      showCancelButton: false, // Remove the cancel button
      allowOutsideClick: false, // Prevent closing by clicking outside
      allowEscapeKey: false, // Prevent closing with the escape key
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, start shift!",
    }).then((result) => {
      if (result.isConfirmed) {
        startNewShift();
      } else {
        // Since there's no cancel button, consider what should happen if not confirmed
        // For a mandatory action, you might not need an 'else' block or might want to re-prompt
        askToStartShift(); // Re-prompt to ensure a shift is started
      }
    });
  };

  const startNewShift = async () => {
    // Insert function to start a new shift
    // You'll need to define this function on your backend and call it here, passing necessary parameters
    // Example:
    try {
      const { error } = await supabase
        .from("shifts")
        .insert({ profile_id: userId, outlet_id: selectedOutletId });

      if (error) throw error;

      // Handle success - e.g., show confirmation message
      Swal.fire(
        "Shift Started",
        "Your shift has been successfully started.",
        "success"
      );
    } catch (error) {
      console.error("Failed to start new shift:", error.message);
      // Handle error appropriately
    }
  };

  /**
   * The function fetches customers for a given outlet by first fetching the brand ID for the outlet
   * and then using that ID to fetch customers from the customer_brands table and join them with
   * profiles.
   * @returns The function fetchCustomersForOutlet returns an array of customer objects. Each
   * customer object has an id property representing the customer's ID and a text property
   * representing the customer's first name.
   */
  const fetchCustomersForOutlet = async () => {
    try {
      // Step 1: Fetch the brand_id for the given outlet_id
      const { data: outletData, error: outletError } = await supabase
        .from("outlets")
        .select("brand_id")
        .eq("id", selectedOutletId)
        .single();

      if (outletError) throw outletError;
      if (!outletData) throw new Error("Outlet not found");

      const brandId = outletData.brand_id;
      console.log(brandId);

      // Step 2: Use the brand_id to fetch customers from customer_brands and join with profiles
      const { data: customerData, error: customerError } = await supabase
        .from("customer_brands")
        .select(
          `
        customer_id,
        profiles (
          id,
          first_name
        )
      `
        )
        .eq("brand_id", brandId);

      // Filter out duplicates based on id
      const uniqueCustomers = customerData.filter(
        (cb, index, self) =>
          index === self.findIndex((t) => t.profiles.id === cb.profiles.id)
      );
      if (customerError) throw customerError;
      // Map the response to the desired format
      const customers = uniqueCustomers.map((cb) => ({
        id: cb.profiles.id,
        text: cb.profiles.first_name,
        text1: cb.profiles.first_name,
      }));

      // Update the options state with the fetched customers
      setOptions((prevOptions) => [
        ...new Map(
          prevOptions.concat(customers).map((item) => [item["id"], item])
        ).values(),
      ]);
      console.log(customers);
      return customers;
    } catch (error) {
      console.error("Failed to fetch customers for outlet:", error.message);
      return [];
    }
  };

  /**
   * The function checkTablesData retrieves space order details from a Supabase database using a
   * stored procedure and returns the data if successful.
   * @returns The function checkTablesData returns the data object if it exists.
   */
  const checkTablesData = async () => {
    try {
      const { data, error } = await supabase.rpc("get_space_order_details", {
        outlet_id_input: selectedOutletId,
      });

      if (error) throw error;

      if (data) {
        console.log(data);
        return data;
      }
    } catch (error) {
      console.error("Failed to get Table info:", error.message);
      // Handle error appropriately
    }
  };

  const confirmText = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: !0,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn btn-danger ml-1",
      buttonsStyling: !1,
    }).then(function (t) {
      t.value &&
        Swal.fire({
          type: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonClass: "btn btn-success",
        });
    });
  };
  const [counter, setCounter] = useState(0);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  const options1 = [
    { id: 1, text: "Product", text1: "Product" },
    { id: 2, text: "Barcode", text2: "Barcode" },
  ];
  const options2 = [
    { id: 1, text: "Exclusive", text1: "Exclusive" },
    { id: 2, text: "Inclusive", text2: "Inclusive" },
  ];
  return (
    <>
      <div className="main-wrappers">
        <Header />
        <div className="page-wrapper ms-0">
          <div className="content">
            <div className="row">
              <POS />
              <div className="col-lg-4 col-sm-12 ">
                <div className="order-list">
                  <div className="orderid">
                    <h4>Order List</h4>
                    <h5>Transaction id : #65565</h5>
                  </div>
                  <div className="actionproducts">
                    <ul>
                      <li>
                        <Link
                          to="#"
                          className="deletebg confirm-text"
                          onClick={confirmText}
                        >
                          <img src={delete2} alt="img" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="#"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="dropset"
                        >
                          <img src={ellipise1} alt="img" />
                        </Link>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                          data-popper-placement="bottom-end"
                        >
                          <li>
                            <Link to="#" className="dropdown-item">
                              Action
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Another Action
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="dropdown-item">
                              Something Elses
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card card-order">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <Link
                          to="#"
                          className="btn btn-adds"
                          data-bs-toggle="modal"
                          data-bs-target="#create"
                        >
                          <i className="fa fa-plus me-2" />
                          Add Customer
                        </Link>
                      </div>
                      <div className="col-lg-12">
                        <div className="select-split ">
                          <div className="select-group w-100">
                            <Select2
                              className="select"
                              data={customerList}
                              options={{
                                placeholder: "Walk-in Customer",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="select-split">
                          <div className="select-group w-100">
                            <Select2
                              className="select"
                              data={options1}
                              options={{
                                placeholder: "Product",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="text-end">
                          <Link to="#" className="btn btn-scanner-set">
                            <img src={scanner1} alt="img" className="me-2" />
                            Scan bardcode
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="split-card"></div>
                  <div className="card-body pt-0">
                    <div className="totalitem">
                      <h4>Total items : 4</h4>
                      <Link to="#">Clear all</Link>
                    </div>
                    <div className="product-table">
                      <ul className="product-lists">
                        <li>
                          <div className="productimg">
                            <div className="productimgs">
                              <img src={Product30} alt="img" />
                            </div>
                            <div className="productcontet">
                              <h4>Pineapple</h4>
                              <div className="productlinkset">
                                <h5>PT001</h5>
                              </div>
                              <div className="increment-decrement">
                                <div className="input-groups">
                                  <input
                                    onClick={() => setCounter(counter - 1)}
                                    type="button"
                                    defaultValue="-"
                                    className="button-minus dec button"
                                  />
                                  <input
                                    type="text"
                                    name="child"
                                    value={counter}
                                    className="quantity-field"
                                  />
                                  <input
                                    onClick={() => setCounter(counter + 1)}
                                    type="button"
                                    defaultValue="+"
                                    className="button-plus inc button "
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>3000.00 </li>
                        <li>
                          <Link
                            to="#"
                            className="confirm-text"
                            onClick={confirmText}
                          >
                            <img src={delete2} alt="img" />
                          </Link>
                        </li>
                      </ul>
                      <ul className="product-lists">
                        <li>
                          <div className="productimg">
                            <div className="productimgs">
                              <img src={Product34} alt="img" />
                            </div>
                            <div className="productcontet">
                              <h4>Green Nike</h4>
                              <div className="productlinkset">
                                <h5>PT001</h5>
                              </div>
                              <div className="increment-decrement">
                                <div className="input-groups">
                                  <input
                                    onClick={() => setCounter1(counter1 - 1)}
                                    type="button"
                                    defaultValue="-"
                                    className="button-minus dec button"
                                  />
                                  <input
                                    type="text"
                                    name="child"
                                    value={counter1}
                                    className="quantity-field"
                                  />
                                  <input
                                    onClick={() => setCounter1(counter1 + 1)}
                                    type="button"
                                    defaultValue="+"
                                    className="button-plus inc button "
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>3000.00 </li>
                        <li>
                          <Link
                            to="#"
                            className="confirm-text"
                            onClick={confirmText}
                          >
                            <img src={delete2} alt="img" />
                          </Link>
                        </li>
                      </ul>
                      <ul className="product-lists">
                        <li>
                          <div className="productimg">
                            <div className="productimgs">
                              <img src={Product35} alt="img" />
                            </div>
                            <div className="productcontet">
                              <h4>Banana</h4>
                              <div className="productlinkset">
                                <h5>PT001</h5>
                              </div>
                              <div className="increment-decrement">
                                <div className="input-groups">
                                  <input
                                    onClick={() => setCounter2(counter2 - 1)}
                                    type="button"
                                    defaultValue="-"
                                    className="button-minus dec button"
                                  />
                                  <input
                                    type="text"
                                    name="child"
                                    value={counter2}
                                    className="quantity-field"
                                  />
                                  <input
                                    onClick={() => setCounter2(counter2 + 1)}
                                    type="button"
                                    defaultValue="+"
                                    className="button-plus inc button "
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>3000.00 </li>
                        <li>
                          <Link
                            to="#"
                            className="confirm-text"
                            onClick={confirmText}
                          >
                            <img src={delete2} alt="img" />
                          </Link>
                        </li>
                      </ul>
                      <ul className="product-lists">
                        <li>
                          <div className="productimg">
                            <div className="productimgs">
                              <img src={Product31} alt="img" />
                            </div>
                            <div className="productcontet">
                              <h4>Strawberry</h4>
                              <div className="productlinkset">
                                <h5>PT001</h5>
                              </div>
                              <div className="increment-decrement">
                                <div className="input-groups">
                                  <input
                                    onClick={() => setCounter3(counter3 - 1)}
                                    type="button"
                                    defaultValue="-"
                                    className="button-minus dec button"
                                  />
                                  <input
                                    type="text"
                                    min={0}
                                    name="child"
                                    value={counter3}
                                    className="quantity-field"
                                  />
                                  <input
                                    onClick={() => setCounter3(counter3 + 1)}
                                    type="button"
                                    defaultValue="+"
                                    className="button-plus inc button "
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>3000.00 </li>
                        <li>
                          <Link
                            to="#"
                            className="confirm-text"
                            onClick={confirmText}
                          >
                            <img src={delete2} alt="img" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="split-card"></div>
                  <div className="card-body pt-0 pb-2">
                    <div className="setvalue">
                      <ul>
                        <li>
                          <h5>Subtotal </h5>
                          <h6>55.00$</h6>
                        </li>
                        <li>
                          <h5>Tax </h5>
                          <h6>5.00$</h6>
                        </li>
                        <li className="total-value">
                          <h5>Total</h5>
                          <h6>60.00$</h6>
                        </li>
                      </ul>
                    </div>
                    <div className="setvaluecash">
                      <ul>
                        <li>
                          <Link to="#" className="paymentmethod">
                            <img src={cash} alt="img" className="me-2" />
                            Cash
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="paymentmethod">
                            <img src={debitcard} alt="img" className="me-2" />
                            Debit
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="paymentmethod">
                            <img src={scan} alt="img" className="me-2" />
                            Scan
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="btn-totallabel">
                      <h5>Checkout</h5>
                      <h6>60.00$</h6>
                    </div>
                    <div className="btn-pos">
                      <ul>
                        <li>
                          <Link to="#" className="btn">
                            <img src={pause1} alt="img" className="me-1" />
                            Hold
                          </Link>
                        </li>
                        <li>
  <button onClick={toggleModal} className="btn me-1">
    <img src={Edit6} alt="img" className="me-1" />
    Products
  </button>
  <ProductsGridModal show={showModal} onHide={toggleModal} products={products} categories={categories} />
</li>

                        <li>
                          <Link to="#" className="btn" >
                            <img src={trash12} alt="img" className="me-1" />
                            Void
                          </Link>
                        </li>
                        <li>
                          <Link to="#" className="btn">
                            <img src={wallet1} alt="img" className="me-1" />
                            Payment
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="btn"
                            data-bs-toggle="modal"
                            data-bs-target="#recents"
                          >
                            <img src={transcation} alt="img" className="me-1" />{" "}
                            Transaction
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="create"
        tabIndex={-1}
        aria-labelledby="create"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create</h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Country</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 col-12">
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Link to="#" className="btn btn-submit me-2">
                  Submit
                </Link>
                <Link to="#" className="btn btn-cancel" data-bs-dismiss="modal">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transactions />
    </>
  );
};

export default Pos;
