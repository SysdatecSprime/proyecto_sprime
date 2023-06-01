import { Card, DonutChart } from "@tremor/react";

const UsuariosActivosDonut = () => {
  return (
    <Card>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-gray-500">Usuarios activos</span>
          <span className="text-2xl font-semibold text-center flex items-center justify-around">
            150{" "}
            <small className="text-sm text-gray-400 font-normal hover:text-gray-500 transition-colors">
              83,33%
            </small>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Usuarios inactivos</span>
          <span className="text-2xl font-semibold text-center flex items-center justify-around">
            30{" "}
            <small className="text-sm text-gray-400 font-normal hover:text-gray-500 transition-colors">
              16,67%
            </small>
          </span>
        </div>
      </div>
      <DonutChart
        className="mt-6"
        data={[
          { name: "Activos", usuarios: 150 },
          { name: "Inactivos", usuarios: 30 },
        ]}
        index="name"
        category="usuarios"
        valueFormatter={(number) => `${number} Usuarios`}
        colors={["green", "yellow"]}
      />
    </Card>
  );
};

export default UsuariosActivosDonut;
