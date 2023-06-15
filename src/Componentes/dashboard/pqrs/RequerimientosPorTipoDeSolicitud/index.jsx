import {
  BarChart,
  Card,
  Grid,
  Title,
  Col,
  Dropdown,
  DropdownItem
} from "@tremor/react";
import {useCallback, useEffect, useState} from "react";
import {MONTH, MONTH_CURRENT} from "../../../../Utils/dashboard/constants";
import LoadingChart from "./LoadingChart";
import Select from "react-select";
import axios from "axios";
import {exportToCsv} from "../../../../Utils/download/downloadExcel";

const SelectBox = ({url, valueKey, labelKey, onChange}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        const mappedOptions = data.map((item) => ({
          value: item[valueKey],
          label: item[labelKey]
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
      placeholder="Seleccione un Tipo de Solicitud"
      value={selectedOption}
      onChange={(option) => {
        setSelectedOption(option);
        onChange(option);
      }}
    />
  );
};

export default function RequerimientosPorTipoDeSolicitud() {
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState(" ");
  const [selectedOption, setSelectedOption] = useState(null);
  const {data, loading, error, url} = useFetchData(
    8,
    year,
    month,
    selectedOption
  );

  const monthAccordingToYear = year === "2023" ? MONTH_CURRENT : MONTH;

  const handleDownloadExcel = (data) => {
    exportToCsv(data, Object.keys(data[0]), "formato_excel");
  };

  if (typeof error === "string") {
    return (
      <div className="flex flex-col gap-4 justify-center items-center max-w-xs">
        <div>
          <span className="block text-lg font-semibold">{error}</span>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="flex flex-col gap-4 justify-center items-center max-w-xs">
  //       <div>
  //         <span className="block text-lg font-semibold">
  //           Hubo un error al cargar los datos
  //         </span>
  //         <button
  //           className="block rounded bg-slate-600 text-white px-2 py-1"
  //           onClick={retry}
  //         >
  //           Reintentar
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <Card className="flex flex-col gap-4 justify-center items-center  my-4">
        <Grid numColsLg={2} className="w-2/5 gap-2">
          <Col>
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
          <Col>
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
        </Grid>
        <div>
          <span className="block text-lg font-semibold">
            No hay Radicados que coincidan con el criterio de busqueda.
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between">
        <Title>Requerimientos recibidos por tipo de solicitud</Title>
        {!loading && !error && data && url && (
          <a
            className="text-blue-500 hover:text-blue-600 p-2 transition-all"
            style={{textDecoration: "underline", cursor: "pointer"}}
            onClick={() => handleDownloadExcel(data)}
          >
            Descargar CSV{">"}
          </a>
        )}
      </div>
      <Grid numColsLg={2} className="w-2/5 gap-2">
        <Col>
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
        <Col>
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
        <Col>
          <SelectBox
            url="https://sadecv.sysdatec.com/SPRIMESERVICES/WsWf/api/WF_MailClass"
            valueKey="idMailClass"
            labelKey="mailDesc"
            onChange={setSelectedOption}
          />
        </Col>
      </Grid>
      {loading ? (
        <LoadingChart />
      ) : (
        <BarChart
          data={data}
          index="MailDesc"
          categories={["Requerimientos"]}
        />
      )}
    </Card>
  );
}

const useFetchData = (top = 4, year = 2023, month = 0, selectedOption) => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      const requestBody = {
        NTop: top,
        Year: year,
        Month: month === " " ? 0 : month
      };
      if (selectedOption) {
        requestBody.MailClass = selectedOption.value;
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      };
      const res = await fetch(
        "https://sadecv.sysdatec.com/Dashboard/Class/PostDataClass",
        options
      );
      const resxls = await fetch(
        "https://sadecv.sysdatec.com/Dashboard/Class/PostDataClass_xls",
        options
      );

      const urlTipoSolicitud = await resxls.json();
      if (urlTipoSolicitud.error) {
        setError(urlTipoSolicitud.error);
        setUrl(null);
        return;
      }

      const xlsData = urlTipoSolicitud.Archivo;
      const xlsBlob = new Blob([atob(xlsData)], {
        type: "application/vnd.ms-excel"
      });
      const url = window.URL.createObjectURL(xlsBlob);

      setUrl(url);

      const dataDependencias = await res.json();
      if (dataDependencias.error) {
        setError(dataDependencias.error);
        setData([]);
        return;
      }
      setData(
        dataDependencias.map((item) => ({
          ...item,
          Requerimientos: item.Count
        }))
      );
      setError(null);
    } catch (error) {
      setData([]);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [top, year, month, selectedOption]);

  useEffect(() => {
    setLoading(true);
    getData();
  }, [top, getData]);

  const retry = () => {
    setLoading(true);
    getData();
  };

  return {data, loading, error, url, retry};
};
