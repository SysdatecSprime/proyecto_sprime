import { BarChart } from "@tremor/react";
import LoadingBarChart from "./LoadingBarChart";

export default function GeneralBarChart({ data, loading, reload, error }) {
  console.log({data, loading, reload, error});
  if (loading) return <LoadingBarChart />;

  if (data && !error) {
    return (
      <BarChart
        className="mt-6"
        data={data}
        index="name"
        categories={["Activos", "Inactivos", "Finalizados", "Otros"]}
        colors={["blue", "purple", "green", "gray"]}
        yAxisWidth={48}
      />
    );
  }

  if (error === 404) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center max-w-xs mx-auto min-h-[70px]">
        <span className="block text-lg font-semibold">
          No hay datos para mostrar
        </span>
      </div>
    );
  }

  if (typeof error === "string") {
    return (
      <div className="flex flex-col gap-4 justify-center items-center max-w-xs mx-auto min-h-[70px]">
        <span className="block text-lg font-semibold">{error}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center max-w-xs mx-auto">
        <span className="block text-lg font-semibold">
          Hubo un error al cargar los datos
        </span>
        <button
          className="block rounded bg-slate-600 text-white px-2 py-1"
          onClick={reload}
        >
          Reintentar
        </button>
      </div>
    );
  }
}
