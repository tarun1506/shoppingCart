import React, { useRef } from "react";
import PropTypes from "prop-types";

export default function CreateNewProduct({ addNewProduct }) {
  const nameRef = useRef();
  const priceRef = useRef();

  const addProductHelper = (e) => {
    e.preventDefault();
    addNewProduct({
      name: nameRef.current.value,
      price: +priceRef.current.value,
    });
  };

  return (
    <div>
      <h1>Create New Product</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name{" "}
          </label>
          <input type="text" className="form-control" id="name" ref={nameRef} />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price{" "}
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            ref={priceRef}
          />
        </div>
        <button className="btn btn-primary" onClick={addProductHelper}>
          Create New Product
        </button>
      </form>
    </div>
  );
}

CreateNewProduct.propTypes = {
  addNewProduct: PropTypes.func.isRequired,
};
