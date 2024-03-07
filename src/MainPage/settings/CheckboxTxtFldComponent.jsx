import React from "react";
import PropTypes from "prop-types";

const CheckboxTxtFldComp = ({ isEnabled, toggle, fieldLabel }) => {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
      <label className="switch" style={{ alignItems: 'center' }}>
        <input type="checkbox" checked={isEnabled} onChange={toggle} />
        <span className="slider round"></span>
      </label>
      <h4 className="" style={{ fontSize: '16px', fontWeight: 500, marginLeft: '12px' }}>{fieldLabel}</h4>
      {/* Text field below the label */}
      <input type="text" placeholder="Enter text" style={{ marginLeft: '12px', marginTop: '5px', width: '100%' }} />
    </div>
  );
};

CheckboxTxtFldComp.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  fieldLabel: PropTypes.string.isRequired, // Add fieldLabel to propTypes
};

export default CheckboxTxtFldComp;
