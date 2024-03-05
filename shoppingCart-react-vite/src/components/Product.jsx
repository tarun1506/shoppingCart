/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";


export default function Product({ product, onAddToCart }) {
 

  const onAddItem = () => {
    onAddToCart(product);
  };
  return (
    <div className="col-sm-4 mb-3">
      <div className="card border-primary mb-3" style={{ maxWidth: "15rem" }}>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <div className="d-flex justify-content-between">
            <p className="card-text">${product.price}</p>
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={onAddItem}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
