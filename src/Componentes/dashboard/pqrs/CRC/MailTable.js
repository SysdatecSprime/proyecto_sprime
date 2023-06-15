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
  Badge,
  DateRangePicker,
  DonutChart,
  Dropdown,
  DropdownItem
} from "@tremor/react";
import {mailTableData} from "./constants";
import {formatDate} from "../../../../Utils/dashboard";
import {set} from "react-hook-form";
import { exportToCsv } from "../../../../Utils/download/downloadExcel";

const now = new Date();
const startDay = new Date(now.getFullYear(), now.getMonth(), 1);

const MailTable = () => {
  const [mailTableData, setMailTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState([startDay, now]);
  const [pieChartData, setPieChartData] = useState({});
  const [stateFilter , setStateFilter] = useState("0");

  const headers = [
    "Nombre",
    "Id",
    "Cantidad de registros",
    "Radicados finalizados",
    "Radicados en trámite",
    "Radicados inactivos",
    "Radicados rechazados",
    "Radicados regresados",
    "Radicados efectuados",
    "Registros vencidos",
    "Registros notificados",
    "Registros con anexos",
    "Registros sin anexos"
  ];

  useEffect(
    () => {
      getMailTableData();
    },
    [value[0], value[1]]
  );

  const handleChange = value => {
    setValue(value);
  };

  const getMailTableData = async () => {
    setLoading(true);
    if (value[0] === null || value[1] === null) return;
    const [startDate, endDate] = value;
    if (!startDate || !endDate) return;
    const formatStartDate = formatDate(startDate);
    const formatEndDate = formatDate(endDate);

    const dataProm = await fetch(
      "https://sadecv.sysdatec.com/Dashboard/FindByUsers/PostByUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          startDate: formatStartDate,
          endDate: formatEndDate
        })
      }
    );
    const data = await dataProm.json();
    setMailTableData(data);
    generatePieChartData(data);
    setLoading(false);
  };

  const generatePieChartData = data => {
    let attachmentData = [{nombre:"Con anexos", cantidad:data.reduce((partialSum, element) => partialSum + element.RegistrosConAnexos, 0)}, 
    {nombre:"Sin anexos", cantidad:data.reduce((partialSum, element) => partialSum + element.RegistrosSinAnexos, 0)}];
    let stateData = [];
    for(let i=0; i<headers.length;i++){
      if(i!==12&& i!==11 && i!==1 && i!==2 && i!==0){
        stateData.push({nombre:headers[i], cantidad:data.reduce((partialSum, element) => partialSum + element[Object.keys(element)[i]], 0)})
      }
    }
    setPieChartData({"0":stateData, "1":attachmentData});
  }

  const handleDownloadExcel = (data) => {
    exportToCsv(data, Object.keys(data[0]), "formato_excel");
  };

  return (
    <>
    {pieChartData && !loading && <Card className="max-w">
     
      <Title>Estado actual de los correos</Title>
      <div className="flex gap-4">
      <a
          className="text-blue-500 hover:text-blue-600 p-2 transition-all float-right text-right"
          style={{textDecoration: "underline", cursor: "pointer", width:"100%"}}
          onClick={() => handleDownloadExcel(pieChartData[stateFilter] || pieChartData["0"])}
        >
          Descargar Formato CSV{">"}
        </a>
      </div>
      
      <Dropdown
        className="mt-2"
        onValueChange={(value) => setStateFilter(value)}
        placeholder="Selecciona el estado"
      >
        <DropdownItem value="0" text="Todas los estados" />
        <DropdownItem value="1" text="Anexos" />
      </Dropdown>
      
      <DonutChart
        className="mt-12"
        data={pieChartData[stateFilter] || pieChartData["0"]}
        category="cantidad"
        index="nombre"
        //colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
      
    </Card>}
    <Card style={{marginTop:"20px"}}>
      <Title>Correos por Usuarios</Title>
      <div className="flex gap-4">
        <DateRangePicker
          style={{
            width: "50%"
          }}
          value={value}
          onValueChange={handleChange}
          maxDate={now}
          enableDropdown={false}
        />
        <a
          className="text-blue-500 hover:text-blue-600 p-2 transition-all float-right text-right"
          style={{textDecoration: "underline", cursor: "pointer"}}
          onClick={() => handleDownloadExcel(mailTableData)}
        >
          Descargar Formato CSV{">"}
        </a>
      </div>
      {loading
        ? <div
            className="flex justify-center items-center h-100"
            style={{marginTop: "20px"}}
          >
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        : <Table className="mt-5">
            <TableHead>
              <TableRow>
                {headers.map((label, index) => {
                  return (
                    <TableHeaderCell key={index}>
                      {label}
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {mailTableData.map((item, index) =>
                <TableRow key={index}>
                  {Object.values(item).map((value, index) => {
                    return (
                      <TableCell key={index}>
                        {value}
                      </TableCell>
                    );
                  })}

                  {/* <TableCell>
                    <Badge
                      color={
                        item.status === "Respondido"
                          ? "emerald"
                          : item.status === "Entregado" ? "indigo" : "rose"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell> */}
                </TableRow>
              )}
            </TableBody>
          </Table>}
    </Card></>
  );
};

export default MailTable;
