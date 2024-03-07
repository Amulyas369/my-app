import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

const BlockReservationDays = ({  initialDaysBlocked }) => {
  const [selectedDays, setSelectedDays] = useState(initialDaysBlocked);

  const daysOfWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const toggleDaySelection = (day) => {
    setSelectedDays((currentDays) => {
      if (currentDays.includes(day)) {
        return currentDays.filter((d) => d !== day); // Remove day if already selected
      } else {
        return [...currentDays, day]; // Add day if not selected
      }
    });
  };

  BlockReservationDays.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    initialDaysBlocked: PropTypes.arrayOf(PropTypes.string),
  };

  BlockReservationDays.defaultProps = {
    initialDaysBlocked: [],
  };

  return (
    <div className="settings-field borderColor3  ">
      {/* <label>{fieldLabel}</label> */}
      <Row className="checkbox-group">
        {daysOfWeek.map((day) => (
          <Col key={day} className="day-checkbox " style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <label htmlFor={`day-${day}`}  style={{ margin: "8px" }}>{day}</label>
            <input
              style={{ margin: "8px" }}
              type="checkbox"
              id={`day-${day}`}
              checked={selectedDays.includes(day)}
              onChange={() => toggleDaySelection(day)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlockReservationDays;
