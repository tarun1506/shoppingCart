import React, {useRef} from "react";
import PropTypes from "prop-types";

export default function EditingPage({ editProduct, updateProduct }) {

  const editNameRef = useRef();
  const editPriceRef = useRef();

  const saveChanges = (e) => {
    e.preventDefault();

    updateProduct(editProduct.id, editNameRef.current.value, editPriceRef.current.value);
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    ref={editNameRef}
                    defaultValue={editProduct?.name || ""}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Price:
                  </label>
                  <input
                    className="form-control"
                    id="message-text"
                    ref={editPriceRef}
                    defaultValue={editProduct?.price || ""}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveChanges}
                data-bs-dismiss="modal"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

EditingPage.propTypes = {
  editProduct: PropTypes.object.isRequired,
  updateProduct: PropTypes.func.isRequired,
};
