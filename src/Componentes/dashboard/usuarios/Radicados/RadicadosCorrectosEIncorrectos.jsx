import { Card, DonutChart, Title } from "@tremor/react";

export default function RadicadosCorrectosEIncorrectos() {
  return (
    <Card>
      <Title>Radicados correctos e incorrectos</Title>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-gray-500">Radicados correctos</span>
          <span className="text-2xl font-semibold text-center flex items-center justify-around">
            150{" "}
            <small className="text-sm text-gray-400 font-normal hover:text-gray-500 transition-colors">65,21%</small>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Radicados incorrectos</span>
          <span className="text-2xl font-semibold text-center flex items-center justify-around">
            80{" "}
            <small className="text-sm text-gray-400 font-normal hover:text-gray-500 transition-colors">34,79%</small>
          </span>
        </div>
      </div>
      <DonutChart
        className="mt-6"
        data={[
          { name: "Correctos", radicados: 150 },
          { name: "Incorrectos", radicados: 80 },
        ]}
        index="name"
        category="radicados"
        valueFormatter={(number) => `${number} Radicados`}
        colors={["green", "red"]}
      />
    </Card>
  );
}
