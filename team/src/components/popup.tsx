import React from 'react';

const Popup = () => {
  return (
    <>
      {/* Button to Trigger the Modal */}
      <button
        type="button"
        className="btn btn-dark"
        data-bs-toggle="modal"
        data-bs-target="#addNewModal"
      >
        Add
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="addNewModal"
        tabIndex="-1"
        aria-labelledby="addNewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addNewModalLabel">
                Add New Item
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Modal content can be customized here */}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter new item"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;