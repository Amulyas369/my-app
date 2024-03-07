import React, { useState } from "react";
import PropTypes from "prop-types";
import ToggleComponent from "./ToggleComponent";

const ReservationComponent = ({
  fieldLabel,
  fieldValue,
  fieldType = "text",
}) => {
  const [value, setValue] = useState(fieldValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  ReservationComponent.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    fieldType: PropTypes.string,
  };

  ReservationComponent.defaultProps = {
    fieldType: "text", // Default type if none is provided
  };

  return (
    <div className="settings-field borderColor1   ">
      <label style={{ margin: "0px" }}>{fieldLabel}</label>
      <div className="spacebwn">
        <input
          style={{ height: "30px" }}
          type={fieldType}
          value={value}
          onChange={handleChange}
        />
        <span style={{ color: "#869AC0" }}>{value}</span>
        <ToggleComponent />
      </div>
    </div>
  );
};

export default ReservationComponent;
