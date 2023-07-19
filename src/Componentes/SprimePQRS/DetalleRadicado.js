import {useState} from "react";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import styles from "./styles/styles.module.css";
import Detail from "./Detail";
import History from "./History";
import {strToFormattedDate} from "./utils/date";
import {Base64ListToUrlList} from "./utils/files";
import {useEffect} from "react";
import {BaseUrl, pqrsBaseUrl} from "./utils/UrlBase";

export default function DetalleRadicado({radicado}) {
  const [radicadoActual, setRadicadoActual] = useState(radicado);
  const [tipoSolicitud, setTipoSolicitud] = useState("PETICIÓN GENERAL");

  const fechaDeCreacionFormateada = strToFormattedDate(
    radicado.creadoEl || radicado?.crcCorreoRecibido?.creadoEl
  );
  const fechaDeModificacionFormateada = strToFormattedDate(
    radicado.modificadoEl || radicado?.crcCorreoRecibido?.modificadoEl
  );

  useEffect(() => {
    const getRadicado = async () => {
      const getRequestsProm = await fetch(
        `${pqrsBaseUrl}/api/CRCCorreoRecibidoes/${radicadoActual.idCorreoRecibido}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const getRequestsResp = await getRequestsProm.json();
      setRadicadoActual((actual) => ({
        ...actual,
        crcCorreoRecibido: getRequestsResp.crcCorreoRecibido,
        crcCorreoEnviado: getRequestsResp.crcCorreoEnviado,
        archivosAnexosEnviados: getRequestsResp.archivosAnexosEnviados
      }));

      if (getRequestsResp.archivosAnexos[0].nombre !== "Sin Anexos") {
        setRadicadoActual((actual) => ({
          ...actual,
          archivosAnexos2: Base64ListToUrlList(getRequestsResp.archivosAnexos)
        }));
      }
    };

    const getTipoDeSolicitud = async () => {
      const getRequestsProm = await fetch(
        `${BaseUrl}/api/WF_MailClass/${radicadoActual.idClaseCorrespondencia}`
      );
      const getRequestsResp = await getRequestsProm.json();
      setTipoSolicitud(getRequestsResp.mailDesc);
    };

    if (radicadoActual.idClaseCorrespondencia !== 1) {
      getTipoDeSolicitud();
    }

    if (!radicadoActual.archivosAnexos) {
      getRadicado();
    }
  }, [
    radicadoActual.archivosAnexos,
    radicadoActual.idClaseCorrespondencia,
    radicadoActual.idCorreoRecibido
  ]);

  const archivos =
    radicado.archivosAnexos &&
    radicado.archivosAnexos[0].nombre !== "Sin Anexos"
      ? Base64ListToUrlList(radicado.archivosAnexos)
      : [];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <tr className={styles.tableRowBtn} onClick={handleShow}>
        <td>
          {radicado.idCorreoRecibido ||
            radicado?.crcCorreoRecibido?.idCorreoRecibido ||
            "-"}
        </td>
        <td>{tipoSolicitud || "PETICIÓN GENERAL"}</td>
        <td>{radicado.asunto || radicado?.crcCorreoRecibido?.asunto || "-"}</td>
        <td>{fechaDeCreacionFormateada || "-"}</td>
        <td>
          <div
            className={`inbox-convention-color ${
              radicado.estado === 1
                ? "yellow"
                : radicado.estado === 2 || radicado.estado === 3
                ? "red"
                : "green"
            }`}
          ></div>
        </td>
      </tr>

      <Modal show={show} onHide={handleClose} size="xl" centered>
        <header className={styles.modalHeader}>
          <h3 className="fw-bold">
            Radicado #{" "}
            {radicado.idCorreoRecibido ||
              radicado?.crcCorreoRecibido?.idCorreoRecibido}
          </h3>
        </header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs className={styles.modalDetail}>
                <Detail
                  tipo={radicado.tipo || radicado?.crcCorreoRecibido?.tipo}
                  asunto={
                    radicado.asunto || radicado?.crcCorreoRecibido?.asunto
                  }
                  estado={
                    radicado.estado || radicado?.crcCorreoRecibido?.estado
                  }
                  fechaDeCreacion={fechaDeCreacionFormateada}
                  fechaDeUltimaActualizacion={fechaDeModificacionFormateada}
                  observaciones={
                    radicado.observaciones ||
                    radicado?.crcCorreoRecibido?.observaciones
                  }
                  archivos={radicadoActual.archivosAnexos2 || archivos}
                />
              </Col>
              <Col xs lg={8}>
                <History
                  idRadicado={
                    radicado.idCorreoRecibido ||
                    radicado?.crcCorreoRecibido?.idCorreoRecibido
                  }
                  respuesta={{
                    descripcion: radicadoActual?.crcCorreoEnviado,
                    archivos: radicadoActual?.archivosAnexosEnviados
                  }}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
