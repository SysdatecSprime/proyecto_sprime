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
import axios from "axios";
import Select from "react-select";
import { PDFViewer, Page, View } from "@react-pdf/renderer";

let timerId;

const ChartPDF = ({ data }) => (
  <PDFViewer>
    <Page>
      <View>
        <Text>Gráfico</Text>
        {/* Renderiza aquí tu componente de gráfico (por ejemplo, <GeneralBarChart data={data} />) */}
        {/* <GeneralBarChart data={data} /> */}
      </View>
    </Page>
  </PDFViewer>
);

const SelectBox = ({
  url,
  valueKey,
  labelKey,
  onChange,
  onValueChange,
  onDependenciaChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedDependencia, setSelectedDependencia] = useState(null);

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

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onChange(option);
    onValueChange(option); // Llamar a la función de devolución de llamada con la opción seleccionada
    setSelectedDependencia(option.value); // Establecer la dependencia seleccionada en el nuevo estado
  };

  return (
    <Select
      className="max-w-[450px]"
      options={options}
      placeholder="Dependencia"
      value={selectedOption}
      onChange={handleOptionChange} // Actualizar la función de devolución de llamada
    />
  );
};

const now = new Date();
const startDay = new Date(now.getFullYear(), now.getMonth(), 1);

export default function GeneralCard() {
  const [value, setValue] = useState([startDay, now]);
  const [depen, setDepen] = useState();
  const [url, setUrl] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [showChartPDF, setShowChartPDF] = useState(false);
  const [selectedDependencia, setSelectedDependencia] = useState(null);
  // const [endDate, setEndDate] = useState(now);
  const [startDate, endDate] = value; // Agregar esta línea

  useEffect(() => {
    if (value[0] === null || value[1] === null) return;

    const [startDate, endDate] = value;
    const CodDep = depen;

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
        const requestBody = {
          startDate: formatStartDate,
          endDate: formatEndDate,
        };

        if (selectedDependencia !== null) {
          requestBody.CodDep = selectedDependencia;
        }

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        };

        const request1 = fetch(
          "https://sadecv.sysdatec.com/Dashboard/Week/PostDataWeek",
          requestOptions
        );
        // const request2 = new Promise((resolve) =>
        //   setTimeout(resolve, 1000)
        // ).then(() =>
        //   fetch(
        //     "https://sadecv.sysdatec.com/Dashboard/Week/PostDataWeek_xls",
        //     requestOptions
        //   )
        // );

        // const [response1, response2] = await Promise.all([request1, request2]);
        const [response1] = await Promise.all([request1]);
        const json = await response1.json();
        // const jsonxls = await response2.json();

        // const xlsData = jsonxls.Archivo;

        // const xlsBlob = new Blob([atob(xlsData)], {
        //   type: "application/vnd.ms-excel",
        // });
        // const url = window.URL.createObjectURL(xlsBlob);

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
  }, [value[0], value[1], selectedDependencia]);

  const handleChange = (value) => {
    setValue(value);
    setDepen(null);
  };

  const handleDependenciaChange = async (option) => {
    if (option) {
      setSelectedDependencia(option.value);
    } else {
      setSelectedDependencia(null);
    }

    const formatStartDate = formatDate(startDate);
    const formatEndDate = formatDate(endDate);

    // try {
    //   const requestOptions = {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       startDate: formatStartDate,
    //       endDate: formatEndDate,
    //       CodDep: option.value,
    //     }),
    //   };

    //   const request1 = fetch(
    //     "https://sadecv.sysdatec.com/Dashboard/Week/PostDataWeek",
    //     requestOptions
    //   );
    //   // const request2 = new Promise((resolve) =>
    //   //   setTimeout(resolve, 1000)
    //   // ).then(() =>
    //   //   fetch(
    //   //     "https://sadecv.sysdatec.com/Dashboard/Week/PostDataWeek_xls",
    //   //     requestOptions
    //   //   )
    //   // );

    //   // const [response1, response2] = await Promise.all([request1, request2]);
    //   const [response1] = await Promise.all([request1]);
    //   const json = await response1.json();
    //   // const jsonxls = await response2.json();

    //   // const xlsData = jsonxls.Archivo;

    //   // const xlsBlob = new Blob([atob(xlsData)], {
    //   //   type: "application/vnd.ms-excel",
    //   // });
    //   // const url = window.URL.createObjectURL(xlsBlob);

    //   setUrl(url);
    //   let transformedJson = Object.keys(json[0])
    //     .slice(1)
    //     .map((key) => {
    //       let value = json.reduce((acc, curr) => acc + curr[key], 0);
    //       return { name: key, requerimientos: value };
    //     });
    //   setData(transformedJson);
    //   setError(null);
    // } catch (error) {
    //   setError(error);
    // }

    setIsLoading(false);
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

        <SelectBox
          url="https://sadecv.sysdatec.com/Configs/Deps/GetDeps"
          valueKey="CodeDepen"
          labelKey="DepenDesc"
          onChange={setSelectedOption}
          onValueChange={handleDependenciaChange}
          onDependenciaChange={handleDependenciaChange} // Agregar la función de devolución de llamada
          isDisabled={true}
        />
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
            Descargar Formato Excel{">"}
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
