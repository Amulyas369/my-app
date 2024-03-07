import React, { useState } from "react";
import PropTypes from "prop-types";

const ValuesDropdown = ({
  fieldLabel,
  fieldValue,
  fieldType = "text",
  options = [],
}) => {
  const [value, setValue] = useState(fieldValue);

   const handleChange = (e) => {
    setValue(e.target.value);
  };

  ValuesDropdown.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    fieldValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]).isRequired,
    fieldType: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
  };

  ValuesDropdown.defaultProps = {
    fieldType: "text", 
    options: [],
  };

  const renderField = () => {
    switch (fieldType) {
      case "dropdown":
        return (
          <select value={value} onChange={handleChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "text":
      default:
        return <span style={{ color: "#869AC0" }}>{value}</span>;
    }
  };

  return (
    <div className="">
      <div className="settings-field spacebwn">
      <label style={{ margin: "0px" }}>{fieldLabel}</label>
      <div >{renderField()}</div>
    </div>
    </div>
    
  );
};

export default ValuesDropdown;
