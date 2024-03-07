/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import PropTypes from "prop-types"; 

import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  Printer,
  Search,
} from "../EntryFile/imagePath";

const Tabletop = ({ inputfilter, togglefilter, data, columns,onSearchTermChange,onExportPDF }) => {
  const handlePrint = () => {
    let tableHtml = "<table>";

    // Add table headers
    tableHtml += "<thead><tr>";
    columns.forEach((col) => {
      tableHtml += `<th>${col.title}</th>`; // Use your column titles here
    });
    tableHtml += "</tr></thead>";

    // Add table body
    tableHtml += "<tbody>";
    data.forEach((row) => {
      tableHtml += "<tr>";
      columns.forEach((col) => {
        tableHtml += `<td>${row[col.key]}</td>`; // Access the data in each cell
      });
      tableHtml += "</tr>";
    });
    tableHtml += "</tbody></table>";

    // Add some basic styles
    const style =
      "<style>table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid black; padding: 8px; text-align: left; }</style>";

    const printFrame = document.getElementById("printFrame");
    printFrame.contentDocument.open();
    printFrame.contentDocument.write(style + tableHtml);
    printFrame.contentDocument.close();

    // Wait for the iframe content to fully load
    printFrame.onload = function () {
      printFrame.contentWindow.print();
    };
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    // Map the columns for autoTable
    const tableColumns = columns.map((col) => ({
      title: col.title,
      dataKey: col.key,
    }));

    // Use the data as is, assuming it matches the dataKeys in columns
    const tableData = data;

    // Generate the table in PDF
    doc.autoTable(tableColumns, tableData);

    // Save the PDF
    doc.save("table.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data); // Convert your data to a worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table.xlsx");
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    onSearchTermChange(searchTerm);
  };

  return (
    <>
      <style>
        {`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section, .print-section * {
            visibility: visible;
          }
          .print-section {
            position: absolute;
            width:100%;
            left: 0;
            top: 0;
          }
        }
      `}
      </style>
      <div className="table-top">
        <div className="search-set">
          <div className="search-path">
            <a
              className={` btn ${
                inputfilter ? "btn-filter setclose" : "btn-filter"
              } `}
              id="filter_search"
              onClick={() => togglefilter(!inputfilter)}
            >
              <img src={Filter} alt="img" />
              <span>
                <img src={ClosesIcon} alt="img" />
              </span>
            </a>
          </div>
          <div className="search-input">
            <input
              className="form-control form-control-sm search-icon"
              type="search"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <Link to="#" className="btn btn-searchset">
              <img src={Search} alt="img" />
            </Link>
          </div>
        </div>
        <div className="wordset">
          <ul>
            <ReactTooltip place="top" type="dark" effect="solid" />
            <li>
              <a data-tip="Pdf" onClick={exportPDF}>
                <img src={Pdf} alt="img" />
              </a>
            </li>
            <li>
              <a data-tip="Excel" onClick={exportExcel}>
                <img src={Excel} alt="img" />
              </a>
            </li>
            <li>
              <a data-tip="Print" onClick={handlePrint}>
                <img src={Printer} alt="Print" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};


Tabletop.propTypes = {
  inputfilter: PropTypes.bool.isRequired,
  togglefilter: PropTypes.func.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
  onExportPDF: PropTypes.func.isRequired,
};

export default Tabletop;
