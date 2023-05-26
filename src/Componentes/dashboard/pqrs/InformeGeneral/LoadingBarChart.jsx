import { BarChart } from "@tremor/react";

const data = [
  {
    name: "Cargando",
    Activos: 0,
    Inactivos: 0,
    Finalizados: 0,
    Otros: 0,
  },
];

export default function LoadingBarChart() {
  return (
    <BarChart
      className="mt-6"
      data={data}
      index="name"
      categories={["Activos", "Inactivos", "Finalizados", "Otros"]}
      colors={["slate", "gray", "zinc", "neutral"]}
      yAxisWidth={48}
    />
  );
}
