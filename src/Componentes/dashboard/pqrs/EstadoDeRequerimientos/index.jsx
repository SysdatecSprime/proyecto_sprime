import { Col, Grid } from "@tremor/react";
import GestionRealizadaDeRequerimientos from "./GestionRealizadaDeRequerimientos";
import EstadoRequerimientosEnProceso from "./EstadoRequerimientosEnProceso";
import RequerimientosRecibidos from "./RequerimientosRecibidos";

export default function EstadoDeRequerimientos() {
  return (
    <Grid numColsLg={3} className="gap-4">
      <Col>
        <GestionRealizadaDeRequerimientos />
      </Col>
      <Col>
        <EstadoRequerimientosEnProceso />
      </Col>
      <Col>
        <RequerimientosRecibidos />
      </Col>
    </Grid>
  );
}
