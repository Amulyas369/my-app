/* eslint-disable no-dupe-keys */
import React, { useState, useMemo } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select2 from "react-select2-wrapper";
import "react-select2-wrapper/css/select2.css";
import { Row, Col } from "react-bootstrap"; 

import {
  ClosesIcon,
  Excel,
  Filter,
  Pdf,
  Calendar,
  Printer,
  search_whites,
  Search,
  MacbookIcon,
  OrangeImage,
  PineappleImage,
  StawberryImage,
  AvocatImage,
  Product1,
  Product7,
  Product8,
  Product9,
} from "../../EntryFile/imagePath";
import PieChart from "./PieCharts";
import LineChart from "./LineChart";


const Purchase = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());

  const options = [
    { id: 1, text: "Choose Supplier", text: "Choose Product" },
    { id: 2, text: "Supplier", text: "Supplier" },
  ];
  const [inputfilter, setInputfilter] = useState(false);

  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const [data] = useState([
    {
      id: 1,
      Name: "Macbook pro",
      amount: 38698,
      Purchased: 1248,
      Instock: 1356,
      image: Product1,
    },
    {
      id: 2,
      Name: "Orange",
      amount: 36080,
      Purchased: 110,
      Instock: 131,
      image: OrangeImage,
    },
    {
      id: 3,
      Name: "Pineapple",
      amount: 21000,
      Purchased: 106,
      Instock: 131,
      image: PineappleImage,
    },
    {
      id: 4,
      Name: "Strawberry",
      amount: 11000,
      Purchased: 105,
      Instock: 100,
      image: StawberryImage,
    },
    {
      id: 5,
      Name: "Sunglasses",
      amount: 10600,
      Purchased: 105,
      Instock: 100,
      image: AvocatImage,
    },
    {
      id: 6,
      Name: "Unpaired gray",
      amount: 9984,
      Purchased: 50,
      Instock: 50,
      image: MacbookIcon,
    },
    {
      id: 7,
      Name: "Avocat",
      amount: 4500,
      Purchased: 41,
      Instock: 29,
      image: Product7,
    },
    {
      id: 8,
      Name: "Banana",
      amount: 900,
      Purchased: 28,
      Instock: 24,
      image: Product8,
    },
    {
      id: 9,
      Name: "Earphones",
      amount: 500,
      Purchased: 20,
      Instock: 11,
      image: Product9,
    },
    {
      id: 10,
      Name: "Banana",
      amount: 900,
      Purchased: 28,
      Instock: 24,
      image: Product8,
    },
    {
      id: 11,
      Name: "Earphones",
      amount: 500,
      Purchased: 20,
      Instock: 11,
      image: Product9,
    },
  ]);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "Name",
      render: (text, record) => (
        <div className="productimgname">
          <Link to="#" className="product-img">
            <img src={record.image} alt="product" />
          </Link>
          <Link to="#">{text}</Link>
        </div>
      ),
      sorter: (a, b) => a.Name.length - b.Name.length,
    },
    {
      title: "Purchased amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount.length - b.amount.length,
    },
    {
      title: "Purchased QTY",
      dataIndex: "Purchased",
      sorter: (a, b) => a.Purchased.length - b.Purchased.length,
    },
    {
      title: "Instock QTY",
      dataIndex: "Instock",
      sorter: (a, b) => a.Instock.length - b.Instock.length,
    },
  ];
  const pieChartData = useMemo(() => {
    const labels = data.map(item => item.Name);
    const quantities = data.map(item => item.Purchased);
    const backgroundColors = data.map((_, index) => `hsl(${index / data.length * 360}, 70%, 70%)`);
    const borderColors = data.map((_, index) => `hsl(${index / data.length * 360}, 70%, 50%)`);

    return {
      labels,
      data: quantities,
      backgroundColors,
      borderColors,
    };
  }, [data]);

  const lineChartData = useMemo(() => {
    const labels = data.map(item => item.Name);
    const amounts = data.map(item => item.amount);
    // For simplicity, use a single color. Adjust as needed.
    const backgroundColor = "rgba(54, 162, 235, 0.5)";
    const borderColor = "rgba(54, 162, 235, 1)";

    return {
      labels,
      data: amounts,
      backgroundColors: [backgroundColor], // Line chart expects arrays
      borderColors: [borderColor],
    };
  }, [data]);
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Purchase report</h4>
            <h6>Manage your Purchase report</h6>
          </div>
        </div>
                {/* /pie charts */}
                <div className="card">
          <div className="card-body">
            <Row className="page-wrapper customSpaceBtwn">
              {/* Page Content */}
              <Col className="card card-body customCenter">
                <div className="">
                  <h5>Products by Category</h5>
                  <PieChart {...pieChartData} />
                </div>
              </Col>
              {/* LineChart for Brand Distribution */}
<Col className="card card-body customCenter">
  <div className="">
    <h5>Brand Distribution</h5>
    <LineChart {...lineChartData} />
  </div>
</Col>

              {/* More of your component */}
            </Row>
          </div>
        </div>
        {/* /product list */}
        <div className="card">
          <div className="card-body">
            <div className="table-top">
              <div className="search-set">
                <div className="search-path">
                  <a
                    className={` btn ${inputfilter ? "btn-filter setclose" : "btn-filter"
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
                  />
                  <a className="btn btn-searchset">
                    <img src={Search} alt="img" />
                  </a>
                </div>
              </div>
              <div className="wordset">
                <ul>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="pdf"
                    >
                      <img src={Pdf} alt="img" />
                    </a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="excel"
                    >
                      <img src={Excel} alt="img" />
                    </a>
                  </li>
                  <li>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="print"
                    >
                      <img src={Printer} alt="img" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* /Filter */}
            <div
              className={`card mb-0 ${inputfilter ? "toggleCls" : ""}`}
              id="filter_inputs"
              style={{ display: inputfilter ? "block" : "none" }}
            >
              <div className="card-body pb-0">
                <div className="row">
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <div className="input-groupicon">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                        <div className="addonset">
                          <img src={Calendar} alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <div className="input-groupicon">
                        <DatePicker
                          selected={startDate1}
                          onChange={(date) => setStartDate1(date)}
                        />
                        <div className="addonset">
                          <img src={Calendar} alt="img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-6 col-12">
                    <div className="form-group">
                      <Select2
                        className="select"
                        data={options}
                        options={{
                          placeholder: "Choose Suppliers",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-1 col-sm-6 col-12 ms-auto">
                    <div className="form-group">
                      <a className="btn btn-filters ms-auto">
                        <img src={search_whites} alt="img" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Filter */}
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
        {/* /product list */}
      </div>
    </div>
  );
};

export default Purchase;
