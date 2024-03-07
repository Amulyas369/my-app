// import PropTypes from "prop-types";
// import CheckboxComp from "./CheckboxComp";

// const CheckboxComponent = () => {
  
//   CheckboxComponent.propTypes = {
//     fieldLabel: PropTypes.string.isRequired,
//     initialValue: PropTypes.bool.isRequired,
//   };

//   return (
//     <div className="settings-field borderColor ">
//      <CheckboxComp />
//     </div>
//   );
// };

// export default CheckboxComponent;


import React from "react";
import PropTypes from "prop-types";
import CheckboxComp from "./CheckboxComp";

const CheckboxComponent = ({ fieldLabel, initialValue }) => {
  return (
    <div className="settings-field  ">
      <CheckboxComp fieldLabel={fieldLabel} initialValue={initialValue} />
    </div>
  );
};

CheckboxComponent.propTypes = {
  fieldLabel: PropTypes.string.isRequired,
  initialValue: PropTypes.bool.isRequired,
};

export default CheckboxComponent;
