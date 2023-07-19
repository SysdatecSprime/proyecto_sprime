import React, {useState, useEffect} from "react";
import {Button, Spinner} from "react-bootstrap";
import TitlesLabel from "./TitlesLabel";
import "./inbox.css";
import {pqrsBaseUrl} from "../../utils/UrlBase";
import {useLocation, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import DetalleRadicado from "./DetalleRadicado";
// import { radicado } from "../../utils/examples";

function RequestsInbox(props) {
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const IdRadicado = params.get("IdRadicado");

  useEffect(() => {
    getRequests();
  }, []);

  async function getRequests() {
    try {
      const getRequestsProm = await fetch(
        `${pqrsBaseUrl}/api/CRCCorreoRecibidoes/${IdRadicado}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const getRequestsResp = await getRequestsProm.json();
      const {crcCorreoRecibido} = getRequestsResp;
      if (getRequestsProm.ok && crcCorreoRecibido.personaRemite) {
        if (getRequestsResp.archivosAnexos[0].nombre !== "Sin Anexos") {
          crcCorreoRecibido.archivosAnexos = getRequestsResp.archivosAnexos;
        }
        setRequests([crcCorreoRecibido]);
        setUserName(crcCorreoRecibido.personaRemite);
      } else {
        Swal.fire({
          title: "Radicado no encontrado",
          text: "Error",
          icon: "error",
          confirmButtonText: "Regresar"
        }).then((result) => {
          navigate(`/Contraloria/ConsultarRadicado`);
        });
      }
      console.log(crcCorreoRecibido);
    } catch (e) {
      Swal.fire({
        title: "Radicado no encontrado",
        text: "Error",
        icon: "error",
        confirmButtonText: "Regresar"
      }).then((result) => {
        navigate(`/Contraloria/ConsultarRadicado`);
      });
    }

    setLoadingRequests(false);
  }

  const goBack = () => {
    navigate(`/Contraloria/ConsultarRadicado`);
  };

  return (
    <div className="container py-5">
      <TitlesLabel
        titulo={`Hola ${userName}`}
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
            {loadingRequests ? (
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
                  {requests.map((request, index) => {
                    return (
                      <DetalleRadicado
                        key={`tabla-${index}`}
                        radicado={request}
                      />
                    );
                  })}
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

export default RequestsInbox;
