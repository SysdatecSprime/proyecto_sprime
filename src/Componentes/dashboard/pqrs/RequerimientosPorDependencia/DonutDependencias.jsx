import { Card, Col, DonutChart, Grid, Legend } from "@tremor/react";
import { useCallback, useEffect, useState } from "react";

export default function DonutDependencias({ year = 2023 }) {
  const {
    data: dataDependencias,
    loading,
    error,
    retry,
  } = useFetchData(4, year);

  const categories = dataDependencias?.map((item) => item.DepenDesc);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (typeof error === "string") {
    return (
      <div className="flex flex-col gap-4 justify-center items-center max-w-xs mx-auto h-full">
        <span className="block text-lg font-semibold">{error}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center max-w-xs mx-auto h-full">
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
    );
  }
  return (
    <Card className="flex items-center h-full">
      <Grid numCols={2}>
        <Col>
          <DonutChart
            data={dataDependencias}
            index="DepenDesc"
            category="Count"
          />
        </Col>
        <Col>
          <div className="flex items-center justify-center h-100">
            <Legend className="flex gap-2" categories={categories} />
          </div>
        </Col>
      </Grid>
    </Card>
  );
}

const useFetchData = (top = 4, year = 2023) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      const res = await fetch(
        "https://sadecv.sysdatec.com/Dashboard/Dependence/PostDataDependence",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            NTop: top,
            Year: year,
          }),
        }
      );
      const dataDependencias = await res.json();
      if (dataDependencias.error) {
        setError(dataDependencias.error);
        setData([]);
        return;
      }
      const reducedData = Object.values(
        dataDependencias.reduce((acc, curr) => {
          if (!acc[curr.DepenDesc]) {
            acc[curr.DepenDesc] = {
              DepenDesc: curr.DepenDesc,
              Count: 0,
            };
          }
          acc[curr.DepenDesc].Count += curr.Count;
          return acc;
        }, {})
      );

      setError(null);
      setData(reducedData);
    } catch (error) {
      setData([]);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [top, year]);

  useEffect(() => {
    setLoading(true);
    setTimeout(getData, Math.floor(Math.random() * (2000 - 1000 + 1) + 1000));
  }, [top, getData]);

  const retry = () => {
    setLoading(true);
    getData();
  };

  return { data, loading, error, retry };
};
