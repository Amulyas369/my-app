// import React, { useState } from "react";
// import PropTypes from "prop-types";

// const ToggleComponent = ({ fieldLabel, fieldValue }) => {
//   const [value, setValue] = useState(fieldValue);
//   const [toggle, setToggle] = useState(false); // Added for toggle state

//   const handleToggle = () => {
//     setToggle(!toggle);
//   };

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   ToggleComponent.propTypes = {
//     fieldLabel: PropTypes.string.isRequired,
//     fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//       .isRequired,
//     fieldType: PropTypes.string,
//   };

//   return (
//     <div className="settings-field borderColor1">
//       <label style={{ margin: "0px" }}>{fieldLabel}</label>
//       <div className="spacebwn">
//         {/* Toggle switch */}
//         <div className="status-toggle d-flex justify-content-between align-items-center">
//           <input
//             type="checkbox"
//             id={`toggle-${fieldLabel}`} // Unique ID for each toggle
//             className="check"
//             checked={toggle}
//             onChange={handleToggle} // Updated to handle toggle
//           />
//           <label htmlFor={`toggle-${fieldLabel}`} className="checktoggle">
//             checkbox
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ToggleComponent;

import React, { useState } from "react";
import PropTypes from "prop-types";

const ToggleComponent = ({ fieldLabel, initialValue }) => {
  const [toggle, setToggle] = useState(initialValue);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  ToggleComponent.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    initialValue: PropTypes.bool.isRequired,
  };

  return (
    <div className="settings-field spacebwn" style={{padding: '16px'}}>
      <label>{fieldLabel}</label>
      <div className="status-toggle ">
        <input
          type="checkbox"
          id={`toggle-${fieldLabel.replace(/\s+/g, "-")}`} // Replace spaces with dashes to ensure a valid id
          className="check"
          checked={toggle}
          onChange={handleToggle}
        />

        <label
          htmlFor={`toggle-${fieldLabel.replace(/\s+/g, "-")}`}
          className="checktoggle "
          style={{ float: "right", margin: "0px" }}
        ></label>
      </div>
    </div>
  );
};

export default ToggleComponent;
