/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import Table from "../../EntryFile/datatable";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import PieChart from "./PieCharts";
import "react-datepicker/dist/react-datepicker.css";
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
import { Col, Row } from "react-bootstrap";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

const Sales = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [inputfilter, setInputfilter] = useState(false);

  const togglefilter = (value) => {
    setInputfilter(value);
  };
  const [data] = useState([
    {
      id: 1,
      Name: "Macbook pro",
      Sku: "PT001",
      Category: "Computer",
      Brand: "N/D",
      Price: "1500.00",
      Unit: "5",
      Instock: 1356,
      image: Product1,
    },
    {
      id: 2,
      Name: "Orange",
      amount: 36080,
      Sku: "PT002",
      Category: "Fruits",
      Brand: "N/D",
      Price: "10.00",
      Unit: "4",
      Instock: 131,
      image: OrangeImage,
    },
    {
      id: 3,
      Name: "Pineapple",
      Sku: "PT003",
      Category: "Fruits",
      Brand: "N/D",
      Price: "10.00",
      Unit: "5",
      Instock: 131,
      image: PineappleImage,
    },
    {
      id: 4,
      Name: "Strawberry",
      Sku: "PT004",
      Category: "Fruits",
      Brand: "N/D",
      Price: "10.00",
      Unit: "3",
      Instock: 100,
      image: StawberryImage,
    },
    {
      id: 5,
      Name: "Sunglasses",
      Sku: "PT005",
      Category: "Accessories",
      Brand: "N/D",
      Price: "10.00",
      Unit: "5",
      Instock: 100,
      image: AvocatImage,
    },
    {
      id: 6,
      Name: "Unpaired gray",
      Sku: "PT006",
      Category: "Shoes",
      Brand: "Adidas",
      Price: "100.00",
      Unit: "2",
      Instock: 50,
      image: MacbookIcon,
    },
    {
      id: 7,
      Name: "Avocat",
      Sku: "PT007",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "4",
      Instock: 29,
      image: Product7,
    },
    {
      id: 8,
      Name: "Banana",
      Sku: "PT008",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "5",
      Instock: 24,
      image: Product8,
    },
    {
      id: 9,
      Name: "Earphones",
      Sku: "PT009",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "6",
      Instock: 11,
      image: Product9,
    },
    {
      id: 10,
      Name: "Banana",
      Sku: "PT010",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "10",
      Instock: 24,
      image: Product8,
    },
    {
      id: 11,
      Name: "Earphones",
      Sku: "PT007",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "3",
      Instock: 11,
      image: Product9,
    },
    {
      id: 12,
      Name: "Unpaired gray",
      Sku: "PT006",
      Category: "Shoes",
      Brand: "Adidas",
      Price: "100.00",
      Unit: "5",
      Instock: 50,
      image: MacbookIcon,
    },
    {
      id: 13,
      Name: "Avocat",
      Sku: "PT007",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "3",
      Instock: 29,
      image: Product7,
    },
    {
      id: 14,
      Name: "Banana",
      Sku: "PT008",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "5",
      Instock: 24,
      image: Product8,
    },
    {
      id: 15,
      Name: "Earphones",
      Sku: "PT009",
      Category: "Fruits",
      Brand: "N/D",
      Price: "5.00",
      Unit: "7",
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
      title: "SKU",
      dataIndex: "Sku",
      sorter: (a, b) => a.Sku.length - b.Sku.length,
    },
    {
      title: "Category",
      dataIndex: "Category",
      sorter: (a, b) => a.Category.length - b.Category.length,
    },
    {
      title: "Brand",
      dataIndex: "Brand",
      sorter: (a, b) => a.Brand.length - b.Brand.length,
    },
    {
      title: "Sold Amount",
      dataIndex: "Price",
      sorter: (a, b) => a.Price.length - b.Price.length,
    },
    {
      title: "Sold QTY",
      dataIndex: "Unit",
      sorter: (a, b) => a.Unit.length - b.Unit.length,
    },
    {
      title: "Instock QTY",
      dataIndex: "Instock",
      sorter: (a, b) => a.Instock.length - b.Instock.length,
    },
  ];
  const aggregateData = (key) => {
    return data.reduce((acc, curr) => {
      acc[curr[key]] = (acc[curr[key]] || 0) + 1;
      return acc;
    }, {});
  };

  // Prepare data for the first pie chart (By Category)
  const categoryData = useMemo(() => {
    const aggregatedData = aggregateData("Category");
    return {
      labels: Object.keys(aggregatedData),
      data: Object.values(aggregatedData),
      backgroundColors: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
      borderColors: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
    };
  }, [data]);

  // Prepare data for the second pie chart (By Brand or any other attribute)
  // const brandData = useMemo(() => {
  //   const aggregatedData = aggregateData("Brand");
  //   return {
  //     labels: Object.keys(aggregatedData),
  //     data: Object.values(aggregatedData),
  //     backgroundColors: [
  //       "#FF6384",
  //       "#36A2EB",
  //       "#FFCE56",
  //       "#4BC0C0",
  //       "#9966FF",
  //       "#FF9F40",
  //     ],
  //     borderColors: [
  //       "#FF6384",
  //       "#36A2EB",
  //       "#FFCE56",
  //       "#4BC0C0",
  //       "#9966FF",
  //       "#FF9F40",
  //     ],
  //   };
  // }, [data]);
  // const aggregateBrandData = (salesData) => {
  //   const brandCounts = salesData.reduce((acc, { Brand }) => {
  //     acc[Brand] = (acc[Brand] || 0) + 1;
  //     return acc;
  //   }, {});

  //   return {
  //     labels: Object.keys(brandCounts),
  //     data: Object.values(brandCounts),
  //     backgroundColors: [
  //       "#36A2EB",
  //       "#FFCE56",
  //       "#FF6384",
  //       "#4BC0C0",
  //       "#9966FF",
  //       "#FF9F40",
  //     ],
  //     borderColors: [
  //       "#36A2EB",
  //       "#FFCE56",
  //       "#FF6384",
  //       "#4BC0C0",
  //       "#9966FF",
  //       "#FF9F40",
  //     ],
  //   };
  // };
  const brandChartData = useMemo(() => {
    const brandCounts = data.reduce((acc, { Brand }) => {
      acc[Brand] = (acc[Brand] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(brandCounts),
      data: Object.values(brandCounts),
      backgroundColors: [
        "#36A2EB",
        "#FFCE56",
        "#FF6384",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
      borderColors: [
        "#36A2EB",
        "#FFCE56",
        "#FF6384",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
      ],
    };
  }, [data]);

  // const brandChartData = aggregateBrandData(salesData);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Sales Report</h4>
            <h6>Manage your Sales Report</h6>
          </div>
        </div>
        {/* /pie charts */}
        <div className="card">
          <div className="card-body">
            <Row className="page-wrapper customSpaceBtwn" style={{display:"flex", justifyContent:"space-between", margin:"0px"}}>
              {/* Page Content */}
              <Col className="card card-body customCenter">
                <div className="">
                  <h5>Products by Category</h5>
                  <PieChart {...categoryData} />
                </div>
              </Col>
              {/* LineChart for Brand Distribution */}
              <Col className="card card-body customCenter">
                <div className="">
                  <h5>Brand Distribution</h5>
                  <LineChart {...brandChartData} />
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

export default Sales;
