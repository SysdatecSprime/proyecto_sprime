import {
  Card,
  Col,
  Dropdown,
  DropdownItem,
  Grid,
  Subtitle,
  Title,
} from "@tremor/react";
import React, { useEffect, useState } from "react";
import { MONTH, MONTH_CURRENT } from "../../../../Utils/dashboard/constants";
import GeneralBarChart from "./GeneralBarChart";
import GeneralCard from "./GeneralCard";
import { nextMonth } from "../../../../Utils/dashboard";
import useFetchDataMonth from "./hooks/useFetchDataMonth";
import useFetchDataWeek from "./hooks/useFetchDataWeek";
import axios from "axios";
import Select from "react-select";
import "../../pqrs/Dashboard.css";
import html2pdf from "html2pdf.js";

export default function InformeGeneral() {
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState(" ");
  const [isDataMonth, setIsDataMonth] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [url, setUrl] = useState("");
  console.log({ isDataMonth });

  const startDate = month !== " " ? `${year}${month}01` : null;
  const endDate =
    month !== " "
      ? month === "12"
        ? `${year}1231`
        : `${year}${nextMonth(month)}01`
      : null;

  const {
    data: dataWeek,
    isLoading: isLoadingWeek,
    error: errorWeek,
    reload: reloadWeek,
    url: urlWeek,
  } = useFetchDataWeek(startDate, endDate, setIsDataMonth, null);

  const {
    data: dataMonth,
    isLoading: isLoadingMonth,
    error: errorMonth,
    reload: reloadMonth,
    url: urlMonth,
  } = useFetchDataMonth(year, month, setIsDataMonth);

  const selectedData = dataWeek || dataMonth;
  const selectedUrl = urlWeek || urlMonth;

  const selectedReload = month !== " " ? reloadWeek : reloadMonth;

  const monthAccordingToYear = year === "2023" ? MONTH_CURRENT : MONTH;

  const SelectBox = ({ url, valueKey, labelKey, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(url);
          const data = response.data;

          const mappedOptions = data.map((item) => ({
            value: item[valueKey],
            label: item[labelKey],
          }));

          setOptions(mappedOptions);
        } catch (error) {
          console.error("Error fetching options:", error);
        }
      };

      fetchData();
    }, [url, valueKey, labelKey]);

    return (
      <Select
        options={options}
        placeholder="Seleccione una Dependencia"
        value={selectedOption}
        onChange={(option) => {
          setSelectedOption(option);
          onChange(option);
        }}
      />
    );
  };

  const handleExportToPDF = () => {
    if (url) {
      const link = document.createElement("a");
      link.href = url;
      link.download = "formato_excel.xlsx";
      link.click();
    }
  };

  return (
    <Grid numColsLg={7} className="gap-4">
      <Col numColSpanLg={2}>
        <GeneralCard />
      </Col>

      <Col numColSpanLg={5}>
        <Card className="flex flex-col gap-4">
          <div className="py-3">
            <div className="flex justify-between">
              <Title>Informe General</Title>
              {!isLoadingWeek &&
                !isLoadingMonth &&
                !errorMonth &&
                !errorWeek &&
                (dataWeek || dataMonth) && (
                  <a
                    href={selectedUrl}
                    download="formato_excel.xlsx"
                    onClick={handleExportToPDF}
                  >
                    Descargar Formato Excel{">"}
                  </a>
                )}
            </div>
            <Subtitle>
              Informe consolidado de peticiones, quejas, reclamos, sugerencias y
              denuncias
            </Subtitle>
          </div>
          <Grid numColsLg={7} className="w-4/5 gap-2">
            <Col numColSpanLg={2} className="max-w-[150px] xl:max-w-full">
              <Dropdown
                onValueChange={(value) => {
                  setYear(value);
                  setMonth(" ");
                }}
                placeholder="Tipo de filtrado"
                value={year}
              >
                <DropdownItem value="2023" text="2023" />
                <DropdownItem value="2022" text="2022" />
                <DropdownItem value="2021" text="2021" />
              </Dropdown>
            </Col>
            <Col numColSpanLg={2} className="max-w-[150px]">
              <Dropdown
                placeholder="Mes"
                value={month}
                onValueChange={(value) => {
                  setMonth(value);
                }}
              >
                <DropdownItem value=" " text="Todos" />
                {monthAccordingToYear.map((item) => {
                  return (
                    <DropdownItem
                      key={`${item.text}_${item.value}`}
                      value={item.value}
                      text={item.text}
                    />
                  );
                })}
              </Dropdown>
            </Col>
            <Col numColSpanLg={2} className="max-w-[150px] xl:max-w-full">
              <SelectBox
                url="https://sadecv.sysdatec.com/Configs/Deps/GetDeps"
                valueKey="CodeDepen"
                labelKey="DepenDesc"
                onChange={setSelectedOption}
              />
            </Col>
          </Grid>
          <div id="contentToExport">
            {selectedData && (
              <GeneralBarChart
                data={isDataMonth ? dataMonth : dataWeek}
                loading={isLoadingMonth || isLoadingWeek}
                error={isDataMonth ? errorMonth : errorWeek}
                reload={selectedReload}
              />
            )}
          </div>
          <button onClick={handleExportToPDF}>Exportar a PDF</button>
        </Card>
      </Col>
    </Grid>
  );
}
