import React, {useState} from "react";
import {Card, DonutChart, Title, Dropdown, DropdownItem} from "@tremor/react";
import {mailStateChartData} from "./constants";

const MailStateChart = () => {
  const [dependence, setDependence] = useState("0");

  return (
    <Card className="max-w-lg">
      <Title>Estado actual de los correos</Title>
      <Dropdown
        className="mt-2"
        onValueChange={value => setDependence(value)}
        placeholder="Selecciona la dependencia"
      >
        <DropdownItem value="0" text="Todas las dependencias" />
        <DropdownItem value="1" text="Dependencia 1" />
        <DropdownItem value="2" text="Dependencia 2" />
        <DropdownItem value="3" text="Dependencia 3" />
      </Dropdown>
      <DonutChart
        className="mt-6"
        data={mailStateChartData[dependence] || mailStateChartData["0"]}
        category="sales"
        index="name"
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
    </Card>
  );
};

export default MailStateChart;
