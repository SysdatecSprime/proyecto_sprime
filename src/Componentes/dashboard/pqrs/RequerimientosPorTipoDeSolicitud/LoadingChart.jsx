import { BarChart } from "@tremor/react";

const data = [
  {
    MailDesc: "Cargando",
    Count: 0,
  },
];

export default function LoadingChart() {
  return <BarChart data={data} index="MailDesc" categories={["Count"]} />;
}
