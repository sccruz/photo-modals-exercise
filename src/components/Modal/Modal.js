import React, { useState, useEffect } from "react";

import "./Modal.scss";

const Modal = props => {
  const [data, setData] = useState(props.data);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const close = () => {
    setDescription("");
    props.close.call();
  };

  const save = evt => {
    evt.preventDefault();
    let _description = description;

    // TODO: figure out why this doesn't work, possibly creat a custom hook instead;
    setData({ ...data, description: _description });

    setDescription("");
    props.close.call(null, { ...data, description: _description });
  };

  return (
    <div
      className={`modal fade ${props.show ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{!!data ? data.title : ""}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={close}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-body-content">
              <img
                src={!!data ? data.url : ""}
                alt={!!data ? data.title : ""}
              />
              <p>
                <span>Description: </span>
                <span>
                  {!!data && !!data.description
                    ? data.description
                    : "This photo does not have a description."}
                </span>
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <form className="form-inline" onSubmit={save}>
              <div className="form-group input-container">
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Add a description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group btn-container">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={save}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={close}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
