import React, { useState } from "react";
import PropTypes from "prop-types";

const ThemeToggle = ({ initialValue, onToggle }) => {
  const [toggle, setToggle] = useState(initialValue);

  const handleToggle = () => {
    const newToggleState = !toggle;
    setToggle(newToggleState);
    if (onToggle) {
      onToggle(newToggleState);
    }
  };

  return (
    <div className="toggle-component">
      <input
        type="checkbox"
        id="theme-toggle"
        className="check"
        checked={toggle}
        onChange={handleToggle}
      />
      <label htmlFor="theme-toggle" className="checktoggle"></label>
    </div>
  );
};

ThemeToggle.propTypes = {
  initialValue: PropTypes.bool.isRequired,
  onToggle: PropTypes.func,
};

export default ThemeToggle;
