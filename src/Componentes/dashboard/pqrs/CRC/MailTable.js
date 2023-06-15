import React, {useState, useEffect} from "react";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge
} from "@tremor/react";
import {mailTableData} from "./constants";

const MailTable = () => {
  const [mailTableData, setMailTableData] = useState([]);

  useEffect(() => {
    getMailTableData();
  }, []);

  const getMailTableData = async () => {
    const dataProm = await fetch("http://localhost:3001/api/mail", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await dataProm.json();
    console.log(data);
    setMailTableData(data);
  };

  return (
    <Card>
      <Title>Correos por Usuarios</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Para</TableHeaderCell>
            <TableHeaderCell>De</TableHeaderCell>
            <TableHeaderCell>Dependencia</TableHeaderCell>
            <TableHeaderCell>Estado</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mailTableData.map((item, index) =>
            <TableRow key={index}>
              <TableCell>
                {item.receptor}
              </TableCell>
              <TableCell>
                <Text>
                  {item.emisor}
                </Text>
              </TableCell>
              <TableCell>
                <Text>
                  {item.dependencia}
                </Text>
              </TableCell>
              <TableCell>
                <Badge
                  color={
                    item.status === "Respondido"
                      ? "emerald"
                      : item.status === "Entregado" ? "indigo" : "rose"
                  }
                >
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MailTable;
