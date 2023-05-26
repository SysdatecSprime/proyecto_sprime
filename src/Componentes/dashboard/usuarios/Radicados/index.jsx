import { Col, Grid } from "@tremor/react";
import RadicadosCorrectosEIncorrectos from "./RadicadosCorrectosEIncorrectos";
import Observaciones from "./Observaciones";

export default function Radicados() {
  return (
    <Grid numColsLg={11} className="gap-4">
      <Col numColSpanLg={8}>
        <Observaciones />
      </Col>
      <Col numColSpanLg={3}>
        <RadicadosCorrectosEIncorrectos />
      </Col>
    </Grid>
  );
}
