import React from "react";
import styles from "./styles/styles.module.css";
import {ESTADO_RADICADO} from "./utils/statuses";
import {AiOutlineFileDone} from "react-icons/ai";

export default function Detail({
  asunto,
  estado,
  fechaDeCreacion,
  fechaDeUltimaActualizacion,
  observaciones,
  tipoDeSolicitud,
  archivos
}) {
  return (
    <>
      <h3 className={styles.modalDetailTitle}>Detalle del radicado</h3>
      <div>
        {tipoDeSolicitud && (
          <DetailElement title="Tipo de Solicitud" value={tipoDeSolicitud} />
        )}
        {asunto && <DetailElement title="Asunto" value={asunto} />}
        {estado && (
          <DetailElement
            title="Estado"
            value={estado < 4 ? ESTADO_RADICADO[estado] : "Resuelto"}
          />
        )}
        {fechaDeCreacion && (
          <DetailElement title="Fecha de creación" value={fechaDeCreacion} />
        )}
        {fechaDeUltimaActualizacion && (
          <DetailElement
            title="Fecha de última actualización"
            value={fechaDeUltimaActualizacion}
          />
        )}
        {observaciones && (
          <DetailElement title="Observaciones" value={observaciones} />
        )}
        {archivos && archivos.length > 0 && (
          <div>
            <h4 className={styles.modalDetailSubtitle}>Archivos</h4>
            <ul className={styles.modalDetailFileList}>
              {archivos.map((archivo, index) => (
                <li key={index}>
                  <a href={archivo.url} download={archivo.name}>
                    <AiOutlineFileDone />
                    <span>{archivo.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

function DetailElement({title, value}) {
  return (
    <div>
      <h4 className={styles.modalDetailSubtitle}>{title}</h4>
      <p className={styles.modalDetailValue}>{value}</p>
    </div>
  );
}
