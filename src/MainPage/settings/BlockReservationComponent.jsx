import React, { useState } from "react";
import PropTypes from "prop-types";

const BlockReservationComponent = ({ fieldLabel }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  BlockReservationComponent.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
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
      <div className="reservation-time-block spacebwn" >
        <div className="start-time" style={{ marginRight: "10px" }}>
          <label htmlFor="start-time" style={{ marginRight: "10px" }}>From</label>
          <input
            type="time"
            id="start-time"
            className="time-input"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </div>
        <div className="end-time" style={{ marginRight: "10px" }}>
          <label htmlFor="end-time" style={{ marginRight: "10px" }}>To</label>
          <input
            type="time"
            id="end-time"
            className="time-input"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BlockReservationComponent;
