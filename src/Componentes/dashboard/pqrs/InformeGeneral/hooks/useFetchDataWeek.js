import { useState, useEffect, useCallback } from "react";

const transformData = (data) =>
  data?.map((item) => {
    const name = `Semana ${item.Semana}`;
    return {
      name: name,
      Activos: item.Activo,
      Inactivos: item.Inactivo,
      Finalizados: item.Finalizado,
      Otros: item.Otros,
    };
  });

const useFetchDataWeek = (
  startDate,
  endDate,
  setIsDataMonth,
  initialValue = [],
  selectedOption
) => {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!startDate || !endDate) {
      setIsLoading(false);
      setData(initialValue);
      return;
    }
    try {
      const requestBody = {
        startDate,
        endDate,
      };
      if(selectedOption){
        requestBody.CodeDep = selectedOption.value;
      }
      const response = await fetch(
        "https://sadecv.sysdatec.com/Dashboard/Week/PostDataWeek",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const json = await response.json();
      if (json.error) {
        setError(json.error);
        setData(initialValue);
        return;
      }
      setData(transformData(json));
      setError(null);
    } catch (error) {
      setError(404);
      setData(initialValue);
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate, initialValue, selectedOption]);

  const getUrl = useCallback(async () => {
    if (!startDate || !endDate) {
      setIsLoading(false);
      setData(initialValue);
      return;
    }
    try {
      const response = await fetch(
        "https://sadecv.sysdatec.com/Dashboard/Week/PostDataWeek_xls",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate,
            endDate,
          }),
        }
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setUrl("");
        return;
      }

      const csvData = data?.Archivo?.Base64;

      const csvBlob = new Blob([atob(csvData)], { type: "application/vnd.ms-excel" });
      const url = window.URL.createObjectURL(csvBlob);

      setUrl(url);
      setError(null);
    } catch (error) {
      setError(error);
      setUrl("");
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate, initialValue]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(true);
    setTimeout(getUrl, 3000);
    setIsDataMonth(false);
  }, [startDate, endDate, initialValue, fetchData, getUrl]);

  const reload = () => {
    setIsLoading(true);
    fetchData();
    setIsLoading(true);
    setTimeout(getUrl, 3000);
  };

  return { data, error, isLoading, url, reload };
};

export default useFetchDataWeek;
