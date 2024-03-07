// import React, { useState } from "react";
// import PropTypes from "prop-types";

// const ConversionCoins = ({ fieldLabel }) => {
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   const handleStartTimeChange = (e) => {
//     setStartTime(e.target.value);
//   };

//   const handleEndTimeChange = (e) => {
//     setEndTime(e.target.value);
//   };

//   ConversionCoins.propTypes = {
//     fieldLabel: PropTypes.string.isRequired,
//   };

//   return (
//     <div
//       className="settings-field borderColor "
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}
//     >
//       <label>{fieldLabel}</label>
//       <div className=" spacebwn" >
//         <div className="start-time" style={{ marginRight: "10px" }}>
//           <label htmlFor="start-time" style={{ marginRight: "10px" }}>From</label>
//           <input
//             type="time"
//             id="start-time"
//             className="time-input"
//             value={startTime}
//             onChange={handleStartTimeChange}
//           />
//         </div>
//         <div className="end-time" style={{ marginRight: "10px" }}>
//           <label htmlFor="end-time" style={{ marginRight: "10px" }}>To</label>
//           <input
//             type="time"
//             id="end-time"
//             className="time-input"
//             value={endTime}
//             onChange={handleEndTimeChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConversionCoins;



import React, { useState } from "react";
import PropTypes from "prop-types";

const ConversionCoins = ({ fieldLabel, fieldValue, fieldType = "text" }) => {
    const [value, setValue] = useState(fieldValue);

    const handleChange = (e) => {
        setValue(e.target.value);
      };
  ConversionCoins.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
  };
  ConversionCoins.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    fieldType: PropTypes.string,
  };
  ConversionCoins.defaultProps = {
    fieldType: "text", // Default type if none is provided
  };

  return (
    <div
      className="settings-field borderColor "
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <label>{fieldLabel}</label>
      <div className=" spacebwn" >
        <div className="start-time" style={{ marginRight: "10px" }}>
        <input
            style={{ height: "30px" , width:'100px'}}
            type={fieldType}
            value={value}
            onChange={handleChange}
          />
        <label htmlFor="start-time" style={{ marginRight: "10px" }}>Points </label>  
        <span>= </span>       
        </div>
        <div className="end-time" style={{ marginRight: "10px" }}>        
        <input
            style={{ height: "30px" , width:'100px' }}
            type={fieldType}
            value={value}
            onChange={handleChange}
          />
            <label htmlFor="end-time" style={{ marginRight: "10px" }}>Coins</label>
        </div>
      </div>
    </div>
  );
};

export default ConversionCoins;
