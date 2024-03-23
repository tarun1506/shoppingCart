import React, { useState } from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import EditingPage from "../pages/EditingPage";

export default function ProductList({ products, onAddToCart, updateProduct, deleteProduct }) {
  const [selectedProduct, setSelectedProduct] = useState({
    id: 0,
    name: "",
    price: 0,
  });
  const onEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const onDeleteProduct = (product) => {
    console.log("delete product", product);
    deleteProduct(product);
  };

  return (
    <>
      <div className="row">
        {products.map((product, i) => (
          <Product
            key={i}
            product={product}
            onAddToCart={onAddToCart}
            onEditProduct={onEditProduct}
            onDeleteProduct={onDeleteProduct}
          ></Product>
        ))}
        <EditingPage
          editProduct={selectedProduct}
          updateProduct={updateProduct}
        />
      </div>
    </>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};
