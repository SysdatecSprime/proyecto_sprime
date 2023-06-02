import {
  AreaChart,
  Card,
  Col,
  Dropdown,
  DropdownItem,
  Grid,
  Title,
} from "@tremor/react";
import DonutDependencias from "./DonutDependencias";
import { useCallback, useEffect, useState } from "react";
import { getMonth } from "../../../../Utils/dashboard";

export default function RequerimientosPorDependencia() {
  const [year, setYear] = useState("2023");
  const { data: result, loading, error, url, retry } = useFetchData(4, year);

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
                href={url}
                download={`RequerimientosPorDependencia_${year}`}
              >
                Descargar xls{">"}
              </a>
            )}
          </div>
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
          {loading ? (
            <AreaChart
              data={[
                {
                  Cargando: "Cargando",
                },
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

const useFetchData = (top = 4, year = 2023) => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          NTop: top,
          Year: year,
        }),
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

      const xlsData = urlDependencias?.Archivo?.Base64;
      const xlsBlob = new Blob([atob(xlsData)], { type: "c" });
      const url = window.URL.createObjectURL(xlsBlob);

      setUrl(url);

      const modifiedDataDependencias = dataDependencias
        .map((item) => ({
          Month: getMonth(item.Month),
          [item.DepenDesc]: item.Count,
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
          ...groupedData[key],
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
      setData({ data: resultWithZero, categories });
    } catch (error) {
      setData([]);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [top, year]);

  useEffect(() => {
    setLoading(true);
    // setTimeout(getData, Math.floor(Math.random() * (2000 - 1000 + 1) + 1000));
    getData();
  }, [top, getData]);

  const retry = () => {
    setLoading(true);
    getData();
  };

  return { data, loading, error, url, retry };
};
