import { Title } from "@tremor/react";
import InformeGeneral from "./InformeGeneral";
import RequerimientosPorDependencia from "./RequerimientosPorDependencia";
import RequerimientosPorTipoDeSolicitud from "./RequerimientosPorTipoDeSolicitud";
import TiempoPorTipoDeSolicitud from "./TiempoPorTipoDeSolicitud";
import EstadoDeRequerimientos from "./EstadoDeRequerimientos";
import CRC from "./CRC";
import React from "react";
import "./Dashboard.css"; // Archivo CSS para estilos del Dashboard

export default function Pqrs() {
  return (
    <div className="dashboard">
      <div className="">
        <Title>Dashboard General</Title>
      </div>
      <div className="p-2 rounded">
        <InformeGeneral />
        <RequerimientosPorDependencia />
        <RequerimientosPorTipoDeSolicitud />
        <TiempoPorTipoDeSolicitud />
        <EstadoDeRequerimientos />
        <CRC />
      </div>
    </div>
  );
}
