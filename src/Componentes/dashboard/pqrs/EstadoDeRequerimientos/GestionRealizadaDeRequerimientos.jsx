import { Card, Col, DonutChart, Grid, Legend, Title } from "@tremor/react";
import { datosDeGestionRealizadaDeRequerimientos } from "../../../../Utils/dashboard/constants";

export default function GestionRealizadaDeRequerimientos() {
  return (
    <Card>
      <Title className="mb-4">Gestión realizada de requerimientos</Title>
      <Grid numCols={2} className="gap-4">
        <Col>
          <DonutChart
            variant="pie"
            data={datosDeGestionRealizadaDeRequerimientos}
            index="name"
            category="requerimientos"
            valueFormatter={(number) => `${number} Req.`}
            colors={["green", "red", "yellow"]}
          />
        </Col>

        <Col>
          <div className="flex justify-center items-center h-100">
            <Legend
              className="flex flex-col gap-2"
              categories={[`Atendidos`, `Cancelados`, `En Proceso`]}
              colors={["green", "red", "yellow"]}
            />
          </div>
        </Col>
      </Grid>
    </Card>
  );
}
