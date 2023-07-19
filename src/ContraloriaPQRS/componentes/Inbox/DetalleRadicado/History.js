import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { cargaRadicadosUrl } from "../../../utils/UrlBase";
import { strToFormattedDate } from "../../../utils/date";
import { historialRadicados } from "../../../utils/examples";
import { Button, Spinner } from "react-bootstrap";
import AñadirRespuesta from "../AñadirRespuesta";
import { Base64ListToUrlList } from "../../../utils/files";
import { AiOutlineFileDone } from "react-icons/ai";

export default function History({ idRadicado, respuesta }) {
  const [loading, setLoading] = useState(false);
  const [historical, setHistorical] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${cargaRadicadosUrl}/api/Token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Autenticacion: "SprimeWS",
        Clave: "12345678",
      }),
    })
      .then((response) => response.text())
      .then((token) => {
        fetch(`${cargaRadicadosUrl}/api/CRCFlujoCorreos/${idRadicado}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log({ data2: data });
            const historical = data.reverse().map((item) => ({
              idFlujoCorreo: item.idFlujoCorreo,
              creadoEl: item.creadoEl,
              observaciones: item.observaciones,
              // estado: item.estado,
            }));
            const filteredHistorical = historical.filter(
              (item, index, self) =>
                index ===
                self.findIndex(
                  (t) =>
                    t.creadoEl === item.creadoEl &&
                    t.observaciones === item.observaciones
                )
            );
            setHistorical(filteredHistorical);
          });
      })
      .finally(() => setLoading(false));
  }, [idRadicado]);

  const filteredExample = historialRadicados.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.creadoEl === item.creadoEl && t.observaciones === item.observaciones
      )
  );

  const descripcionRespuesta = respuesta?.descripcion;
  const archivosRespuesta = respuesta?.archivos;
  console.log({ archivosRespuesta });

  const archivosRespuestaReales =
    archivosRespuesta && archivosRespuesta[0].nombre !== "Sin Anexos"
      ? Base64ListToUrlList(archivosRespuesta)
      : [];

  return (
    <>
      <h3 className={styles.modalDetailTitle}>Historial</h3>
      <div className={styles.modalHistory}>
        {loading ? (
          <div className="d-flex align-items-center justify-content-center mt-4">
            <Spinner size="md" />
          </div>
        ) : (
          <>
            {historical.map((history) => (
              <HistoryElement
                key={history.idFlujoCorreo}
                date={history.creadoEl}
                description={history.observaciones}
                isResponseLeft={history.faltaRespuesta}
                isResponded={history.terminado}
              />
            ))}
            {descripcionRespuesta && (
              <HistoryElement
                date={descripcionRespuesta.fecha}
                description={descripcionRespuesta.asunto}
                files={archivosRespuestaReales}
                isResponded={true}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

function HistoryElement({
  description,
  date,
  isResponseLeft,
  isResponded,
  files,
}) {
  const formattedDate = strToFormattedDate(date);

  const backgroundColor = isResponseLeft
    ? "#FFD60042"
    : isResponded
    ? "#17e11424"
    : "";

  return (
    <div
      className={styles.modalHistoryElement}
      style={{
        backgroundColor,
      }}
    >
      <span className={styles.modalHistoryElementResponsible}>
        {formattedDate}
      </span>
      <p className={styles.modalHistoryElementDescription}>
        {description || "NO HAY OBSERVACIONES"}
      </p>
      {isResponseLeft && <AñadirRespuesta descripcion={description} />}
      {files?.length > 0 &&
        (isResponded ? (
          <BtnAnexos esRespuesta={isResponded} archivos={files} />
        ) : (
          <BtnAnexos archivos={files} />
        ))}
    </div>
  );
}

function BtnAnexos({ esRespuesta, archivos }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  if (esRespuesta) {
    return (
      <div
        style={{
          position: "relative",
        }}
      >
        <button
          className={styles.modalHistoryElementBtnRes}
          onClick={handleClick}
        >
          {show ? "CERRAR" : "VER"} RESPUESTA
        </button>
        {show && (
          <ul className={styles.modalHistoryElementFiles}>
            {archivos.map((archivo, index) => (
              <li key={index}>
                <a href={archivo.url} download={archivo.name}>
                  <AiOutlineFileDone />
                  <span>{archivo.name}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div>
      <Button onClick={handleClick} className={styles.modalHistoryElementBtn}>
        {show ? "CERRAR" : "VER"} ANEXO
      </Button>
      {show && (
        <ul className={styles.modalHistoryElementFiles}>
          {archivos.map((archivo, index) => (
            <li key={index}>
              <a href={archivo.url} download={archivo.name}>
                <AiOutlineFileDone />
                <span>{archivo.name}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
