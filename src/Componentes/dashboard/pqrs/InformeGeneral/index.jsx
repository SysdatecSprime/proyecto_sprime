import {
  Card,
  Col,
  Dropdown,
  DropdownItem,
  Grid,
  Subtitle,
  Title,
} from "@tremor/react";
import { useState } from "react";
import { MONTH, MONTH_CURRENT } from "../../../../Utils/dashboard/constants";
import GeneralBarChart from "./GeneralBarChart";
import GeneralCard from "./GeneralCard";
import { nextMonth } from "../../../../Utils/dashboard";
import useFetchDataMonth from "./hooks/useFetchDataMonth";
import useFetchDataWeek from "./hooks/useFetchDataWeek";

export default function InformeGeneral() {
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState(" ");
  const [isDataMonth, setIsDataMonth] = useState(false);
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
                    className="text-blue-500 hover:text-blue-600 p-2 transition-all"
                    href={selectedUrl}
                    download={
                      urlWeek
                        ? `InformeGeneral_${year}_${month}`
                        : `InformeGeneral_${year}`
                    }
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
          <Grid numColsLg={7} className="w-3/5 gap-2">
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
            <Col numColSpanLg={1} className="max-w-[150px]">
              <Dropdown placeholder="Elige una Dependencia">
                <DropdownItem value="Dependencia1" text="Dependencia1" />
                <DropdownItem value="Dependencia2" text="Dependencia2" />
                <DropdownItem value="Dependencia3" text="Dependencia3" />
              </Dropdown>
            </Col>
          </Grid>
          {selectedData && (
            <GeneralBarChart
              data={isDataMonth ? dataMonth : dataWeek}
              loading={isLoadingMonth || isLoadingWeek}
              error={isDataMonth ? errorMonth : errorWeek}
              reload={selectedReload}
            />
          )}
        </Card>
      </Col>
    </Grid>
  );
}
