import React from "react";
import PropTypes from "prop-types";

export default function ShoppingCartPage({ cartItems, onDelete }) {
  const renderCartItems = (item, i) => {
    return (
      <>
        <ol className="list-group list-group">
          <li
            key={i}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>${item.price}
            </div>
            <span className="badge rounded-pill">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="red"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
                onClick={() => onDelete(item)}
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"></path>
              </svg>
            </span>
          </li>
        </ol>
        <br />
      </>
    );
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h5 id="offcanvasRightLabel">Shopping Cart</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <ul>{cartItems.map(renderCartItems)}</ul>
        <div className="d-flex justify-content-between">
          <div>
            <h3>Total</h3>
          </div>
          <span><h3>${cartItems.reduce((acc, item) => acc + item.price, 0)}</h3></span>
        </div>
      </div>
    </div>
  );
}

ShoppingCartPage.propTypes = {
  cartItems: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
