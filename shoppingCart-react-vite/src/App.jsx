// import { useState } from "react";
import "./App.css";
import React from "react";
import { firebase } from "./models/MyFirebase";
import { useEffect, useState } from "react";
import Header from "./templates/Header";
import ProductList from "./components/ProductList";
import CreateNewProduct from "./components/CreateNewProduct";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cacheData, setCacheData] = useState({});
  const [lastData, setLastData] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async (pageCount) => {
    const { newProducts, lastVisibleDoc } =
      await firebase.getProductsPerPage(lastData);
    setProducts(newProducts);
    setLastData(lastVisibleDoc);
    setCacheData({ ...cacheData, [pageCount]: newProducts });
  };

  useEffect(() => {
    const getCartItems = async () => {
      const cartItems = await firebase.getCartItems();
      setCartItems(cartItems);
    };

    const fetchTotalProducts = async () => {
      const count = await firebase.getTotalCountOfProducts();
      setTotalProducts(count);
    };
    fetchProducts(currentPage);
    getCartItems();
    fetchTotalProducts();
  }, []);

  const onNext = () => {
    setCurrentPage(currentPage + 1);
    if (cacheData[currentPage + 1]) {
      setProducts(cacheData[currentPage + 1]);
      return;
    }
    fetchProducts(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setProducts(cacheData[currentPage - 1]);
    }
  };

  const addNewProduct = async ({ name, price }) => {
    const product = {
      name,
      price,
    };
    await firebase.addProduct(product);
    const products = await firebase.getProducts();
    setProducts(products);
  };

  const onAddToCart = async (product) => {
    await firebase.addProductToCart(product);
    const cartItems = await firebase.getCartItems();
    setCartItems(cartItems);
  };

  const onDelete = async (product) => {
    await firebase.deleteProduct(product);
    const cartItems = await firebase.getCartItems();
    setCartItems(cartItems);
  };

  const updateProduct = async (id, name, price) => {
    const updatedProductDetails = {
      name,
      price: +price,
    };
    await firebase.updateProduct(id, updatedProductDetails);
    const products = await firebase.getProducts();
    setProducts(products);
  };


  const totalPages = Math.ceil(totalProducts / 20);

  return (
    <>
      <div>
        <Header cartItems={cartItems} onDelete={onDelete} />
        <br />
        {/* {console.log("Products", products)} */}
        <ProductList products={products} onAddToCart={onAddToCart} updateProduct={updateProduct}/>
        <div className="w-full d-flex align-items-center justify-content-center my-4">
          <button
            className="btn btn-sm btn-primary mr-1"
            onClick={onPrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-sm btn-primary ml-1"
            onClick={onNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <CreateNewProduct addNewProduct={addNewProduct} />
      </div>
    </>
  );
}
