import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import "./styles/styles.css";

function MainContainer() {
  const navigate = useNavigate();
  return (
    <>
      <div className="px-3 py-3">
        <div className="row g-4 py-5 px-2 row-cols-1 row-cols-lg-2">
          <div className="col d-flex align-items-around py-3 px-3">
            <div>
              <h2>Registrar Solicitud</h2>
              <p>
                En esta sección podrán registrar las solicitudes, soportes,
                requerimientos e incidencias para su atención
              </p>
              <button
                onClick={() => navigate("/SprimePQRS/RegistrarSolicitud")}
                className="boton-main"
              >
                Registrar solicitud
              </button>
            </div>
          </div>
          <div className="col d-flex align-items-around py-3 px-3 text-break">
            <div>
              <h2>Consulta de solicitud</h2>

              <p>
                Puede efectuar el seguimiento a las actuaciones realizadas para
                atender su petición desde el momento del registro.
              </p>
              <div className="d-grid gap-2 col-12">
                <button
                  onClick={() => navigate("/SprimePQRS/ConsultarRadicado")}
                  className="boton-main"
                >
                  Consultar solicitudes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContainer;
