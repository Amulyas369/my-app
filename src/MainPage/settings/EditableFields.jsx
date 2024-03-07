import React, { useState } from "react";
import PropTypes from "prop-types";

const EditableField = ({ fieldLabel, fieldValue, fieldType = "text" }) => {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(fieldValue);

  const toggleEdit = () => {
    setEditing(!isEditing);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  EditableField.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    fieldType: PropTypes.string,
  };

  EditableField.defaultProps = {
    fieldType: "text", // Default type if none is provided
  };

  return (
    <div className="settings-field borderColor   ">
      <label style={{ margin: "0px" }}>{fieldLabel}</label>
      <div className="spacebwn">
        {isEditing ? (
          <input
            style={{ height: "30px" }}
            type={fieldType}
            value={value}
            onChange={handleChange}
          />
        ) : (
          <span style={{ color: "#869AC0" }}>{value}</span>
        )}
        <button className="button" onClick={toggleEdit}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default EditableField;
