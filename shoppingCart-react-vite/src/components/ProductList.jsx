import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";

export default function ProductList({ products, onAddToCart }) {

  return (
    <>
      <div className="row">
        {products.map((product, i) => (
          <Product
            key={i}
            product={product}
            onAddToCart={onAddToCart}
          ></Product>
        ))}
      </div>
    </>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
