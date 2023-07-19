import React, { useState } from "react";
import { fechaFormateada } from "../../../utils/date";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { pqrsBaseUrl } from "../../../utils/UrlBase";

export default function FiltradoPorFecha({ setNRadicados, setRadicados }) {
  const [fechaDesde, setFechaDesde] = useState();
  const [fechaHasta, setFechaHasta] = useState();
  const [loading, setLoading] = useState(false);

  const hoy = fechaFormateada(new Date());

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    const Desde = fechaDesde.split("-").join("");
    const Hasta = fechaHasta.split("-").join("");
    fetch(
      `${pqrsBaseUrl}/api/CRCCorreoRecibidoes/CRCCorreoRecibido/v2/Desde=${Desde}&Hasta=${Hasta}&Anonimos=true&Anexos=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setNRadicados(data.cantidadCargada);
        setRadicados(data.crcCorreoRecibido.reverse());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Formulario onSubmit={handleSearch}>
      <Control>
        <label>Desde</label>
        <input
          type="date"
          className="form-control"
          required
          value={fechaDesde}
          onChange={(e) => {
            setFechaDesde(e.target.value);
            setFechaHasta();
          }}
          max={hoy}
        />
      </Control>
      <Control>
        <label>Hasta</label>
        <input
          type="date"
          className="form-control"
          required
          disabled={!fechaDesde}
          min={fechaDesde}
          max={hoy}
          value={fechaHasta}
          onChange={(e) => {
            setFechaHasta(e.target.value);
          }}
        />
      </Control>
      <Button
        type="submit"
        style={{
          backgroundColor: "#0856af",
        }}
        disabled={loading}
      >
        Buscar
      </Button>
    </Formulario>
  );
}

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Control = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;
