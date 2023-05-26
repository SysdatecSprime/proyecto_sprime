import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";

// Tabla de correos represados
// TODO: Utilizar los filtros de react data grid
// URL: https://github.com/adazzle/react-data-grid/blob/main/README.md

export default function Tabla({ columns, rows }) {
  return (
    <div className="w-full mx-auto sm:max-w-[640px] md:max-w-[768px] lg:max-w-[918px] xl:max-w-[1174px] 2xl:max-w-[1380px] overflow-auto bg-blue-400">
      <DataGrid columns={columns} rows={rows} className="min-h-[400px] h-auto max-h-[60vh]" />
    </div>
  );
}
