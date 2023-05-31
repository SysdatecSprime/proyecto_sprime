import { useState } from "react";
import { Button, Title } from "@tremor/react";
import { DropDownElement } from "../Correos/DropDownElement";
import { TextInputElement } from "../Correos/TextInputElement";
import { DateElement } from "../Correos/DateElement";
import { Tabla } from "../Correos/Tabla";
const Reportes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columnas = [
    {
      key: "nroRadicadoEnviado",
      name: "Numero de Radicado Enviado",
    },
    {
      key: "nroComunicacion",
      name: "Numero de Comunicación",
    },
    {
      key: "consecutivoAnual",
      name: "Consecutivo Anual",
    },
    {
      key: "empresa",
      name: "Empresa",
    },
    {
      key: "tipoNegocio",
      name: "Tipo de Negocio",
    },
    {
      key: "dependenciaRemitente",
      name: "Dependencia Remitente",
    },
    {
      key: "tipificacion",
      name: "Tipificación",
    },
    {
      key: "grupo",
      name: "Grupo",
    },
    {
      key: "claseCorrespondencia",
      name: "Clase de Correspondencia",
    },
    {
      key: "destinatario",
      name: "Destinatario",
    },
    {
      key: "numeroDocumento",
      name: "Numero de Documento",
    },
    {
      key: "ciudadDestino",
      name: "Ciudad Destino",
    },
    {
      key: "direccionDestino",
      name: "Dirección Destino",
    },
    {
      key: "medioDeEnvio",
      name: "Medio de Envío",
    },
    {
      key: "tipoDeEnvio",
      name: "Tipo de Envío",
    },
    {
      key: "prioridad",
      name: "Prioridad",
    },
    {
      key: "radicadoPor",
      name: "Radicado Por",
    },
    {
      key: "respuestaA",
      name: "Respuesta A",
    },
    {
      key: "digitalizado",
      name: "Digitalizado",
    },
    {
      key: "remitente",
      name: "Remitente",
    },
    {
      key: "asunto",
      name: "Asunto",
    },
    {
      key: "numeroFolios",
      name: "Numero de Folios",
    },
    {
      key: "año",
      name: "Año",
    },
    {
      key: "nroGuia",
      name: "Numero de Guía",
    },
    {
      key: "observaciones",
      name: "Observaciones",
    },
    {
      key: "trazabilidad",
      name: "Trazabilidad",
    },
    {
      key: "fechaRadicado",
      name: "Fecha de Radicado",
    },
    {
      key: "fechaDigitalizacion",
      name: "Fecha de Digitalización",
    },
    {
      key: "fechaTrazabilidad",
      name: "Fecha de Trazabilidad",
    },
    {
      key: "fechaRemision",
      name: "Fecha de Remisión",
    },
    {
      key: "fechaEntrega",
      name: "Fecha de Entrega",
    },
  ];

  return (
    <section className="px-4 min-h-screen">
      <div className="p-4 pl-0">
        <Title>Correos Represados</Title>
      </div>
      <form className="flex flex-wrap justify-evenly gap-y-2 gap-x-4 ">
        <TextInputElement
          title="Numero de Radicado Enviado"
          placeholder="Numero de Radicado Enviado"
        />
        <TextInputElement
          title="Numero de Comunicación"
          placeholder="Numero de Comunicación"
        />
        <TextInputElement
          title="Consecutivo Anual"
          placeholder="Consecutivo Anual"
        />
        <DropDownElement
          title="Empresa"
          placeholder="Empresa"
          options={["Empresa 1", "Empresa 2", "Empresa 3"]}
        />
        <DropDownElement
          title="Tipo de Negocio"
          placeholder="Tipo de Negocio"
          options={["Tipo 1", "Tipo 2", "Tipo 3"]}
        />
        <DropDownElement
          title="Dependencia Remitente"
          placeholder="Dependencia Remitente"
          options={["Dependencia 1", "Dependencia 2", "Dependencia 3"]}
        />
        <DropDownElement
          title="Tipificación"
          placeholder="Tipificación"
          options={["Tipificación 1", "Tipificación 2", "Tipificación 3"]}
        />
        <DropDownElement
          title="Grupo"
          placeholder="Grupo"
          options={["Grupo 1", "Grupo 2", "Grupo 3"]}
        />
        <DropDownElement
          title="Clase de Correspondencia"
          placeholder="Clase de Correspondencia"
          options={["Clase 1", "Clase 2", "Clase 3"]}
        />
        <TextInputElement title="Destinatario" placeholder="Destinatario" />
        <TextInputElement
          title="Numero de Documento"
          placeholder="Numero de Documento"
        />
        <TextInputElement
          title="Ciudad Destino"
          placeholder="Ciudad Destino"
          options={["Ciudad 1", "Ciudad 2", "Ciudad 3"]}
        />
        <TextInputElement
          title="Dirección Destino"
          placeholder="Dirección Destino"
        />
        <DropDownElement
          title="Medio de Envío"
          placeholder="Medio de Envío"
          options={["Medio 1", "Medio 2", "Medio 3"]}
        />
        <DropDownElement
          title="Tipo de Envío"
          placeholder="Tipo de Envío"
          options={["Tipo 1", "Tipo 2", "Tipo 3"]}
        />
        <DropDownElement
          title="Prioridad"
          placeholder="Prioridad"
          options={["Prioridad 1", "Prioridad 2", "Prioridad 3"]}
        />
        <DropDownElement
          title="Radicado Por"
          placeholder="Radicado Por"
          options={["Radicado 1", "Radicado 2", "Radicado 3"]}
        />
        <DropDownElement
          title="Respuesta A"
          placeholder="Respuesta A"
          options={["Respuesta 1", "Respuesta 2", "Respuesta 3"]}
        />
        <DropDownElement
          title="Digitalizado"
          placeholder="Digitalizado"
          options={["Si", "No"]}
        />
        <DropDownElement
          title={"Remitente"}
          placeholder={"Remitente"}
          options={["Remitente 1", "Remitente 2", "Remitente 3"]}
        />
        <TextInputElement title="Asunto" placeholder="Asunto" />
        <TextInputElement
          title="Numero de Folios"
          placeholder="Numero de Folios"
        />
        <TextInputElement title="Año" placeholder="Año" />
        <TextInputElement title="Numero de Guía" placeholder="Numero de Guía" />
        <TextInputElement title="Observaciones" placeholder="Observaciones" />
        <DropDownElement
          title="Trazabilidad"
          placeholder="Trazabilidad"
          options={["Trazabilidad 1", "Trazabilidad 2", "Trazabilidad 3"]}
        />
        <DateElement
          title="Fecha de Radicado"
          placeholder="Fecha de Radicado"
        />
        <DateElement
          title="Fecha de Digitalización"
          placeholder="Fecha de Digitalización"
        />
        <DateElement
          title="Fecha de Trazabilidad"
          placeholder="Fecha de Trazabilidad"
        />
        <DateElement
          title="Fecha de Remisión"
          placeholder="Fecha de Remisión"
        />
        <DateElement title="Fecha de Entrega" placeholder="Fecha de Entrega" />
        <div className="w-full py-4">
          <Button type="submit" variant="primary" className="float-right w-40">
            Buscar
          </Button>
        </div>
      </form>
      {loading ? (
        <div className="flex justify-center items-center h-100">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <small>
            Se encontraron {data.length} resultados {">"}
          </small>
          {data.length > 0 && <Tabla rows={data} columns={columnas} />}
        </>
      )}
    </section>
  );
};

export default Reportes;
