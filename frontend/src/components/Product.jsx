import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "../assets/styles/productCard.css"; // Asegúrate de importar tu archivo CSS

const Product = ({ product }) => {
  const formattedPrice = (price) => price.toFixed(2);

  // Verifica si el producto está fuera de stock
  const isOutOfStock = product.countInStock === 0;

  return (
    <Card
      className={`my-3 p-3 rounded custom-card ${
        isOutOfStock ? "out-of-stock" : ""
      }`}
    >
      {isOutOfStock ? (
        <div className="stock-badge">SIN STOCK</div>
      ) : (
        product.discountPrice && <div className="promo-badge">PROMO</div>
      )}
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          className="custom-card-img"
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title custom-card-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            className="custom-rating"
          />
        </Card.Text>

        <Card.Text
          as="div"
          className={`price-container ${
            product.discountPrice && !isOutOfStock ? "has-discount" : ""
          }`}
        >
          {product.discountPrice && !isOutOfStock ? (
            <>
              <span className="original-price">
                ${formattedPrice(product.price)}
              </span>
              <span className="discount-price">
                ${formattedPrice(product.discountPrice)}
              </span>
            </>
          ) : (
            !isOutOfStock && (
              <span className="custom-price">
                ${formattedPrice(product.price)}
              </span>
            )
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
/*
import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "../assets/styles/productCard.css"; // Asegúrate de importar tu archivo CSS

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded custom-card">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          className="custom-card-img"
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title custom-card-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            className="custom-rating"
          />
        </Card.Text>

        <Card.Text as="h3" className="custom-price">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
*/
