import { InformationCircleIcon } from "@heroicons/react/outline";
import {
  Card,
  Dropdown,
  DropdownItem,
  Flex,
  Icon,
  LineChart,
  Title,
  Toggle,
  ToggleItem,
} from "@tremor/react";

export default function HistorialDeTiempo({
  datoSeleccionado,
  setDatoSeleccionado,
  valoresAleatorios,
  categories,
}) {
  
  return (
    <Card>
      <Flex
        justifyContent="start"
        className="space-x-0.5 mb-2"
        alignItems="center"
      >
        <Title>Tiempo promedio de respuesta por tipo de solicitud</Title>
        <Icon
          icon={InformationCircleIcon}
          variant="simple"
          tooltip="Muestra el cambio en el tiempo promedio de respuesta por tipo de solicitud."
        />
      </Flex>
      <Toggle
        color="zinc"
        className="mb-2 flex-wrap inline-flex lg:flex-nowrap"
        defaultValue={datoSeleccionado}
        onValueChange={(value) => setDatoSeleccionado(value)}
      >
        <ToggleItem
          value="Petición de interés general y particular"
          text="Petición de interés general y particular"
        />
        <ToggleItem
          value="Petición de documentos e información pública"
          text="Petición de documentos e información pública"
        />
        <ToggleItem value="Consulta" text="Consulta" />
        <ToggleItem value="Reclamo" text="Reclamo" />
        <ToggleItem value="Sugerencia" text="Sugerencia" />
        <ToggleItem value="Denuncia" text="Denuncia" />
      </Toggle>
      <Dropdown
        // onValueChange={(value) => {
        //   setYear(value);
        //   setMonth(" ");
        // }}
        placeholder="Tipo de filtrado"
        className="max-w-[150px]"
      >
        <DropdownItem value="2023" text="2023" />
        <DropdownItem value="2022" text="2022" />
        <DropdownItem value="2021" text="2021" />
      </Dropdown>
      <LineChart
        data={valoresAleatorios}
        index="name"
        categories={categories}
        valueFormatter={(number) => `${number} días`}
        yAxisWidth={40}
        colors={["blue", "violet"]}
      />
    </Card>
  );
}
