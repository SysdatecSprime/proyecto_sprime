import { Button, Title } from "@tremor/react";
import Tabla from "../Tabla";
import { DropDownElement } from "../DropDownElement";
import { TextInputElement } from "../TextInputElement";
import { DateElement } from "../DateElement";
import { useState, useEffect } from "react";

const URLS = {
  Internos:
    "https://sadecv.sysdatec.com/Dashboard/ReportMailInternal/ReportMailInternal",
  Recibidos:
    "https://sadecv.sysdatec.com/Dashboard/ReportMailReceived/ReportMailReceived",
  Enviados:
    "https://sadecv.sysdatec.com/Dashboard/ReportMailSent/ReportMailSent",
};

const columnasInternos = [
  {
    key: "CodeInterMail",
    name: "Numero de radicado",
  },
  {
    key: "Asunto",
    name: "Asunto",
  },
  {
    key: "ClaseCorrespondencia",
    name: "Clase de Correspondencia",
  },
  {
    key: "CompanyDesc",
    name: "Descripcion del Tipo de Negocio",
  },
  {
    key: "CreationDate",
    name: "Fecha Ingreso",
  },
  {
    key: "DependenciaInicial",
    name: "Dependencia Inicial",
  },
  {
    key: "DependenciaPasoFlujo",
    name: "Dependencia Paso Flujo",
  },
  {
    key: "FechaRadicado",
    name: "Fecha Radicado",
  },
  {
    key: "FlowDesc",
    name: "Descripcion del Flujo",
  },
  {
    key: "IdDocSendCopy",
    name: "Id Doc Send Copy",
  },
  {
    key: "Notified",
    name: "Notificados",
  },
  {
    key: "ReqAnswer",
    name: "Requiere respuesta",
  },
  {
    key: "ResponsablePasoFlujo",
    name: "Responsable Paso Flujo",
  },
  {
    key: "StatusDesc",
    name: "Estado Correos",
  },
  {
    key: "TipoCorreo",
    name: "Tipo Correo",
  },
  {
    key: "TypificDesc",
    name: "Descripcion de la Tipificación",
  },
  {
    key: "UsuarioRemite",
    name: "Usuario Remite",
  },
];

const columnasRecibidos = [
  {
    key: "CodeReceivMail",
    name: "Numero de radicado",
  },
  {
    key: "Asunto",
    name: "Asunto",
  },
  {
    key: "BusinessDesc",
    name: "Descripcion de la Empresa",
  },
  {
    key: "ClaseCorrespondencia",
    name: "Clase de Correspondencia",
  },
  {
    key: "CompanyDesc",
    name: "Descripcion del Tipo de Negocio",
  },
  {
    key: "CreationDate",
    name: "Fecha Ingreso",
  },
  {
    key: "DependenciaInicial",
    name: "Dependencia Inicial",
  },
  {
    key: "DependenciaPasoFlujo",
    name: "Dependencia Paso Flujo",
  },
  {
    key: "DocNumber",
    name: "Numero de Documento",
  },
  {
    key: "FechaRadicado",
    name: "Fecha Radicado",
  },
  {
    key: "FlowDesc",
    name: "Descripcion del Flujo",
  },
  {
    key: "Notified",
    name: "Notificados",
  },
  {
    key: "ReqAnswer",
    name: "Requiere respuesta",
  },
  {
    key: "ResponsablePasoFlujo",
    name: "Responsable Paso Flujo",
  },
  {
    key: "StatusDesc",
    name: "Estado Correos",
  },
  {
    key: "TipoCorreo",
    name: "Tipo Correo",
  },
  {
    key: "TypificDesc",
    name: "Descripcion de la Tipificación",
  },
  {
    key: "UsuarioRemite",
    name: "Usuario Remite",
  },
];

const columnasEnviados = [
  {
    key: "CodeMailSent",
    name: "Numero de radicado",
  },
  {
    key: "BusinessDesc",
    name: "Descripcion de la Empresa",
  },
  {
    key: "CompanyDesc",
    name: "Descripcion del Tipo de Negocio",
  },
  {
    key: "ConsecAnual",
    name: "Consecutivo Anual",
  },
  {
    key: "CreadoPor",
    name: "Creado Por",
  },
  {
    key: "CreationDate",
    name: "Fecha Ingreso",
  },
  {
    key: "DateIn",
    name: "Fecha In",
  },
  {
    key: "DeliveryDesc",
    name: "Delivery Desc",
  },
  {
    key: "DepenDesc",
    name: "Descripción de la Dependencia",
  },
  {
    key: "DestinAddress",
    name: "Dirección Destino",
  },
  {
    key: "DestinatPerson",
    name: "Destinatario",
  },
  {
    key: "GroMailDesc",
    name: "Grupo de Correo",
  },
  {
    key: "GuideNumber",
    name: "Numero de Guia",
  },
  {
    key: "NroComunication",
    name: "Numero de Comunicación",
  },
  {
    key: "NroFolios",
    name: "Numero de Folios",
  },
  {
    key: "Observations",
    name: "Observaciones",
  },
  {
    key: "PriorityDesc",
    name: "Prioridad",
  },
  {
    key: "Remitente",
    name: "Remitente",
  },
  {
    key: "ShippingDesc",
    name: "Envio",
  },
  {
    key: "Subject",
    name: "Asunto",
  },
  {
    key: "TypificDesc",
    name: "Descripcion de la Tipificación",
  },
  {
    key: "Year",
    name: "Año",
  },
];

const columnas = {
  Internos: columnasInternos,
  Recibidos: columnasRecibidos,
  Enviados: columnasEnviados,
};

export default function CorreosRepresados() {
  const [data, setData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("Internos");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    async function fetchData() {
      const body = {
        ...formValues,
      };

      delete body.tipoConsulta;

      const response = await fetch(URLS[formValues.tipoConsulta], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      setData(data);
      setSelectedColumn(formValues.tipoConsulta);
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  };

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(URLS.Internos, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      setData(data);
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  }, []);

  console.log({ data });

  return (
    <section className="px-4 min-h-screen">
      <div className="p-4 pl-0">
        <Title>Correos Represados</Title>
      </div>
      <form
        className="flex flex-wrap justify-evenly gap-y-2 gap-x-4 "
        onSubmit={handleSubmit}
      >
        <DropDownElement
          title="Tipo Consulta"
          name="tipoConsulta"
          handleChange={handleChange}
          placeholder="Tipo Consulta"
          options={["Internos", "Recibidos", "Enviados"]}
        />
        <DropDownElement
          title="Tipo Correo"
          placeholder="Tipo correo"
          name="tipoCorreo"
          handleChange={handleChange}
          options={[
            "Todos",
            "Correos de seguimiento",
            "Mis Correos",
            "Otras Dependencias",
          ]}
        />
        <DropDownElement
          title="Empresa"
          name="IDBUSINESS"
          handleChange={handleChange}
          placeholder="Empresa"
          options={["Empresa 1", "Empresa 2", "Empresa 3"]}
        />
        <DropDownElement
          title="Tipo de Negocio"
          name="IDCOMPANY"
          handleChange={handleChange}
          placeholder="Tipo de negocio"
          options={["Tipo 1", "Tipo 2", "Tipo 3"]}
        />
        <DropDownElement
          title="Tipificación"
          name="IDTIPIFICATION"
          handleChange={handleChange}
          placeholder="Tipificación"
          options={["Tipificación 1", "Tipificación 2", "Tipificación 3"]}
        />
        <DropDownElement
          title="Responsable Paso Flujo"
          name="IDUSERNAME"
          handleChange={handleChange}
          placeholder="Responsable Paso Flujo"
          options={["Responsable 1", "Responsable 2", "Responsable 3"]}
        />
        <DropDownElement
          title="Dependencia Paso Flujo"
          name="IDDEPENDENCE"
          handleChange={handleChange}
          placeholder="Dependencia Paso Flujo"
          options={["Dependencia 1", "Dependencia 2", "Dependencia 3"]}
        />
        <DropDownElement
          title="Flujo"
          name="IDFLOW"
          handleChange={handleChange}
          placeholder="Flujo"
          options={["Flujo 1", "Flujo 2", "Flujo 3"]}
        />
        <DropDownElement
          title="Estado Correos"
          name="IDMAILSTATUS"
          handleChange={handleChange}
          placeholder="Estado Correos"
          options={["Estado 1", "Estado 2", "Estado 3"]}
        />
        <DropDownElement
          title="Clase de Correspondencia"
          name="IDMAILCLASS"
          handleChange={handleChange}
          placeholder="Clase de correspondencia"
          options={["Clase 1", "Clase 2", "Clase 3"]}
        />
        <TextInputElement
          title="Numero de Radicado"
          name="CODEINTERMAIL"
          handleChange={handleChange}
          placeholder="Numero de radicado"
        />
        <TextInputElement
          title="Descripcion de la Empresa"
          name="BUSINESSDESC"
          handleChange={handleChange}
          placeholder="Descripcion de la Empresa"
        />
        <TextInputElement
          title="Descripcion del Tipo de Negocio"
          name="COMPANYDESC"
          handleChange={handleChange}
          placeholder="Descripcion del Tipo de Negocio"
        />
        <TextInputElement
          title="Descripcion de la Tipificación"
          name="TIPIFICATIONDESC"
          handleChange={handleChange}
          placeholder="Descripcion de la Tipificación"
        />
        <DropDownElement
          title="Requiere Respuesta"
          name="REQANSWER"
          handleChange={handleChange}
          placeholder={"Requiere Respuesta"}
          options={["Si", "No"]}
        />
        <DropDownElement
          title="Responsable Paso Flujo"
          name="RESPONSABLEPASOFLUJO"
          handleChange={handleChange}
          placeholder="Responsable Paso Flujo"
          options={["Responsable 1", "Responsable 2", "Responsable 3"]}
        />
        <DropDownElement
          title="Dependencia Paso Flujo"
          name="DEPENDENCIAPASOFLUJO"
          handleChange={handleChange}
          placeholder="Dependencia Paso Flujo"
          options={["Dependencia 1", "Dependencia 2", "Dependencia 3"]}
        />
        <DropDownElement
          title="Usuario Remite"
          name="USUARIOREMITE"
          handleChange={handleChange}
          placeholder="Usuario Remite"
          options={["Usuario 1", "Usuario 2", "Usuario 3"]}
        />
        <DropDownElement
          title="Descripcion del Flujo"
          name="FLOWDESC"
          handleChange={handleChange}
          placeholder="Descripcion del Flujo"
          options={["Flujo 1", "Flujo 2", "Flujo 3"]}
        />
        <DropDownElement
          title="Dependencia Inicial"
          name="DEPENDENCIAINICIAL"
          handleChange={handleChange}
          placeholder="Dependencia Inicial"
          options={["Dependencia 1", "Dependencia 2", "Dependencia 3"]}
        />
        <DropDownElement
          title="Estado Correos"
          name="STATUSDESC"
          handleChange={handleChange}
          placeholder="Estado Correos"
          options={["Estado 1", "Estado 2", "Estado 3"]}
        />
        <DropDownElement
          title="Notificados"
          name="NOTIFIED"
          handleChange={handleChange}
          placeholder="Notificados"
          options={["Si", "No"]}
        />
        <DateElement
          title="Fecha Radicado"
          placeholder="Fecha Radicado"
          name="FECHARADICADO"
          handleChange={handleChange}
        />
        <DropDownElement
          title="Clase de Correspondencia"
          name="CLASECORRESPONDENCIA"
          handleChange={handleChange}
          placeholder="Clase de Correspondencia"
          options={["Clase 1", "Clase 2", "Clase 3"]}
        />
        <TextInputElement
          title="Asunto"
          placeholder="Asunto"
          name="ASUNTO"
          handleChange={handleChange}
        />
        <DateElement
          title="Fecha Ingreso"
          placeholder="Fecha Ingreso"
          name="CREATIONDATE"
          handleChange={handleChange}
        />
        <TextInputElement
          title="Numero de Documento"
          name="DOCNUMBER"
          handleChange={handleChange}
          placeholder="Numero de Documento"
        />

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
          {data.length > 0 && (
            <Tabla rows={data} columns={columnas[selectedColumn]} />
          )}
        </>
      )}
    </section>
  );
}
