import { Card, Title, Grid, Col, DonutChart, Legend } from "@tremor/react";
import { datosDeEstadoRequerimientoEnProceso } from "../../../../Utils/dashboard/constants";

export default function EstadoRequerimientosEnProceso() {
  return (
    <Card>
      <Title className="mb-4">Estado de requerimientos en proceso</Title>
      <Grid numCols={2} className="gap-4">
        <Col>
          <DonutChart
            variant="pie"
            data={datosDeEstadoRequerimientoEnProceso}
            index="name"
            category="requerimientos"
            valueFormatter={(number) => `${number} Req.`}
            colors={["blue", "purple"]}
          />
        </Col>

        <Col>
          <div className="flex justify-center items-center h-100">
            <Legend
              className="flex flex-col gap-2"
              categories={[`Vigentes`, `Vencidos`]}
              colors={["blue", "purple"]}
            />
          </div>
        </Col>
      </Grid>
    </Card>
  );
}
