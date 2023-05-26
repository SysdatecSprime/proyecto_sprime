import { Col, Grid } from "@tremor/react";
import { useState } from "react";
import CardTiempo from "./CardTiempo";
import HistorialDeTiempo from "./HistorialDeTiempo";
import { valoresAleatorios } from "../../../../Utils/dashboard/constants";

export default function TiempoPorTipoDeSolicitud() {
  const [datoSeleccionado, setDatoSeleccionado] = useState(
    "Petición de interés general y particular"
  );

  const categories =
    datoSeleccionado === "Petición de interés general y particular"
      ? ["Petición de interés general", "Petición de interés particular"]
      : datoSeleccionado === "Petición de documentos e información pública"
      ? ["Petición de documentos", "Petición de información pública"]
      : [datoSeleccionado];

  const valorDeCategoria1 = valoresAleatorios.slice(-1)[0][categories[0]];
  const valorDeCategoria2 = valoresAleatorios.slice(-1)[0][categories[1]];

  const valorDeCategoria1Anterior =
    valoresAleatorios.slice(-2)[0][categories[0]];
  const valorDeCategoria2Anterior =
    valoresAleatorios.slice(-2)[0][categories[1]];

  const porcentajeDeCambio1 = -(
    ((valorDeCategoria1 - valorDeCategoria1Anterior) /
      valorDeCategoria1Anterior) *
    100
  ).toFixed(2);

  const porcentajeDeCambio2 = -(
    ((valorDeCategoria2 - valorDeCategoria2Anterior) /
      valorDeCategoria2Anterior) *
    100
  ).toFixed(2);

  const valorMaximo = 10;
  const valorMinimo = 1;

  const porcentajeDeAvanceValorDeCategoria1 = Math.round(
    (1 - (valorDeCategoria1 - valorMinimo) / (valorMaximo - valorMinimo)) * 100
  );

  const porcentajeDeAvanceValorDeCategoria2 = Math.round(
    (1 - (valorDeCategoria2 - valorMinimo) / (valorMaximo - valorMinimo)) * 100
  );

  return (
    <Grid numColsLg={5} className="gap-4 my-4">
      <Col numColSpanLg={4}>
        <HistorialDeTiempo
          categories={categories}
          valoresAleatorios={valoresAleatorios}
          datoSeleccionado={datoSeleccionado}
          setDatoSeleccionado={setDatoSeleccionado}
        />
      </Col>
      <div className="flex flex-col gap-8">
        <CardTiempo
          valor={valorDeCategoria1}
          porcentajeDeCambio={porcentajeDeCambio1}
          porcentajeDeAvance={porcentajeDeAvanceValorDeCategoria1}
          titulo={categories[0]}
        />
        {categories.length === 2 && (
          <CardTiempo
            valor={valorDeCategoria2}
            porcentajeDeCambio={porcentajeDeCambio2}
            porcentajeDeAvance={porcentajeDeAvanceValorDeCategoria2}
            titulo={categories[1]}
            color="violet"
          />
        )}
      </div>
    </Grid>
  );
}
