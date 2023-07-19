import React from "react";

function Position(props) {
  const isMobile = props.isMobile;
  const estiloComun = { width: "8rem", height: "3rem" };
  const estiloMobile = { width: "2rem", height: "2rem" };
  return (
    <div className="container">
      <div className="position-relative m-5">
        <div className="progress" style={{ height: "1px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width:
                props.paso === 1 ? "0%" : props.paso === 2 ? "50%" : "100%",
            }}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"></div>
        </div>
        <button
          type="button"
          className={`position-absolute top-0 start-0 translate-middle btn btn-sm btn-${
            props.paso >= 1 ? "primary" : "secondary"
          } rounded-pill`}
          style={isMobile ? estiloMobile : estiloComun}>
          1. Registro
        </button>
        <button
          type="button"
          className={`position-absolute top-0 start-50 translate-middle btn btn-sm btn-${
            props.paso >= 2 ? "primary" : "secondary"
          } rounded-pill`}
          style={isMobile ? estiloMobile : estiloComun}>
          2. Solicitud
        </button>
        <button
          type="button"
          className={`position-absolute top-0 start-100 translate-middle btn btn-sm btn-${
            props.paso >= 3 ? "primary" : "secondary"
          } rounded-pill`}
          style={isMobile ? estiloMobile : estiloComun}>
          3. Anexos
        </button>
      </div>{" "}
    </div>
  );
}

export default Position;
