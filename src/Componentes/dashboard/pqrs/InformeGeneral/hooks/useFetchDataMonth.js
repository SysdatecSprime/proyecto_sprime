import { useState, useEffect, useCallback } from "react";
import { getMonth } from "../../../../../Utils/dashboard";

const transformData = (data) =>
  data?.map((item) => {
    const name = getMonth(item.Month);
    return {
      name: name,
      Activos: item.ActiveCount,
      Inactivos: item.InactiveCount,
      Finalizados: item.FinishedCount,
      Otros: item.OtherCount,
    };
  });

const downloadFile = (base64Data, fileName) => {
  const link = document.createElement("a");
  link.href = `data:application/vnd.ms-excel;base64,${base64Data}`;
  link.download = fileName;
  link.click();
};

const useFetchDataMonth = (year, month, setIsDataMonth, initialValue = [], selectedOption) => {
  const [data, setData] = useState(initialValue);
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const requestBody = {
        year,
      };
      if (selectedOption) {
        requestBody.CodeDep = selectedOption.value;
      }
      const response = await fetch(
        "https://sadecv.sysdatec.com/Dashboard/Month/PostDataMonth",
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
      setError(error);
      setData(initialValue);
    } finally {
      setIsLoading(false);
    }
  }, [year, selectedOption]);

  const getUrl = useCallback(async () => {
    try {
      const response = await fetch(
        "https://sadecv.sysdatec.com/Dashboard/Month/PostDataMonth_xls",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            year,
          }),
        }
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      const xlsData = data.Archivo;
      //downloadFile(xlsData, "archivo_excel.xlsx");

      setError(null);
    } catch (error) {
      setError(error);
      setUrl("");
    } finally {
      setIsLoading(false);
    }
  }, [data.Archivo]);

  //     const xlsBlob = new Blob([atob(xlsData)], {
  //       type: "application/vnd.ms-excel",
  //     });
  //     const url = window.URL.createObjectURL(xlsBlob);

  //     setUrl(url);
  //     setError(null);
  //   } catch (error) {
  //     setError(error);
  //     setUrl("");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [year]);

  useEffect(() => {
    //console.log({ month });
    if (month !== " ") {
      return;
    }
    setIsLoading(true);
    fetchData();
    setIsLoading(true);
    setIsDataMonth(true);
    setTimeout(getUrl, 2000);
  }, [year, month, fetchData, getUrl]);

  const reload = () => {
    setIsLoading(true);
    fetchData();
    setIsLoading(true);
    setTimeout(getUrl, 2000);
  };

  return { data, error, isLoading, url, reload };
};

export default useFetchDataMonth;
