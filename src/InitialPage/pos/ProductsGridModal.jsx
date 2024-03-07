import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ReactPaginate from "react-paginate";

// Dummy product data and categories
const dummyProducts = [
  {
    id: 1,
    name: "Coca Cola",
    category: "Drinks",
    price: 10.99,
    imageUrl: "https://m.media-amazon.com/images/I/71tTYGmAMGL.jpg",
  },
  {
    id: 2,
    name: "100 Plus",
    category: "Drinks",
    price: 15.49,
    imageUrl:
      "https://www.mycs.com.my/media/catalog/product/cache/6c25d84052640a1ad9f1bda306b5a86d/_/1/_100plus1.jpg",
  },
  {
    id: 3,
    name: "Lays",
    category: "Chips",
    price: 8.99,
    imageUrl:
      "https://images-cdn.ubuy.co.in/6355359fac88d272535d6aa7-lay-s-potato-chips-sweet-southern-heat.jpg",
  },
  {
    id: 4,
    name: "Coca Cola",
    category: "Drinks",
    price: 10.99,
    imageUrl: "https://m.media-amazon.com/images/I/71tTYGmAMGL.jpg",
  },
  {
    id: 5,
    name: "100 Plus",
    category: "Drinks",
    price: 15.49,
    imageUrl:
      "https://www.mycs.com.my/media/catalog/product/cache/6c25d84052640a1ad9f1bda306b5a86d/_/1/_100plus1.jpg",
  },
  {
    id: 6,
    name: "Lays",
    category: "Chips",
    price: 8.99,
    imageUrl:
      "https://images-cdn.ubuy.co.in/6355359fac88d272535d6aa7-lay-s-potato-chips-sweet-southern-heat.jpg",
  },
  {
    id: 7,
    name: "Coca Cola",
    category: "Drinks",
    price: 10.99,
    imageUrl: "https://m.media-amazon.com/images/I/71tTYGmAMGL.jpg",
  },
  {
    id: 8,
    name: "100 Plus",
    category: "Drinks",
    price: 15.49,
    imageUrl:
      "https://www.mycs.com.my/media/catalog/product/cache/6c25d84052640a1ad9f1bda306b5a86d/_/1/_100plus1.jpg",
  },
  {
    id: 9,
    name: "Lays",
    category: "Chips",
    price: 8.99,
    imageUrl:
      "https://images-cdn.ubuy.co.in/6355359fac88d272535d6aa7-lay-s-potato-chips-sweet-southern-heat.jpg",
  },
  // Add more products as needed
];
const dummyCategories = ["All", "Drinks", "Chips", "Snacks"];

const ProductsGridModal = ({ show, onHide, products, categories }) => {
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8; // Adjust based on your preference

  const filteredProducts =
    selectedCategory === "All"
      ? dummyProducts
      : dummyProducts.filter(
          (product) => product.category === selectedCategory
        );
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  useEffect(() => {
    console.log('Products are here',products);
    console.log('Categories are here',categories);
    if (show) {
      const initialQuantities = dummyProducts.reduce((acc, product) => {
        acc[product.id] = 0; // Initialize each product's quantity to 0
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [show]); // Dependency on 'show' to reset quantities when modal opens

  const handleConfirm = () => {
    console.log("Selected Products with Quantities:", quantities);
    onHide(); // Close modal
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Select Products</Modal.Title>
      </Modal.Header>
      <OwlCarousel
        className="owl-theme"
        margin={10}
        items={4}
        nav
        loop
        dots={true}
        key={selectedCategory} // Use selectedCategory as part of the key
      >
        {dummyCategories.map((category) => (
          <div key={category} className="item text-center">
            <Button
              variant={selectedCategory === category ? "primary" : "light"}
              onClick={() => setSelectedCategory(category)}
              style={{ width: "100%", margin: "5px 0" }}
            >
              {category}
            </Button>
          </div>
        ))}
      </OwlCarousel>

      <Modal.Body className="modal-body-scroll">
        <Row className="g-2">
          {currentProducts.map((product) => (
            <Col key={product.id} xs={3} sm={3} md={3} lg={3}>
              <Card>
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <Form.Group as={Row}>
                    <Col xs="6" className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          handleQuantityChange(
                            product.id,
                            Math.max(
                              0,
                              (parseInt(quantities[product.id], 10) || 0) - 1
                            )
                          )
                        } // Decrement
                        style={{ marginRight: "5px" }}
                      >
                        -
                      </Button>
                      <span>{quantities[product.id] || 0}</span>{" "}
                      {/* Display current quantity */}
                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          handleQuantityChange(
                            product.id,
                            (parseInt(quantities[product.id], 10) || 0) + 1
                          )
                        } // Increment
                        style={{ marginLeft: "5px" }}
                      >
                        +
                      </Button>
                    </Col>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal.Body>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName={"pagination justify-content-center mt-4"} // Bootstrap classes for pagination and centering
        pageLinkClassName={"page-link"} // Bootstrap classes for page links
        previousLinkClassName={"page-link"} // Bootstrap classes for previous link
        nextLinkClassName={"page-link"} // Bootstrap classes for next link
        breakLinkClassName={"page-link"} // Bootstrap classes for break link
        activeClassName={"active"} // Bootstrap class for active state
        activeLinkClassName={"page-link"} // Keeping the link style consistent
        pageClassName={"page-item"} // Bootstrap class for the page item
        previousClassName={"page-item"} // Bootstrap class for the previous item
        nextClassName={"page-item"} // Bootstrap class for the next item
        breakClassName={"page-item"} // Bootstrap class for the break item
        disabledClassName={"disabled"} // Bootstrap class for disabled state
      />

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm Selection
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ProductsGridModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

export default ProductsGridModal;
