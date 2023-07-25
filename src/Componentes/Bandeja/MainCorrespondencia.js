import { Tab, TabList } from "@tremor/react";
import React, { useEffect, useState } from "react";
import { MailIcon } from "@heroicons/react/outline";
import RecibidaUno from "../Bandeja/Correspondencia/RecibidaUno";
import RecibidaDos from "../Bandeja/Correspondencia/RecibidaDos";
import RecibidaTres from "../Bandeja/Correspondencia/RecibidaTres";
import EnviadaUno from "../Bandeja/Correspondencia/EnviadaUno";
import EnviadaDos from "../Bandeja/Correspondencia/EnviadaDos";
import EnviadaTres from "../Bandeja/Correspondencia/EnviadaTres";
import InternaUno from "../Bandeja/Correspondencia/InternaUno";
import InternaDos from "../Bandeja/Correspondencia/InternaDos";
import InternaTres from "../Bandeja/Correspondencia/InternaTres";
import { dataBandeja } from "./UrlBase";
import { getFromStorage } from "../../Utils/storage/storage";

function MainCorrespondencia() {
  const [selecTabView, setSelecTabView] = useState(1);
  const [recibidoPasoUno, setRecibidoPasoUno] = useState(1);
  const [enviadaPasoUno, setEnviadaPasoUno] = useState(1);
  const [internaPasoUno, setInternaPasoUno] = useState(1);
  const [recibido, setRecibido] = useState([]);

  const handleChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleDirectChange = (name, value) => {
    if (name === "IdUser") {
      setFormFields({
        ...formFields,
        IdUser: value.id,
        SenderName: value.name,
        IdDependence: value.dependenceId,
        DependenceName: value.dependenceName,
      });
    } else if (name === "IdMailClass") {
      let days = parseInt(value.responseTime);
      let date = new Date(Date.now());
      date.setDate(date.getDate() + days);
      setFormFields({
        ...formFields,
        IdMailClass: value.id,
        MailClassName: value.name,
        DueDate: new Date(date).toDateString(),
      });
    } else {
      setFormFields({
        ...formFields,
        [name]: value,
      });
      if (name === "IdTipology" && value === "Anonimo") {
        setFormFields({
          ...formFields,
          IdContact: "Anonimo",
          LegalName: "Anonimo",
          Phone: "Anonimo",
          [name]: value,
        });
      }
      if (
        formFields.IdTipology === "Anonimo" &&
        name === "IdTipology" &&
        value !== "Anonimo"
      ) {
        setFormFields({
          ...formFields,
          IdContact: "1",
          LegalName: "",
          Phone: "",
          [name]: value,
        });
      }
    }
  };

  const handleTabClick = (value) => {
    setSelecTabView(value);
  };
  const [formFields, setFormFields] = useState({
    CodeReceivMail: "20230002250",
    ResponDesc: "",
    ConsecAnual: "0",
    IdUser: 0,
    NotifyIdUser: 0,
    IdMailClass: "1",
    MailClassName: "",
    IdDependence: 0,
    IdTypification: "1",
    IdTipology: "1",
    IdSerie: "1",
    IdMailStatus: "1",
    IdFile: "0",
    IdCountry: "",
    IdCity: "1",
    IdDepartment: "1",
    IdCompany: "1",
    IdBusiness: "1",
    IdRespMed: "1",
    IdRecMed: "1",
    IdContact: "1",
    LegalName: "",
    IdGroups: "1",
    IdDeliveryType: "1",
    IdCopyDocSent: "1",
    IdPriority: "1",
    IdIdentificType: "1",
    DocNumber: "123",
    IdOriginExter: "1",
    IdFlow: "1",
    IdMailUpdate: "1",
    Subject: "",
    Attachment: "-",
    Observations: "",
    SenderName: "",
    Active: "1",
    Read: "0",
    NoFlow: "0",
    ReqAnswer: "0",
    NroFolios: "0",
    NroCopiesRot: "1",
    ContactSends: "CIUDADANO",
    AddressSends: "",
    NroComunication: "0",
    Phone: "",
    EmailSender: "",
    EmailCompany: "",
    EmailSend: "0",
    DateIn: "20230511",
    ShippingDate: "20230511",
    RemissionDate: new Date(Date.now()).toDateString(),
    DueDate: new Date(Date.now()).toDateString(),
    CreatedBy: "1",
    CreationDate: "20230511",
    UpdatedBy: "1",
    UpdateDate: "20230511",
    IsTemporal: true,
    Files: [],
    DependenceName: "",
  });

  async function CrearRecibida(TipoCorreo) {
    const appObject = await getFromStorage("sprime_app");
    const userId = appObject.user.IdUser;
    const body = {
      idMailReceived: 0, //auto
      codeReceivMail: "string", //auto
      consecAnual: "string", //auto
      idUserRespon: formFields.IdUser, //Para
      responDesc: formFields.SenderName, //Nombre para
      emailSender: formFields.EmailSender, //Correo remitente
      userReceiv: 0, //auto
      contactSends: formFields.IdContact, //contacto id
      idDepend: formFields.IdDependence, //Dependencia
      dependReceiv: 0, //veremos
      idSubDep: 0, //veremos
      subDepReceiv: 0, //veremos
      idCity: formFields.IdCity, //Ciudad
      cityReceiv: 0, //veremos
      addressSends: formFields.AddressSends, //Direccion
      idMailClass: formFields.IdMailClass, //Clase correspondencia
      idTypification: formFields.IdTypification, //Tipificacion
      idTRD: 0, //auto
      idSerie: 0, //auto
      idSubSerie: 0, //auto
      idTipology: 0, //auto
      idMailStatus: 1, //auto
      idFile: 0, //auto
      idDocType: 0, //auto
      idRequesterType: formFields.IdTipology, //tipo de remitente
      idNest: 0, //auto
      expSendOriginal: 0, //auto
      expSendCopy: 0, //auto
      idCopyDocSent: 0, //auto
      idCountry: formFields.IdCountry, //Pais
      idCompany: formFields.IdCompany, //Empresa
      idBusiness: formFields.IdBusiness, //Negocio
      idRecMed: formFields.IdRecMed, //Medio recepcion
      idPriority: formFields.IdPriority, //prioridad
      idIdentType: formFields.IdIdentificType, //tipo de identificacion
      docNumber: formFields.DocNumber, //Nro de documento
      nroDocSender: formFields.DocNumber, //Nro de documento
      idOriginExter: 0, //auto
      idMailFlow: formFields.IdFlow, //flujo
      idMailUpdate: 0, //dejar en 0
      idRespStepFlow: formFields.IdUser, //Para
      subject: formFields.Subject, //Asunto
      observations: formFields.Observations, //caracteristicas
      senderName: formFields.SenderName, //remitente
      emailClient: formFields.EmailCompany, //correo empresarial
      active: true, //auto
      read: true, //auto
      noFlow: false, //auto
      reqAnswer: true, //auto
      emailSend: true, //auto
      nroCopies: "1", //auto
      nroFolios: formFields.NroFolios, //Folios
      nroComunication: formFields.NroComunication, //Nro comunicacion
      phone: formFields.Phone, //telefono
      dateIn: new Date(Date.now()).toDateString(), //fecha actual
      globalDueDate: formFields.DueDate, //fecha vencimiento
      shippingDate: formFields.RemissionDate, //fecha de remision
      createdBy: userId, //Id usuario login
      creationDate: new Date(Date.now()).toDateString(), //fecha actual
      updatedBy: userId, //Id usuario login
      updateDate: new Date(Date.now()).toDateString(), //fecha actual
    };
    console.log(body);
    /* const recibidoProm = await fetch(
      `${dataBandeja}/Radicados/rec/InsertReceivedMail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      }
    );

    const respRecibido = await recibidoProm.json();

    if (recibidoProm.ok) {
      setRecibido(respRecibido.Recibido);
    } */
  }

  return (
    <>
      <TabList defaultValue={1}>
        <Tab
          value={1}
          text="Correspondencia Recibida"
          icon={MailIcon}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          value={2}
          text="Correspondencia Enviada"
          icon={MailIcon}
          onClick={() => handleTabClick(2)}
        />
        <Tab
          value={3}
          text="Correspondencia Interna"
          icon={MailIcon}
          onClick={() => handleTabClick(3)}
        />
      </TabList>

      {selecTabView === 1 && (
        <>
          {" "}
          {recibidoPasoUno === 1 && (
            <RecibidaUno
              recibido={recibido}
              paso={recibidoPasoUno}
              setRecibidoPasoUno={setRecibidoPasoUno}
              formFields={formFields}
              handleChange={handleChange}
              handleDirectChange={handleDirectChange}
            />
          )}
          {recibidoPasoUno === 2 && (
            <RecibidaDos
              paso={recibidoPasoUno}
              setRecibidoPasoUno={setRecibidoPasoUno}
              formFields={formFields}
              handleChange={handleChange}
              handleDirectChange={handleDirectChange}
            />
          )}
          {recibidoPasoUno === 3 && (
            <RecibidaTres
              paso={recibidoPasoUno}
              setRecibidoPasoUno={setRecibidoPasoUno}
              CrearRecibida={CrearRecibida}
              formFields={formFields}
              handleChange={handleChange}
            />
          )}
        </>
      )}
      {selecTabView === 2 && (
        <>
          {enviadaPasoUno === 1 && (
            <EnviadaUno
              paso={enviadaPasoUno}
              setEnviadaPasoUno={setEnviadaPasoUno}
            />
          )}
          {enviadaPasoUno === 2 && (
            <EnviadaDos
              paso={enviadaPasoUno}
              setEnviadaPasoUno={setEnviadaPasoUno}
            />
          )}
          {enviadaPasoUno === 3 && (
            <EnviadaTres
              paso={enviadaPasoUno}
              setEnviadaPasoUno={setEnviadaPasoUno}
            />
          )}
        </>
      )}
      {selecTabView === 3 && (
        <>
          {internaPasoUno === 1 && (
            <InternaUno
              paso={internaPasoUno}
              setInternaPasoUno={setInternaPasoUno}
            />
          )}
          {internaPasoUno === 2 && (
            <InternaDos
              paso={internaPasoUno}
              setInternaPasoUno={setInternaPasoUno}
            />
          )}
          {internaPasoUno === 3 && (
            <InternaTres
              paso={internaPasoUno}
              setInternaPasoUno={setInternaPasoUno}
            />
          )}
        </>
      )}
    </>
  );
}

export default MainCorrespondencia;
