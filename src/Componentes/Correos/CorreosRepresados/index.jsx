import {Button, Title} from "@tremor/react";
import Tabla from "../Tabla";
import {DropDownElement} from "../DropDownElement";
import {TextInputElement} from "../TextInputElement";
import {DateElement} from "../DateElement";
import {useState, useEffect} from "react";
import "../../dashboard/pqrs/Dashboard.css";
import Select from "react-select";
import axios from "axios";
import "tailwindcss/tailwind.css";

const URLS = {
  Internos:
    "https://sadecv.sysdatec.com/Dashboard/ReportMailInternal/ReportMailInternal",
  Recibidos:
    "https://sadecv.sysdatec.com/Dashboard/ReportMailReceived/ReportMailReceived",
  Enviados:
    "https://sadecv.sysdatec.com/Dashboard/ReportMailSent/ReportMailSent"
};

const columnasInternos = [
  {
    key: "CodeInterMail",
    name: "Numero de radicado"
  },
  {
    key: "Asunto",
    name: "Asunto"
  },
  {
    key: "ClaseCorrespondencia",
    name: "Clase de Correspondencia"
  },
  {
    key: "CompanyDesc",
    name: "Descripcion del Tipo de Negocio"
  },
  {
    key: "CreationDate",
    name: "Fecha Ingreso"
  },
  {
    key: "DependenciaInicial",
    name: "Dependencia Inicial"
  },
  {
    key: "DependenciaPasoFlujo",
    name: "Dependencia Paso Flujo"
  },
  {
    key: "FechaRadicado",
    name: "Fecha Radicado"
  },
  {
    key: "FlowDesc",
    name: "Descripcion del Flujo"
  },
  {
    key: "IdDocSendCopy",
    name: "Id Doc Send Copy"
  },
  {
    key: "Notified",
    name: "Notificados"
  },
  {
    key: "ReqAnswer",
    name: "Requiere respuesta"
  },
  {
    key: "ResponsablePasoFlujo",
    name: "Responsable Paso Flujo"
  },
  {
    key: "StatusDesc",
    name: "Estado Correos"
  },
  {
    key: "TipoCorreo",
    name: "Tipo Correo"
  },
  {
    key: "TypificDesc",
    name: "Descripcion de la Tipificación"
  },
  {
    key: "UsuarioRemite",
    name: "Usuario Remite"
  }
];

const columnasRecibidos = [
  {
    key: "CodeReceivMail",
    name: "Numero de radicado"
  },
  {
    key: "Asunto",
    name: "Asunto"
  },
  {
    key: "BusinessDesc",
    name: "Descripcion de la Empresa"
  },
  {
    key: "ClaseCorrespondencia",
    name: "Clase de Correspondencia"
  },
  {
    key: "CompanyDesc",
    name: "Descripcion del Tipo de Negocio"
  },
  {
    key: "CreationDate",
    name: "Fecha Ingreso"
  },
  {
    key: "DependenciaInicial",
    name: "Dependencia Inicial"
  },
  {
    key: "DependenciaPasoFlujo",
    name: "Dependencia Paso Flujo"
  },
  {
    key: "DocNumber",
    name: "Numero de Documento"
  },
  {
    key: "FechaRadicado",
    name: "Fecha Radicado"
  },
  {
    key: "FlowDesc",
    name: "Descripcion del Flujo"
  },
  {
    key: "Notified",
    name: "Notificados"
  },
  {
    key: "ReqAnswer",
    name: "Requiere respuesta"
  },
  {
    key: "ResponsablePasoFlujo",
    name: "Responsable Paso Flujo"
  },
  {
    key: "StatusDesc",
    name: "Estado Correos"
  },
  {
    key: "TipoCorreo",
    name: "Tipo Correo"
  },
  {
    key: "TypificDesc",
    name: "Descripcion de la Tipificación"
  },
  {
    key: "UsuarioRemite",
    name: "Usuario Remite"
  }
];

const columnasEnviados = [
  {
    key: "CodeMailSent",
    name: "Numero de radicado"
  },
  {
    key: "BusinessDesc",
    name: "Descripcion de la Empresa"
  },
  {
    key: "CompanyDesc",
    name: "Descripcion del Tipo de Negocio"
  },
  {
    key: "ConsecAnual",
    name: "Consecutivo Anual"
  },
  {
    key: "CreadoPor",
    name: "Creado Por"
  },
  {
    key: "CreationDate",
    name: "Fecha Ingreso"
  },
  {
    key: "DateIn",
    name: "Fecha In"
  },
  {
    key: "DeliveryDesc",
    name: "Delivery Desc"
  },
  {
    key: "DepenDesc",
    name: "Descripción de la Dependencia"
  },
  {
    key: "DestinAddress",
    name: "Dirección Destino"
  },
  {
    key: "DestinatPerson",
    name: "Destinatario"
  },
  {
    key: "GroMailDesc",
    name: "Grupo de Correo"
  },
  {
    key: "GuideNumber",
    name: "Numero de Guia"
  },
  {
    key: "NroComunication",
    name: "Numero de Comunicación"
  },
  {
    key: "NroFolios",
    name: "Numero de Folios"
  },
  {
    key: "Observations",
    name: "Observaciones"
  },
  {
    key: "PriorityDesc",
    name: "Prioridad"
  },
  {
    key: "Remitente",
    name: "Remitente"
  },
  {
    key: "ShippingDesc",
    name: "Envio"
  },
  {
    key: "Subject",
    name: "Asunto"
  },
  {
    key: "TypificDesc",
    name: "Descripcion de la Tipificación"
  },
  {
    key: "Year",
    name: "Año"
  }
];

const columnas = {
  Internos: columnasInternos,
  Recibidos: columnasRecibidos,
  Enviados: columnasEnviados
};

const SelectBox = ({
  url,
  valueKey,
  labelKey,
  onChange,
  placeholder,
  title,
  name
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;

        const mappedOptions = data.map((item) => ({
          value: item[valueKey],
          label: item[labelKey]
        }));

        setOptions(mappedOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchData();
  }, [url, valueKey, labelKey]);

  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{title}</label>
      <Select
        options={options}
        placeholder={placeholder}
        title={title}
        name={name}
        value={selectedOption}
        onChange={(option) => {
          setSelectedOption(option);
          onChange(option);
        }}
      />
    </div>
  );
};

const optionsimple = [
  {value: "si", label: "Sí"},
  {value: "no", label: "No"}
];

const optionReporte = [
  {value: "Internos", label: "Internos"},
  {value: "Recibidos", label: "Recibidos"},
  {value: "Enviados", label: "Enviados"}
];

const optionConsulta = [
  {value: "Correos de seguimiento", label: "Correos de seguimiento"},
  {value: "Mis Correos", label: "Mis Correos"},
  {value: "Otras Dependencias", label: "Otras Dependencias"}
];

const SelectSimple = ({onChange, placeholder, title, name, seloptionsel}) => {
  const [selectedOptionSimple, setSelectedOptionSimple] = useState(null);

  const handleChangeSimple = (option) => {
    setSelectedOptionSimple(option);
    onChange(option);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{title}</label>
      <Select
        options={seloptionsel}
        placeholder="Selecciona una opción"
        value={selectedOptionSimple}
        onChange={handleChangeSimple}
        id={`select_${name}`}
      />
    </div>
  );
};

export default function CorreosRepresados() {
  const [data, setData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState("Internos");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [empresas, setEmpresas] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    async function fetch_Data() {
      const body = {
        ...formValues
      };

      console.log("inicia");
      console.log(body);
      console.log("termina");

      delete body.tipoConsulta;

      const response = await fetch(URLS[formValues.tipoConsulta], {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      setData(data);
      setSelectedColumn(formValues.tipoConsulta);
      setLoading(false);
    }
    setLoading(true);
    fetch_Data();
  };

  const handleChange = (e, filterName) => {
    console.log(e.value);
    console.log(filterName);
    setFormValues((prev) => ({...prev, [filterName]: e.value}));
    console.log(formValues);
  };

  const handleChangeSimple = (option) => {
    console.log(option);
  };

  console.log({data});

  return (
    <section className="px-4 min-h-screen dashboard">
      <div className="p-4 pl-0">
        <Title>Correos Represados</Title>
      </div>
      <form
        className="grid flex flex-wrap justify-stretch grid-cols-4 gap-y-2 gap-x-4 "
        onSubmit={handleSubmit}
      >
        <SelectSimple
          name="tipoConsulta"
          title="Tipo Consulta"
          onChange={(e)=>{handleChange(e, "tipoConsulta")}}
          seloptionsel={optionReporte}
        />
        <SelectSimple
          name="Tipo de Reporte"
          title="Tipo de Reporte"
          onChange={handleChangeSimple}
          seloptionsel={optionConsulta}
        />
        <SelectBox
          url="https://sadecv.sysdatec.com/Configs/Bussiness/GetBussiness"
          valueKey="IdBusiness"
          labelKey="BusinessDesc"
          onChange={setSelectedOption}
          placeholder={"Seleccione una Empresa"}
          title="Empresa"
          name="IDBUSINESS"
        />
        <SelectBox
          url="https://sadecv.sysdatec.com/Configs/Company/GetCompany"
          valueKey="IdCompany"
          labelKey="CompanyDesc"
          onChange={setSelectedOption}
          placeholder={"Seleccione un Tipo de Negocio"}
          title="Tipo de Negocio"
          name="IDCOMPANY"
        />
        <SelectBox
          url="https://sadecv.sysdatec.com/SPRIMESERVICES/WsWf/api/WF_Typification"
          valueKey="codeTypific"
          labelKey="typificDesc"
          onChange={setSelectedOption}
          placeholder={"Seleccione una Tipificacion"}
          title="Tipificación"
          name="IDTIPIFICATION"
        />
        <DropDownElement
          className="flex flex-col"
          title="Responsable Paso Flujo"
          name="IDUSERNAME"
          handleChange={handleChangeSimple}
          placeholder="Responsable Paso Flujo"
          options={["Responsable 1", "Responsable 2", "Responsable 3"]}
        />
        <SelectBox
          url="https://sadecv.sysdatec.com/Configs/Deps/GetDeps"
          valueKey="CodeDepen"
          labelKey="DepenDesc"
          onChange={setSelectedOption}
          placeholder={"Dependencia Paso Flujo"}
          title="Dependencia Paso Flujo"
          name="IDDEPENDENCE"
        />
        <SelectBox
          url="https://sadecv.sysdatec.com/SPRIMESERVICES/WsWf/api/WF_MailFlow"
          valueKey="codeFlow"
          labelKey="description"
          onChange={setSelectedOption}
          placeholder={"Seleccione un flujo"}
          title="Flujo"
          name="IDFLOW"
        />
        <SelectBox
          url="https://sadecv.sysdatec.com/SPRIMESERVICES/WsWf/api/WF_MailStatus"
          valueKey="codeStatus"
          labelKey="statusDesc"
          onChange={setSelectedOption}
          placeholder={"Seleccione un Estado "}
          title="Estado Correos"
          name="IDMAILSTATUS"
        />
        <SelectBox
          url="https://sadecv.sysdatec.com/SPRIMESERVICES/WsWf/api/WF_MailClass"
          valueKey="codeMailClass"
          labelKey="mailDesc"
          onChange={setSelectedOption}
          placeholder={"Clase de Correspondencia "}
          title="Clase de Correspondencia"
          name="IDMAILCLASS"
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
        <SelectSimple
          name="ReqRespuesta"
          title="Requiere Respuesta"
          onChange={handleChangeSimple}
          seloptionsel={optionsimple}
        />
        <DropDownElement
          title="Responsable Paso Flujo"
          name="RESPONSABLEPASOFLUJO"
          handleChange={handleChange}
          placeholder="Responsable Paso Flujo"
          options={["Responsable 1", "Responsable 2", "Responsable 3"]}
        />
        <DropDownElement
          title="Usuario Remite"
          name="USUARIOREMITE"
          handleChange={handleChange}
          placeholder="Usuario Remite"
          options={["Usuario 1", "Usuario 2", "Usuario 3"]}
        />
        <SelectBox
          url="https://sadecv.sysdatec.com/Configs/Deps/GetDeps"
          valueKey="CodeDepen"
          labelKey="DepenDesc"
          onChange={setSelectedOption}
          placeholder={"Seleccione una Dependencia Inicial"}
          title="Dependencia Inicial"
          name="StartIDDEPENDENCE"
        />
        <SelectSimple
          name="NOTIFIED"
          title="Notificados"
          onChange={handleChangeSimple}
          seloptionsel={optionsimple}
        />
        <DateElement
          title="Fecha Radicado"
          placeholder="Fecha Radicado"
          name="FECHARADICADO"
          // onChange={(e)=>{handleChange(e, "tipoConsulta")}}
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
          <Button type="submit" variant="primary" className="float-left w-40">
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
            <Tabla
              className="table"
              rows={data}
              columns={columnas[selectedColumn]}
            />
          )}
        </>
      )}
    </section>
  );
}
