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
      key: "tipoCorreo",
      name: "Tipo Correo",
    },
    {
      key: "numeroRadicado",
      name: "Numero de Radicado",
    },
    {
      key: "consecutivoAnual",
      name: "Consecutivo Anual",
    },
    {
      key: "numeroComunicacion",
      name: "Numero de Comunicación",
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
      key: "flujo",
      name: "Flujo",
    },
    {
      key: "dependenciaInicial",
      name: "Dependencia Inicial",
    },
    {
      key: "dependenciaPasoFlujo",
      name: "Dependencia Paso Flujo",
    },
    {
      key: "responsablePasoFlujo",
      name: "Responsable Paso Flujo",
    },
    {
      key: "notificados",
      name: "Notificados",
    },
    {
      key: "requiereRespuesta",
      name: "Requiere Respuesta",
    },
    {
      key: "prioridad",
      name: "Prioridad",
    },
    {
      key: "estadoCorreos",
      name: "Estado Correos",
    },
    {
      key: "estadoVerificacion",
      name: "Estado Verificación",
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
      key: "numeroDocumento",
      name: "Numero de Documento",
    },
    {
      key: "observaciones",
      name: "Observaciones",
    },
    {
      key: "fechaRadicacion",
      name: "Fecha Radicación",
    },
    {
      key: "fechaIngreso",
      name: "Fecha Ingreso",
    }
  ];
  
  return (
    <section className="px-4 min-h-screen">
      <div className="p-4 pl-0">
        <Title>Correos Represados</Title>
      </div>
      <form className="flex flex-wrap justify-evenly gap-y-2 gap-x-4 ">
        <DropDownElement
          title="Tipo Correo"
          placeholder="Tipo correo"
          options={[
            "Todos",
            "Correos de seguimiento",
            "Mis Correos",
            "Otras Dependencias",
          ]}
        />
        <TextInputElement
          title="Numero de Radicado"
          placeholder="Numero de radicado"
        />
        <TextInputElement
          title="Consecutivo Anual"
          placeholder="Consecutivo anual"
        />
        <DropDownElement
          title="Numero de comunicación"
          placeholder="Numero de comunicación"
          options={["Numero 1", "Numero 2", "Numero 3"]}
        />
        <DropDownElement
          title="Empresa"
          placeholder="Empresa"
          options={["Empresa 1", "Empresa 2", "Empresa 3"]}
        />
        <DropDownElement
          title="Tipo de negocio"
          placeholder="Tipo de negocio"
          options={["Tipo 1", "Tipo 2", "Tipo 3"]}
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
          placeholder="Clase de correspondencia"
          options={["Clase 1", "Clase 2", "Clase 3"]}
        />
        <DropDownElement
          title="Flujo"
          placeholder="Flujo"
          options={["Flujo 1", "Flujo 2", "Flujo 3"]}
        />
        <DropDownElement
          title="Dependencia Inicial"
          placeholder="Dependencia inicial"
          options={["Dependencia 1", "Dependencia 2", "Dependencia 3"]}
        />
        <DropDownElement
          title="Dependencia Paso Flujo"
          placeholder="Dependencia paso flujo"
          options={["Dependencia 1", "Dependencia 2", "Dependencia 3"]}
        />
        <DropDownElement
          title="Responsable Paso Flujo"
          placeholder="Responsable paso flujo"
          options={["Responsable 1", "Responsable 2", "Responsable 3"]}
        />
        <DropDownElement
          title="Notificados"
          placeholder="Notificados"
          options={["Si", "No"]}
        />
        <DropDownElement
          title="Requiere Respuesta"
          placeholder="Requiere respuesta"
          options={["Si", "No"]}
        />
        <DropDownElement
          title="Prioridad"
          placeholder="Prioridad"
          options={["Prioridad 1", "Prioridad 2", "Prioridad 3"]}
        />
        <DropDownElement
          title="Estado Correos"
          placeholder="Estado correos"
          options={["Estado 1", "Estado 2", "Estado 3"]}
        />
        <DropDownElement
          title="Estado Verificación"
          placeholder="Estado verificación"
          options={["Estado 1", "Estado 2", "Estado 3"]}
        />
        <DropDownElement
          title="Digitalizado"
          placeholder="Digitalizado"
          options={["Si", "No"]}
        />
        <TextInputElement title="Remitente" placeholder="Remitente" />
        <TextInputElement title="Asunto" placeholder="Asunto" />
        <TextInputElement
          title="Numero de folios"
          placeholder="Numero de folios"
        />
        <TextInputElement
          title="Numero de documento"
          placeholder="Numero de documento"
        />
        <TextInputElement title="Observaciones" placeholder="Observaciones" />
        <DateElement
          title="Fecha Radicación"
          placeholder="Seleccione una fecha"
        />
        <DateElement title="Fecha Ingreso" placeholder="Seleccione una fecha" />

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
