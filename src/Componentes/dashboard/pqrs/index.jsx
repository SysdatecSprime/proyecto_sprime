import { Title } from "@tremor/react";
import InformeGeneral from "./InformeGeneral";
import RequerimientosPorDependencia from "./RequerimientosPorDependencia";
import RequerimientosPorTipoDeSolicitud from "./RequerimientosPorTipoDeSolicitud";
import TiempoPorTipoDeSolicitud from "./TiempoPorTipoDeSolicitud";
import EstadoDeRequerimientos from "./EstadoDeRequerimientos";

export default function Pqrs() {
  return (
    <div>
      <div className="">
        <Title>Peticiones, quejas, reclamos y solicitudes</Title>
      </div>
      <div className="p-2 rounded">
        <InformeGeneral />
        <RequerimientosPorDependencia />
        <RequerimientosPorTipoDeSolicitud />
        <TiempoPorTipoDeSolicitud />
        <EstadoDeRequerimientos />
      </div>
    </div>
  );
}
