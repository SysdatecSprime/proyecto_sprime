import { Card, Grid, Col, DonutChart, Legend, Title } from "@tremor/react";
import { datosDeRequerimientosRecibidos } from "../../../../Utils/dashboard/constants";

export default function RequerimientosRecibidos() {
  return (
    <Card>
      <Title className="mb-4">Gestión de requerimientos recibidos</Title>
      <Grid numCols={2} className="gap-4">
        <Col>
          <DonutChart
            variant="pie"
            data={datosDeRequerimientosRecibidos}
            index="name"
            category="requerimientos"
            valueFormatter={(number) => `${number} Req.`}
            colors={["green", "yellow"]}
          />
        </Col>

        <Col>
          <div className="flex justify-center items-center h-100">
            <Legend
              className="flex flex-col gap-2"
              categories={[`Atendidos`, `En Proceso`]}
              colors={["green", "yellow"]}
            />
          </div>
        </Col>
      </Grid>
    </Card>
  );
}
