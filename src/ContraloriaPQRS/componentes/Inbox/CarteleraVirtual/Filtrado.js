import React from "react";
import { useState } from "react";
import FiltradoPorFecha from "./FiltradoPorFecha";
import FiltradoPorDias from "./FiltradoPorDias";
import styled from "styled-components";

export default function Filtrado({ setRadicados, setNRadicados }) {
  const [tipoDeFiltrado, setTipoDeFiltrado] = useState("1");

  return (
    <Filtro>
      <div>
        <FiltroLabel htmlFor="tipoDeFiltrado">
          Selecciona el filtrado de los radicados:
        </FiltroLabel>
        <select
          id="tipoDeFiltrado"
          className="form-select"
          value={tipoDeFiltrado}
          onChange={(e) => setTipoDeFiltrado(e.target.value)}
        >
          <option value="1">Días atrás</option>
          <option value="2">Rango de fecha</option>
        </select>
      </div>
      {tipoDeFiltrado === "1" && (
        <FiltradoPorDias
          setRadicados={setRadicados}
          setNRadicados={setNRadicados}
        />
      )}
      {tipoDeFiltrado === "2" && (
        <FiltradoPorFecha
          setRadicados={setRadicados}
          setNRadicados={setNRadicados}
        />
      )}
    </Filtro>
  );
}

const Filtro = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FiltroLabel = styled.label`
  margin-bottom: 0.5rem;
`;
