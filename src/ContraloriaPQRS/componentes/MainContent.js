import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import {useNavigate} from "react-router-dom";

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
                A través de este formulario usted puede presentar todo tipo de
                solicitudes ante la Auditoría General de la República: derechos
                de petición de interés general, derechos de petición de interés
                particular, denuncias de control fiscal, denuncias por soborno,
                peticiones entre entidades, quejas, reclamos, recomendaciones,
                agradecimientos, entre otras.
              </p>
              <button
                onClick={() => navigate("/Contraloria/RegisterView")}
                className="boton-main"
              >
                Registrar solicitud
              </button>
              <br />
              <a className="anonimo">Puede realizar solicitudes anónimas</a>
            </div>
          </div>
          <div className="col d-flex align-items-around py-3 px-3 text-break">
            <div>
              <h2>Consulta de solicitud</h2>

              <p>
                Puede efectuar el seguimiento a las actuaciones realizadas para
                atender su petición desde el momento del registro hasta el
                archivo.
              </p>
              <div className="d-grid gap-2 col-12">
                <button
                  onClick={() => navigate("/Contraloria/ConsultarRadicado")}
                  className="boton-main"
                >
                  Consultar solicitud
                </button>
                <button
                  onClick={() => navigate("/Contraloria/CarteleraVirtual")}
                  className="boton-main"
                  type="button"
                >
                  Ver cartelera virtual
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-4 py-3 px-2 row-cols-1 row-cols-lg-2">
          <div className="col d-flex align-items-around py-3 px-3">
            <div>
              <h2>Actualizar datos</h2>
              <p>
                Acá puede hacer una actualización de informacion de su usuario.
              </p>
              <button
                onClick={() => navigate("/Contraloria/ActualizarDatos")}
                className="boton-main"
              >
                Actualizar datos
              </button>
            </div>
          </div>
          <div className="col d-flex align-items-around py-3 px-3">
            <div>
              <h2>Otras cosas que puedes hacer</h2>
              <div className="d-grid gap-2 col-12">
                <button
                  onClick={() => navigate("#")}
                  className="boton-main"
                  type="button"
                >
                  Descargar manual del ciudadano
                </button>

                {/* <button
                  onClick={() => navigate("#")}
                  className="boton-main"
                  type="button">
                  Hacer encuesta de satisfacción
                </button>
                <button
                  onClick={() => navigate("/SidebarCopia")}
                  className="boton-main">
                  Bandeja
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContainer;
