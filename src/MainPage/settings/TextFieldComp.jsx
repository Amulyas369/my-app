import React, { useState } from "react";
import PropTypes from "prop-types";

const TextFieldComp = ({ fieldLabel, fieldValue, fieldType = "text" }) => {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(fieldValue);

  const toggleEdit = () => {
    setEditing(!isEditing);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="settings-field" style={{ padding: "16px" }}>
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <label style={{ marginRight: "15px" }}>{fieldLabel}</label>
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {isEditing ? (
            <input
              style={{ height: "30px", width: "100px" }}
              type={fieldType}
              value={value}
              onChange={handleChange}
            />
          ) : (
            <span style={{ fontSize: "15px", fontWeight: 500 }}>{value}</span>
          )}
          <h5
            style={{
              fontSize: "14px",
              fontWeight: 500,
              marginLeft: "12px",
              marginRight: "12px",
            }}
          >
            {fieldValue}
          </h5>
          {isEditing ? (
            <button className="button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="button" onClick={toggleEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

TextFieldComp.propTypes = {
  fieldLabel: PropTypes.string.isRequired,
  fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  Amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fieldType: PropTypes.string,
};

TextFieldComp.defaultProps = {
  fieldType: "text",
};

export default TextFieldComp;
