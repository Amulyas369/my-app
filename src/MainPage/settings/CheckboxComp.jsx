import React from "react";
import PropTypes from "prop-types";

const CheckboxComp = ({ isEnabled, toggle, fieldLabel }) => {
  return (
    <div >
      <label className="switch" style={{alignItems: 'center', marginTop: '10px'}}>
        <input type="checkbox" checked={isEnabled} onChange={toggle} />
        <span className="slider round"></span>
      </label>
      <h4 className="" style={{fontSize: '16px', fontWeight: 500,marginLeft: '12px' }}>{fieldLabel}</h4>
    </div>
  );
};

CheckboxComp.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  fieldLabel: PropTypes.string.isRequired, // Add fieldLabel to propTypes
};

export default CheckboxComp;
