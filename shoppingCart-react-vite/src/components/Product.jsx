/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import PropTypes from "prop-types";

export default function Product({
  product,
  onAddToCart,
  onEditProduct,
  onDeleteProduct,
}) {
  const cartBtnRef = useRef();

  const onAddItem = () => {
    onAddToCart(product);
  };

  return (
    <div className="col-sm-4 mb-3">
      <div className="card border-primary mb-3" style={{ maxWidth: "18rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{product.name}</h5>
            <button
              type="button"
              aria-label={`Delete ${product.name}`}
              className="btn btn-outline-danger inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => onDeleteProduct(product)}
            >
              X
            </button>
          </div>
          <br />
          <div className="d-flex justify-content-between">
            <p className="card-text">${product.price}</p>
            <button
              type="button"
              className="btn btn-success btn-sm"
              ref={cartBtnRef}
              onClick={onAddItem}
            >
              Add to Cart
            </button>

            <button
              type="button"
              className="btn btn-primary btn-md"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => onEditProduct(product)}
            >
              Edit
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
  onEditProduct: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
};
