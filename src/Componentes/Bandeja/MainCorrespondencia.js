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
      });
    } else if (name === "IdMailClass") {
      setFormFields({
        ...formFields,
        IdMailClass: value.id,
        MailClassName: value.name,
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
    ResponDesc: "MANUEL.CASTILLO",
    ConsecAnual: "0",
    IdUser: 0,
    IdMailClass: "1",
    MailClassName: "",
    IdDependence: "1",
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
    SenderName: "Edberg",
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
    EmailSender: "MANUEL@SYSDATEC.COM",
    EmailSend: "0",
    DateIn: "20230511",
    ShippingDate: "20230511",
    DueDate: new Date(Date.now()).toDateString(),
    CreatedBy: "1",
    CreationDate: "20230511",
    UpdatedBy: "1",
    UpdateDate: "20230511",
    IsTemporal: false,
    Files: [],
  });

  async function CrearRecibida(TipoCorreo) {
    console.log("acaba de entrar aqui");
    const recibidoProm = await fetch(
      `${dataBandeja}/Radicados/rec/InsertReceivedMail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CodeReceivMail: "20230002250",
          ResponDesc: "MANUEL.CASTILLO",
          ConsecAnual: "0",
          IdUserName: "1",
          IdMailClass: "1",
          IdDependence: formFields.IdDependence,
          IdTypification: "1",
          IdTipology: "1",
          IdSerie: "1",
          IdMailStatus: "1",
          IdFile: "0",
          IdCountry: "1",
          IdCity: "1",
          IdCompany: "1",
          IdBusiness: "1",
          IdRespMed: "1",
          IdDeliveryType: "1",
          IdCopyDocSent: "1",
          IdPriority: formFields.IdPriority,
          IdIdentificType: "1",
          DocNumber: "123",
          IdOriginExter: "1",
          IdFlow: "1",
          IdMailUpdate: "1",
          Subject: formFields.Subject,
          Attachment: "-",
          Observations: formFields.Observations,
          SenderName: "Edberg",
          Active: "1",
          Read: "0",
          NoFlow: "0",
          ReqAnswer: "0",
          NroFolios: "0",
          NroCopiesRot: "1",
          ContactSends: "CIUDADANO",
          AddressSends: "BOGOTA DC",
          NroComunication: "0",
          Phone: "3118918011",
          EmailSender: "MANUEL@SYSDATEC.COM",
          EmailSend: "0",
          DateIn: "20230511",
          ShippingDate: "20230511",
          CreatedBy: "1",
          CreationDate: "20230511",
          UpdatedBy: "1",
          UpdateDate: "20230511",
        }),
      }
    );

    const respRecibido = await recibidoProm.json();

    if (recibidoProm.ok) {
      setRecibido(respRecibido.Recibido);
    }
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
