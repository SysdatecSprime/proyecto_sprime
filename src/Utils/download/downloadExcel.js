const downloadFile = ({data, fileName, fileType}) => {
  const blob = new Blob([data], {type: fileType});

  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

export const exportToCsv = (data, headers, filename) => {
  // Convert  data to a csv
  const joinedHeaders = [headers.join(",")];
  let csv = data.reduce((acc, e) => {
    /* const { id, name, surname, age } = user
      acc.push([id, name, surname, age].join(','))
      return acc */

    const values = Object.values(e);
    acc.push(values.join(","));
    return acc;
  }, []);

  downloadFile({
    data: [...joinedHeaders, ...csv].join("\n"),
    fileName: `${filename}.csv`,
    fileType: "text/csv"
  });
};
