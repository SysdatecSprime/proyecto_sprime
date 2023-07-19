import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TitlesLabel = ({ titulo, parrafo }) => {
  return (
    <div className="container">
      <section className="py-2 px-2">
        <div className="row">
          <div className="col-9">
            <h4 className="font-weight-bold mb-0">{titulo}</h4>
            <p className="lead text-muted">{parrafo}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TitlesLabel;
