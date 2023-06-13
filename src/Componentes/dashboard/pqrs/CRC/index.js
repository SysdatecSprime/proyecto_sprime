import React from "react";
import MailStateChart from "./MailStateChart";
import MailTable from "./MailTable";
import "../../pqrs/Dashboard.css";
import {
  BarChart,
  Card,
  Grid,
  Title,
  Col,
  Dropdown,
  DropdownItem,
} from "@tremor/react";

export default function CRC() {
  return (
    <div className="flex flex-col gap-4   my-4">
      <Grid numCols={5} className="gap-4">
        <Col numColSpan={4}>
          <MailTable />
        </Col>
        <Col>
          <MailStateChart />
        </Col>
      </Grid>
    </div>
  );
}
