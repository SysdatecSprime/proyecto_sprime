import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { pqrsBaseUrl } from "../../../utils/UrlBase";

export default function FiltradoPorDias({ setRadicados, setNRadicados }) {
  const [diasAtras, setDiasAtras] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(
      `${pqrsBaseUrl}/api/CRCCorreoRecibidoes/CRCCorreoRecibido/v2/${diasAtras}/true/1`
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
      <label htmlFor="diasAtras">Días atrás:</label>
      <Control>
        <input
          type="number"
          id="diasAtras"
          className="form-control"
          required
          min={1}
          step={1}
          value={diasAtras}
          onChange={(e) => {
            setDiasAtras(Math.floor(e.target.value));
          }}
        />
        <Button
          type="submit"
          style={{
            backgroundColor: "#0856af",
          }}
          disabled={loading}
        >
          Buscar
        </Button>
      </Control>
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
