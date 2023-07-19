import React from "react";
import {useNavigate} from "react-router-dom";
import {radicadoRespondido} from "../../../utils/examples";
import TitlesLabel from "../TitlesLabel";
import DetalleRadicado from ".";
import {Button} from "react-bootstrap";

export default function EjemploRadicado() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/Contraloria/ConsultarRadicado`);
  };

  return (
    <div className="container py-5">
      <TitlesLabel titulo={`Hola `} parrafo="Estas son tus solicitudes:" />
      <div className="legend">
        <div className="semaforo">
          <div>
            <div className="inbox-convention-text">Resuelto</div>
            <div className="inbox-convention-color green"></div>
          </div>
          <div>
            <div className="inbox-convention-text">En Revisión</div>
            <div className="inbox-convention-color yellow"></div>
          </div>
          <div>
            <div className="inbox-convention-text">Inactivo/Rechazado</div>
            <div className="inbox-convention-color red"></div>
          </div>
        </div>
      </div>

      <div className="shadow p-5 mb-5 bg-body-tertiary rounded">
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Buscar"
        />

        <div className="table-responsive">
          <table className="table table-hover mt-4">
            <thead>
              <tr>
                <th>No. Radicado</th>
                <th>Tipo de solicitud</th>
                <th>Asunto</th>
                <th>Fecha de creación</th>
                <th className="text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {radicadoRespondido.map((request, index) => {
                return (
                  <DetalleRadicado key={`tabla-${index}`} radicado={request} />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Button
        onClick={goBack}
        style={{
          backgroundColor: "#0856af"
        }}
      >
        Atrás
      </Button>
    </div>
  );
}
