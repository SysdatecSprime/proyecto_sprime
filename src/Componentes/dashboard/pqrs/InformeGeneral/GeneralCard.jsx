import {
  Card,
  DateRangePicker,
  DonutChart,
  Dropdown,
  DropdownItem,
  Flex,
  ProgressBar,
  Text,
} from "@tremor/react";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../Utils/dashboard";

const now = new Date();
const startDay = new Date(now.getFullYear(), now.getMonth(), 1);

export default function GeneralCard() {
  const [value, setValue] = useState([startDay, now]);
  const [url, setUrl] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (value[0] === null || value[1] === null) return;

    const [startDate, endDate] = value;

    if (!startDate || !endDate) return;

    const formatStartDate = formatDate(startDate);
    const formatEndDate = formatDate(endDate);

    const fetchData = async () => {
      if (!startDate || !endDate) {
        setIsLoading(false);
        setData([null, null]);
        return;
      }
      try {
        const response = await fetch(
          "https://sadecv.sysdatec.com/Dashboard/Week/PostDataWeek",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startDate: formatStartDate,
              endDate: formatEndDate,
            }),
          }
        );
        const responseCsv = await fetch(
          "https://sadecv.sysdatec.com/Dashboard/Week/PostDataWeek_xls",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startDate: formatStartDate,
              endDate: formatEndDate,
            }),
          }
        );

        const json = await response.json();
        const jsonCsv = await responseCsv.json();

        const csvData = jsonCsv?.Archivo?.Base64;
        const csvBlob = new Blob([atob(csvData)], { type: "application/vnd.ms-excel" });
        const url = window.URL.createObjectURL(csvBlob);

        setUrl(url);
        let transformedJson = Object.keys(json[0])
          .slice(1)
          .map((key) => {
            let value = json.reduce((acc, curr) => acc + curr[key], 0);
            return { name: key, requerimientos: value };
          });
        setData(transformedJson);
        setError(null);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchData();
  }, [value]);

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <Card className="h-full flex flex-col gap-4">
      <div className="flex gap-4">
        <DateRangePicker
          className="max-w-md mx-auto"
          value={value}
          onValueChange={handleChange}
          maxDate={now}
          enableDropdown={false}
        />

        <Dropdown placeholder="Elige una Dependencia">
          <DropdownItem value="Dependencia1" text="Dependencia1" />
          <DropdownItem value="Dependencia2" text="Dependencia2" />
          <DropdownItem value="Dependencia3" text="Dependencia3" />
        </Dropdown>
      </div>
      <GeneralCardPie data={data} loading={isLoading} error={error} />
      <GeneralProgressBar data={data} loading={isLoading} error={error} />
      {url &&
        value.length > 0 &&
        !isLoading &&
        !error &&
        value[0] &&
        value[1] && (
          <a
            className="text-blue-500 hover:text-blue-600 p-2 transition-all float-right text-right"
            href={url}
            download={`InformeGeneral_${formatDate(value[0])}_${formatDate(
              value[1]
            )}`}
          >
            Descargar CSV{">"}
          </a>
        )}
    </Card>
  );
}

const GeneralCardPie = ({ data, loading, error }) => {
  if (loading) {
    return;
  }

  if (error) {
    return;
  }

  if (data) {
    const dataWithoutTotal = data.slice(1);
    return (
      <DonutChart
        variant="pie"
        index="name"
        category="requerimientos"
        data={dataWithoutTotal}
        valueFormatter={(number) => `${number} Req.`}
        colors={["blue", "purple", "green", "gray"]}
      />
    );
  }
};

const GeneralProgressBar = ({ data, error, loading }) => {
  if (loading) {
    return (
      <Text className="grow flex justify-center items-center">Cargando...</Text>
    );
  }
  if (error) {
    return (
      <Text className="grow flex justify-center items-center">
        No se han encontrado datos para el rango de fechas seleccionado
      </Text>
    );
  }

  if (data && data.length > 0) {
    const total = data[0].requerimientos;
    const activos = data[1].requerimientos;
    const inactivos = data[2].requerimientos;
    const finalizados = data[3].requerimientos;
    const otros = data[4].requerimientos;

    const porcentajeActivos = ((activos / total) * 100).toFixed(2);
    const porcentajeInactivos = ((inactivos / total) * 100).toFixed(2);
    const porcentajeFinalizados = ((finalizados / total) * 100).toFixed(2);
    const porcentajeOtros = ((otros / total) * 100).toFixed(2);

    return (
      <>
        <div className="space-y-2">
          <Flex>
            <Text>Activos</Text>
            <Text>{`${porcentajeActivos}% (${activos})`}</Text>
          </Flex>
          <ProgressBar percentageValue={porcentajeActivos} />
        </div>
        <div className="space-y-2">
          <Flex>
            <Text>Inactivos</Text>
            <Text>{`${porcentajeInactivos}% (${inactivos})`}</Text>
          </Flex>
          <ProgressBar percentageValue={porcentajeInactivos} color="purple" />
        </div>
        <div className="space-y-2">
          <Flex>
            <Text>Finalizados</Text>
            <Text>{`${porcentajeFinalizados}% (${finalizados})`}</Text>
          </Flex>
          <ProgressBar percentageValue={porcentajeFinalizados} color="green" />
        </div>
        <div className="space-y-2">
          <Flex>
            <Text>Otros</Text>
            <Text>{`${porcentajeOtros}% (${otros})`}</Text>
          </Flex>
          <ProgressBar percentageValue={porcentajeOtros} color="gray" />
        </div>
      </>
    );
  }
};
