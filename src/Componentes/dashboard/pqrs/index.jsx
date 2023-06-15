import {Title, Tab, TabList} from "@tremor/react";
import InformeGeneral from "./InformeGeneral";
import RequerimientosPorDependencia from "./RequerimientosPorDependencia";
import RequerimientosPorTipoDeSolicitud from "./RequerimientosPorTipoDeSolicitud";
import TiempoPorTipoDeSolicitud from "./TiempoPorTipoDeSolicitud";
import EstadoDeRequerimientos from "./EstadoDeRequerimientos";
import CRC from "./CRC";
import React, {useState} from "react";
import "./Dashboard.css"; // Archivo CSS para estilos del Dashboard

export default function Pqrs() {
  const [showCard, setShowCard] = useState(true);
  return (
    <div className="dashboard">
      <div className="">
        <Title>Dashboard General</Title>
      </div>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setShowCard(value === "1")}
        className="mt-6"
      >
        <Tab value="1" text="Radicados" />
        <Tab value="2" text="Usuarios" />
      </TabList>

      {showCard === true ? (
        <div className="p-2 rounded">
          <InformeGeneral />
          <RequerimientosPorDependencia />
          <RequerimientosPorTipoDeSolicitud />
          <TiempoPorTipoDeSolicitud />
          <EstadoDeRequerimientos />
        </div>
      ) : (
        <div className="p-2 rounded">
          <CRC />
        </div>
      )}
    </div>
  );
}
