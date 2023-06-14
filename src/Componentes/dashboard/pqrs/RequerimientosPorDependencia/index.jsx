import {
  AreaChart,
  Card,
  Col,
  Dropdown,
  DropdownItem,
  Grid,
  Title
} from "@tremor/react";
import DonutDependencias from "./DonutDependencias";
import {useCallback, useEffect, useState} from "react";
import {getMonth} from "../../../../Utils/dashboard";
import axios from "axios";
import Select from "react-select";
import "../../pqrs/Dashboard.css";
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
      className="max-w-[350px]"
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

export default function RequerimientosPorDependencia() {
  const [year, setYear] = useState("2023");
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    data: result,
    loading,
    error,
    url,
    retry
  } = useFetchData(4, year, selectedOption);
  const [options, setOptions] = useState([]);

  const handleDownloadExcel = (data) => {
    exportToCsv(data, Object.keys(data[0]), "formato_excel");
  };

  if (typeof error === "string") {
    return (
      <Card className="flex flex-col gap-4 justify-center items-center  my-4">
        <Dropdown
          onValueChange={(value) => {
            setYear(value);
          }}
          value={year}
          placeholder="Tipo de filtrado"
          className="max-w-[150px]"
        >
          <DropdownItem value="2023" text="2023" />
          <DropdownItem value="2022" text="2022" />
          <DropdownItem value="2021" text="2021" />
        </Dropdown>
        <div>
          <span className="block text-lg font-semibold">{error}</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center max-w-xs">
        <div>
          <span className="block text-lg font-semibold">
            Hubo un error al cargar los datos
          </span>
          <button
            className="block rounded bg-slate-600 text-white px-2 py-1"
            onClick={retry}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <Grid numColsLg={3} className="gap-4 my-4">
      <Col numColSpanLg={2}>
        <Card className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Title>Número de requerimientos por Dependencia</Title>
            {!loading && !error && result && url && (
              <a
                className="text-blue-500 hover:text-blue-600 p-2 transition-all"
                style={{textDecoration: "underline", cursor: "pointer"}}
                onClick={() => handleDownloadExcel(result.data)}
              >
                Descargar CSV{">"}
              </a>
            )}
          </div>
          <Col numColSpanLg={2} className="max-w-[150px] xl:max-w-full">
            <Dropdown
              onValueChange={(value) => {
                setYear(value);
              }}
              value={year}
              placeholder="Tipo de filtrado"
              className="max-w-[150px]"
            >
              <DropdownItem value="2023" text="2023" />
              <DropdownItem value="2022" text="2022" />
              <DropdownItem value="2021" text="2021" />
            </Dropdown>
          </Col>
          <Col numColSpanLg={2} className="max-w-[300px]">
            <SelectBox
              url="https://sadecv.sysdatec.com/Configs/Deps/GetDeps"
              valueKey="CodeDepen"
              labelKey="DepenDesc"
              onChange={setSelectedOption}
              isDisabled={true}
            />
          </Col>
          {loading ? (
            <AreaChart
              data={[
                {
                  Cargando: "Cargando"
                }
              ]}
              index="Cargando"
            />
          ) : (
            <AreaChart
              data={result.data}
              index="Month"
              valueFormatter={(number) => `${number} Req.`}
              categories={result.categories}
              yAxisWidth={40}
            />
          )}
        </Card>
      </Col>
      <Col>
        <DonutDependencias year={year} />
      </Col>
    </Grid>
  );
}

const useFetchData = (top = 4, year = 2023, selectedOption) => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      const requestBody = {
        NTop: top,
        Year: year
      };
      if (selectedOption) {
        requestBody.CodeDep = selectedOption.value;
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      };

      const res = await fetch(
        "https://sadecv.sysdatec.com/Dashboard/Dependence/PostDataDependence",
        options
      );
      const resxls = await fetch(
        "https://sadecv.sysdatec.com/Dashboard/Dependence/PostDataDependence_xls",
        options
      );

      const dataDependencias = await res.json();
      const urlDependencias = await resxls.json();

      if (dataDependencias.error) {
        setError(dataDependencias.error);
        setData([]);
        return;
      }

      if (urlDependencias.error) {
        setError(urlDependencias.error);
        setUrl("");
        return;
      }

      const xlsData = urlDependencias.Archivo;
      const xlsBlob = new Blob([atob(xlsData)], {type: "c"});
      const url = window.URL.createObjectURL(xlsBlob);

      setUrl(url);

      const modifiedDataDependencias = dataDependencias
        .map((item) => ({
          Month: getMonth(item.Month),
          [item.DepenDesc]: item.Count
        }))
        .reverse();

      let categories = [];

      const groupedData = modifiedDataDependencias.reduce((acc, cur) => {
        if (acc[cur.Month]) {
          // si el mes ya existe, actualiza los valores existentes
          Object.keys(cur).forEach((key) => {
            if (key !== "Month") {
              acc[cur.Month][key] = acc[cur.Month][key]
                ? acc[cur.Month][key] + cur[key]
                : cur[key];

              if (!categories.includes(key)) {
                categories.push(key);
              }
            }
          });
        } else {
          // si el mes no existe, agrega un objeto con las oficinas y sus valores
          acc[cur.Month] = {};
          Object.keys(cur).forEach((key) => {
            acc[cur.Month][key] = cur[key];

            if (!categories.includes(key) && key !== "Month") {
              categories.push(key);
            }
          });
        }
        return acc;
      }, {});

      const result = Object.keys(groupedData).map((key) => {
        return {
          Month: parseInt(key),
          ...groupedData[key]
        };
      });

      const resultWithZero = result.map((item) => {
        categories.forEach((category) => {
          if (!item[category]) {
            item[category] = 0;
          }
        });

        return item;
      });

      setError(null);
      setData({data: resultWithZero, categories});
    } catch (error) {
      setData([]);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [top, year, selectedOption]);

  useEffect(() => {
    setLoading(true);
    // setTimeout(getData, Math.floor(Math.random() * (2000 - 1000 + 1) + 1000));
    getData();
  }, [top, getData]);

  const retry = () => {
    setLoading(true);
    getData();
  };

  return {data, loading, error, url, retry};
};
