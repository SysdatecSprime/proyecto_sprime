import { Grid, Col, Button } from "@tremor/react";
import { useState, useEffect } from "react";
import { PlusIcon, ClockIcon, CogIcon } from "@heroicons/react/outline";

function SelectView({
  consultaRadicado,
  setTipoCorrespondencia,
  setCrearNuevo,
}) {
  return (
    <Grid numColsLg={1} className="gap-6">
      {/* Main section */}
      <Col numColSpanLg={1} className="gap-5">
        <Button
          className="botonTremor"
          size="md"
          icon={PlusIcon}
          onClick={() => {
            setCrearNuevo(true);
          }}>
          Crear Nueva
        </Button>
        <Button
          className="botonTremor"
          size="md"
          variant="secondary"
          icon={ClockIcon}
          onClick={() => {
            consultaRadicado(1);
            setTipoCorrespondencia(1);
            setCrearNuevo(false);
          }}>
          Correspondencia Recibida
        </Button>
        <Button
          className="botonTremor"
          size="md"
          variant="secondary"
          icon={ClockIcon}
          onClick={() => {
            consultaRadicado(2);
            setTipoCorrespondencia(2);
          }}>
          Correspondencia Enviada
        </Button>
        <Button
          className="botonTremor"
          size="md"
          variant="secondary"
          icon={CogIcon}
          onClick={() => {
            consultaRadicado(3);
            setTipoCorrespondencia(3);
          }}>
          Correspondencia Interna
        </Button>
        <Button
          className="botonTremor"
          size="md"
          variant="secondary"
          icon={CogIcon}
          onClick={() => console.log("clicked")}>
          Expedientes
        </Button>
        <Button
          className="botonTremor"
          size="md"
          variant="secondary"
          icon={CogIcon}
          onClick={() => console.log("clicked")}>
          Documentos
        </Button>
      </Col>
    </Grid>
  );
}

export default SelectView;
