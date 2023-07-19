import React from "react";

const Position = props => {
  return (
    <div className="position-relative m-4">
      <div
        className="progress"
        role="progressbar"
        aria-label="Progress"
        aria-valuenow="50"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ height: "1px" }}>
        <div
          className="progress-bar"
          style={{
            width: props.paso === 1 ? "0%" : props.paso === 2 ? "50%" : "100%",
          }}></div>
      </div>
      <button
        type="button"
        className={`position-absolute top-0 start-0 translate-middle btn btn-sm btn-${
          props.paso >= 1 ? "primary" : "secondary"
        } rounded-pill`}
        style={{ width: "2rem", height: "2rem" }}>
        1
      </button>
      <button
        type="button"
        className={`position-absolute top-0 start-50 translate-middle btn btn-sm btn-${
          props.paso >= 2 ? "primary" : "secondary"
        } rounded-pill`}
        style={{ width: "2rem", height: "2rem" }}>
        2
      </button>
      <button
        type="button"
        className={`position-absolute top-0 start-100 translate-middle btn btn-sm btn-${
          props.paso >= 3 ? "primary" : "secondary"
        } rounded-pill`}
        style={{ width: "2rem", height: "2rem" }}>
        3
      </button>
    </div>
  );
};

export default Position;
