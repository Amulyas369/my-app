import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedItemId } from "../../redux/actions.js";

const DropdownComponent = ({ itemList }) => {
  const [selectedItem, setSelectedItem] = useState(itemList?.[0] || null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the selected item's ID to the Redux store on component mount or itemList change
    if (selectedItem) {
      dispatch(setSelectedItemId(selectedItem.id));
    }
  }, [selectedItem, dispatch]); // Depend on selectedItem to dispatch changes

  const handleSelect = (item) => {
    setSelectedItem(item); // Update selectedItem with the chosen item
    dispatch(setSelectedItemId(item.id));
    setIsOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <li className="nav-item dropdown has-arrow flag-nav nav-item-box dropdown1">
      <Link
        className="navLink dropdown-toggle active "
        to="#"
        role="button"
        onClick={toggleDropdown}
      >
        <h2 style={{ padding: "10px", fontSize: "12px", fontWeight: "500" }}>
          {selectedItem ? selectedItem.text : "Select an item"}
        </h2>
      </Link>
      <div
        className={`dropdown-menu dropdown-menu-right ${isOpen ? "show" : ""}`}
      >
        {itemList.map((item) => (
          <Link
            key={item.id}
            to="#"
            className={`dropdown-item ${
              selectedItem && selectedItem.id === item.id ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleSelect(item);
            }}
          >
            {item.text}
          </Link>
        ))}
      </div>
    </li>
  );
};

DropdownComponent.propTypes = {
  itemList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DropdownComponent;
