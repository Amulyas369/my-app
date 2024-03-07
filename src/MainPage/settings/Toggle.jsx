// // // // // // import React, { useState } from 'react';

// // // // // // const Toggle = () => {
// // // // // //   const [isChecked, setIsChecked] = useState(false);

// // // // // //   const handleToggle = () => {
// // // // // //     setIsChecked(prevState => !prevState);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       <label>
// // // // // //         <input
// // // // // //           type="checkbox"
// // // // // //           checked={isChecked}
// // // // // //           onChange={handleToggle}
// // // // // //         />
  
// // // // // //       </label>
// // // // // //       <p>{isChecked ? 'Enabled' : 'Disabled'}</p>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Toggle;




// // // // // import React, { useState } from 'react';

// // // // // const Toggle = () => {
// // // // //   const [isConditionTrue, setIsConditionTrue] = useState(false);

// // // // //   const handleToggle = () => {
// // // // //     setIsConditionTrue(prevState => !prevState);
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <button onClick={handleToggle}>Toggle</button>
// // // // //       <p>{isConditionTrue ? 'Condition is true' : 'Condition is false'}</p>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Toggle;



// // // // import React, { useState } from "react";
// // // // import PropTypes from "prop-types";

// // // // const ToggleComponent = ({ fieldLabel, initialValue }) => {
// // // //   const [toggle, setToggle] = useState(initialValue);

// // // //   const handleToggle = () => {
// // // //     setToggle(!toggle);
// // // //   };

// // // //   ToggleComponent.propTypes = {
// // // //     fieldLabel: PropTypes.string.isRequired,
// // // //     initialValue: PropTypes.bool.isRequired,
// // // //   };

// // // //   return (
// // // //     <div className="settings-field borderColor spacebwn">
// // // //       <label>{fieldLabel}</label>
// // // //       <div className="status-toggle">
// // // //         <input
// // // //           type="checkbox"
// // // //           id={`toggle-${fieldLabel.replace(/\s+/g, "-")}`}
// // // //           className="check"
// // // //           checked={toggle}
// // // //           onChange={handleToggle}
// // // //         />
// // // //         <label
// // // //           htmlFor={`toggle-${fieldLabel.replace(/\s+/g, "-")}`}
// // // //           className={`checktoggle ${toggle ? 'checked' : ''}`}
// // // //         ></label>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ToggleComponent;



// // // import React, { useState } from "react";
// // // import PropTypes from "prop-types";

// // // const Toggle = ({ fieldLabel, initialValue }) => {
// // //   const [toggle, setToggle] = useState(initialValue);

// // //   const handleToggle = () => {
// // //     setToggle(!toggle);
// // //   };

// // //   Toggle.propTypes = {
// // //     fieldLabel: PropTypes.string.isRequired,
// // //     initialValue: PropTypes.bool.isRequired,
// // //   };

// // //   return (
// // //     <div className="settings-field borderColor spacebwn">
// // //       <label>{fieldLabel}</label>
// // //       <div className="status-toggle">
// // //         <input
// // //           type="checkbox"
// // //           id={`toggle-${fieldLabel.replace(/\s+/g, "-")}`}
// // //           className="check"
// // //           checked={toggle}
// // //           onChange={handleToggle}
// // //         />
// // //         <label
// // //           htmlFor={`toggle-${fieldLabel.replace(/\s+/g, "-")}`}
// // //           className={`checktoggle ${toggle ? 'checked' : ''}`}
// // //         ></label>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Toggle;

// // import React, { useState } from "react";
// // import PropTypes from "prop-types";

// // const Toggle = ({ fieldLabel, initialValue }) => {
// //   const [toggle, setToggle] = useState(initialValue);

// //   const handleToggle = () => {
// //     setToggle(!toggle);
// //   };

// //   Toggle.propTypes = {
// //     fieldLabel: PropTypes.string,
// //     initialValue: PropTypes.bool.isRequired,
// //   };

// //   return (
// //     <div className="settings-field borderColor spacebwn">
// //       {fieldLabel && (
// //         <label>{fieldLabel}</label>
// //       )}
// //       <div className="status-toggle">
// //         <input
// //           type="checkbox"
// //           id={`toggle-${fieldLabel?.replace(/\s+/g, "-") || ''}`}
// //           className="check"
// //           checked={toggle}
// //           onChange={handleToggle}
// //         />
// //         <label
// //           htmlFor={`toggle-${fieldLabel?.replace(/\s+/g, "-") || ''}`}
// //           className={`checktoggle ${toggle ? 'checked' : ''}`}
// //         ></label>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Toggle;


// import React, { useState } from "react";
// import PropTypes from "prop-types";

// const Toggle = ({ fieldLabel, initialValue }) => {
//   const [toggle, setToggle] = useState(initialValue);

//   const handleToggle = () => {
//     setToggle(!toggle);
//   };

//   Toggle.propTypes = {
//     fieldLabel: PropTypes.string,
//     initialValue: PropTypes.bool.isRequired,
//   };

//   return (
//     <div className="settings-field borderColor spacebwn">
//       {fieldLabel && (
//         <label>{fieldLabel}</label>
//       )}
//       <div className="status-toggle">
//         <input
//           type="checkbox"
//           id={`toggle-${fieldLabel?.replace(/\s+/g, "-") || ''}`}
//           className="check"
//           checked={toggle}
//           onChange={handleToggle}
//         />
//         <label
//           htmlFor={`toggle-${fieldLabel?.replace(/\s+/g, "-") || ''}`}
//           className={`checktoggle ${toggle ? 'checked' : ''}`}
//         ></label>
//       </div>
//     </div>
//   );
// };

// export default Toggle;

import React, { useState } from "react";
import PropTypes from "prop-types";

const ToggleComponent = ({ fieldLabel, initialValue }) => {
  const [toggle, setToggle] = useState(initialValue);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  ToggleComponent.propTypes = {
    fieldLabel: PropTypes.string,
    initialValue: PropTypes.bool.isRequired,
  };

  return (
    <div className="settings-field borderColor spacebwn">
      {fieldLabel && (
        <label>{fieldLabel}</label>
      )}
      <div className="status-toggle">
        <input
          type="checkbox"
          id={`toggle-${fieldLabel?.replace(/\s+/g, "-") || ''}`}
          className="check"
          checked={toggle}
          onChange={handleToggle}
        />
        <label
          htmlFor={`toggle-${fieldLabel?.replace(/\s+/g, "-") || ''}`}
          className={`checktoggle ${toggle ? 'checked' : ''}`}
        ></label>
      </div>
    </div>
  );
};

export default ToggleComponent;
