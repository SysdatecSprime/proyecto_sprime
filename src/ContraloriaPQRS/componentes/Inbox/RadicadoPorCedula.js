/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import TitlesLabel from "./TitlesLabel";
import {Button, Spinner} from "react-bootstrap";
import DetalleRadicado from "./DetalleRadicado";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./inbox.css";
import {useState} from "react";
import {cargaRadicadosUrl} from "../../utils/UrlBase";
import Swal from "sweetalert2";
export default function RadicadoPorCedula() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const numeroDocumento = searchParams.get("id");

  const [loadingRequests, setLoadingRequests] = useState(true);
  const [radicados, setRadicados] = useState([]);

  const goBack = () => {
    navigate(`/Contraloria/ConsultarRadicado`);
  };

  useEffect(() => {
    getRequests();
  }, []);

  async function getRequests() {
    try {
      const data = await fetch(
        `${cargaRadicadosUrl}/api/CRCCorreoRecibidoes/${numeroDocumento}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const response = await data.json();
      if (data.ok && response.length > 0) {
        setRadicados(response);
      } else {
        Swal.fire({
          title: "Cédula No encontrada",
          text: "Error",
          icon: "error",
          confirmButtonText: "Regresar"
        }).then((result) => {
          navigate(`/Contraloria/ConsultarRadicado`);
        });
      }
      console.log(response);
    } catch (e) {
      Swal.fire({
        title: "Cédula No encontrada",
        text: "Error",
        icon: "error",
        confirmButtonText: "Regresar"
      }).then((result) => {
        navigate(`/Contraloria/ConsultarRadicado`);
      });
    }

    setLoadingRequests(false);
  }

  if (radicados.length > 0) {
    return (
      <div className="container py-5">
        <TitlesLabel
          titulo={`Hola ${radicados[0].personaRemite}`}
          parrafo="Estas son tus solicitudes:"
        />
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
                  {radicados.map((request, index) => {
                    return (
                      <DetalleRadicado
                        key={`tabla-${index}`}
                        radicado={request}
                      />
                    );
                  })}
                </tbody>
              </>
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
  } else {
    return (
      <div className="d-flex align-items-center justify-content-center mt-4">
        <Spinner size="md" />
      </div>
    );
  }
}
