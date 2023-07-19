import React, {useEffect, useState} from "react";
import {Button, Spinner} from "react-bootstrap";
import DetalleRadicado from "../DetalleRadicado";
// import { radicados } from "../../utils/examples";
import {useNavigate} from "react-router-dom";
import "../inbox.css";
import {BaseUrl, pqrsBaseUrl} from "../../../utils/UrlBase";
import Filtrado from "./Filtrado";

export default function CarteleraVirtual() {
  const navigate = useNavigate();
  const [radicados, setRadicados] = useState([]);
  const [nRadicados, setNRadicados] = useState(0);
  const [loadingRequests, setLoadingRequests] = useState(false);

  useEffect(() => {
    setLoadingRequests(true);
    fetch(
      `${pqrsBaseUrl}/api/CRCCorreoRecibidoes/CRCCorreoRecibido/v2/1/true/1`
    )
      .then((response) => response.json())
      .then((data) => {
        setNRadicados(data.cantidadCargada);
        setRadicados(data.crcCorreoRecibido.reverse());
      })
      .finally(() => {
        setLoadingRequests(false);
      });
  }, []);

  const goBack = () => {
    navigate(`/Contraloria`);
  };

  return (
    <div className="container py-5">
      <span>Radicados disponibles: {nRadicados}</span>
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
        <Filtrado setRadicados={setRadicados} setNRadicados={setNRadicados} />
        <div className="table-responsive">
          <table className="table table-hover mt-4">
            {false ? (
              <div className="d-flex align-items-center justify-content-center mt-4">
                <Spinner size="md" />
              </div>
            ) : (
              <>
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
                  {loadingRequests ? (
                    <div className="d-flex align-items-center justify-content-center mt-4">
                      <Spinner size="md" />
                    </div>
                  ) : (
                    <>
                      {radicados.map((request, index) => {
                        return (
                          <DetalleRadicado
                            key={`tabla-${index}`}
                            radicado={request}
                          />
                        );
                      })}
                    </>
                  )}
                </tbody>
              </>
            )}
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
