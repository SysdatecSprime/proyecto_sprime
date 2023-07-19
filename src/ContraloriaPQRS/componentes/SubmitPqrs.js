import Position from "./Progress";
import React, {useState, useEffect} from "react";
import Register from "./RegisterView";
import Request from "./RequestView";
import DragAndDrop from "./DragAndDrop";
import {pqrsBaseUrl} from "../utils/UrlBase";
import {emailBaseUrl, adminUrl} from "../utils/UrlBase";
import {Mensaje, MensajeError, MensajeVerificacion} from "./Mensajes";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import sendEmail from "../utils/sendEmail";

function SubmitPqrs() {
  /* const [validated, setValidated] = useState(false);
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    }; */
  const [captchaValido, cambiarCaptchaValido] = useState(null);
  const [usuarioValido, cambiarUsuarioValido] = useState(false);

  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);
  const [formFields, setFormFields] = useState({
    email: "",
    cellPhone: "",
    answerOption: "2",
    isAnonymus: false,
    verificationCode: "",
    sendingVerificationCode: false,
    verifyingCode: false,
    applicantType: "",
    docType: "",
    identification: "",
    firstName: "",
    lastName: "",
    businessName: "",
    occupation: "",
    country: "",
    city: "",
    department: "",
    address: "",
    applicationType: "",
    applicationDescription: "",
    year: "",
    attachmentFile: "",
    sendingApplication: false,
    entityInvolved: ""
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (formFields.department) {
      getCitiesByDepartment(formFields.department);
    }
  }, [formFields.department]);

  useEffect(() => {
    if (formFields.country) {
      getDepartments(formFields.country);
      getCitiesByCountry(formFields.country);
    }
  }, [formFields.country]);

  const getCountries = async () => {
    const countriesProm = await fetch(`${adminUrl}/Conf_Country`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const respCountries = await countriesProm.json();
    if (countriesProm.ok) {
      setFormFields({...formFields, country: "49"});
      setCountries(respCountries);
    }
  };

  const getDepartments = async (idCountry) => {
    const departmentsProm = await fetch(
      `${adminUrl}/Conf_Departament/ByCountry/${idCountry}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const respDepartments = await departmentsProm.json();
    if (departmentsProm.ok) {
      setDepartments(respDepartments);
    }
  };

  const getCitiesByDepartment = async (idDepartment) => {
    const citiesProm = await fetch(
      `${adminUrl}/Conf_City/ByDepart/${idDepartment}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const respCities = await citiesProm.json();
    if (citiesProm.ok) {
      setCities(respCities);
    }
  };

  const getCitiesByCountry = async (idCountry) => {
    const citiesProm = await fetch(
      `${adminUrl}/Conf_City/ByCountry/${idCountry}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const respCities = await citiesProm.json();
    if (citiesProm.ok) {
      setCities(respCities);
    }
  };

  const handleChange = (event) => {
    if (
      event.target.name === "verificationCode" &&
      event.target.value.length > 6
    )
      return;
    setFormFields({
      ...formFields,
      [event.target.name]:
        event.target.value === "false"
          ? true
          : event.target.value === "true"
          ? false
          : event.target.value
    });
    if (
      event.target.name === "verificationCode" &&
      event.target.value.length === 6
    ) {
      verifyCode(event.target.value);
    }
  };
  const handleSubmitPqrs = async (event, documentos) => {
    const documentosResueltos = await documentos;

    try {
      event.preventDefault();
      event.stopPropagation();
      setFormFields({...formFields, sendingApplication: true});
      const {
        email,
        applicantType,
        docType,
        identification,
        firstName,
        lastName,
        country,
        city,
        department,
        address,
        applicationType,
        year,
        applicationDescription,
        cellPhone,
        isAnonymus,
        answerOption,
        entityInvolved,
        occupation
      } = formFields;
      var date = new Date();
      const offset = date.getTimezoneOffset();
      var nowDate = new Date(date.getTime() - offset * 60 * 1000);

      let body = JSON.stringify({
        fechaDocumento: nowDate.toISOString().substring(0, 10),
        numeroRadicacion: "",
        medioRespuesta: answerOption,
        // numeroRadicadoEntrada: "0",
        fechaRadicacion: nowDate.toISOString().substring(0, 10),
        areaReceptoraSprime: {
          codParametro: "",
          nombreParametro: ""
        },
        serieSprime: {
          codigoSerie: "",
          nombreSerie: "Derechos de petición de interés general o particular"
        },
        tipologiaSprime: {
          codigoTipoDocumento: "",
          nombreTipoDocumento: "Derecho de petición y anexos"
        },
        receptorSprime: {
          nombrePersona: "",
          usuarioPersona: "participacion",
          cargoPersona: "Radicador e indexador"
        },
        tipoRadicacion: applicationType,
        tipoDocumento: "Documento General",
        areaDestinoSprime: {
          codParametro: "",
          nombreParametro: "Secretaria General"
        },
        destinatarioSprime: {
          nombrePersona: "",
          usuarioPersona: "participacion",
          cargoPersona: ""
        },
        areaRemitenteSprime: {
          codParametro: "",
          nombreParametro: ""
        },
        remitenteSprime: {
          nombrePersona: isAnonymus ? "ANONIMO" : firstName + " " + lastName,
          usuarioPersona: isAnonymus ? "ANONIMO" : "SA",
          cargoPersona: isAnonymus ? "ANONIMO" : "FUNCIONARIO PUBLICO"
        },
        correoRemitente: isAnonymus ? "Anonimo" : email,
        celRemitente: isAnonymus ? "0000000" : cellPhone,
        direccionRemitente: isAnonymus ? "Anonimo" : address,
        numeroOrigen: "",
        canal: "WEB",
        unidadConservacion: "",
        recorrido: "",
        numeroFolios: "",
        descripcionAnexos: "NA",
        asunto: applicationDescription,
        codCountry: country,
        codDepartamento: department,
        departamento: "",
        codMunicipio: city,
        tipoDocumento: docType,
        occupation,
        numeroDocumento: `${identification.replace(".", "").replace("-", "")}`,
        municipio: "",
        foliosAnexos: "0",
        observacion: `Año de los hechos: ${year}\nDescripción: ${applicationDescription}\n${
          applicationType === "102"
            ? `Entidad Involucrada: ${entityInvolved}`
            : ""
        }`,
        documentoSprime: documentosResueltos,
        metadatoSprime: [
          {
            nombreMetadato: "",
            valorMetadato: ""
          }
        ]
      });
      console.log(body);

      const requestProm = await fetch(`${pqrsBaseUrl}/Sprime`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      });
      // console.log();
      let requestRes = await requestProm.json();

      // console.log(requestRes.numeroRadicacion);

      // console.log(
      //   formFields.isAnonymus ? "ANONIMO" : firstName + " " + lastName
      // );

      if (requestProm.ok) {
        sendEmail(
          "",
          email,
          `Petición Recibida - Radicado No. ${requestRes.numeroRadicacion}`,
          `Señor(a)
        ${formFields.isAnonymus ? "ANONIMO" : firstName + " " + lastName}
        ${email}

        Respetado Señor(a):

        Reciba un cordial saludo de la Contraloría Departamental del Valle del Cauca .

        Su petición ha sido recibida bajo el número de radicado ${
          requestRes.numeroRadicacion
        } y se encuentra en proceso de
        respuesta en los términos de la normatividad legal vigente.

        Por favor NO RESPONDER el presente correo electrónico.

        Atentamente,

        Coordinación de Gestión Administrativa Ventanilla Única`
        );
        Swal.fire({
          title: `Radicado N°${requestRes.numeroRadicacion}`,
          text: "Solicitud Cargada con EXITO",
          icon: "success",
          confirmButtonText: "Consultar Solicitud"
        }).then((result) => {
          navigate(
            `/Contraloria/TablesView?IdRadicado=${requestRes.numeroRadicacion}`
          );
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "No hemos podido cargar tu solicitud, inténtalo más tarde",
          icon: "error",
          confirmButtonText: "aceptar"
        });
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: "Error!",
        text: "No hemos podido cargar tu solicitud, inténtalo más tarde",
        icon: "error",
        confirmButtonText: "aceptar"
      });
    }

    setFormFields({...formFields, sendingApplication: false});
  };

  async function handleSendEmailCode() {
    try {
      const email = formFields.email;
      setFormFields({...formFields, sendingVerificationCode: true});
      const sendCodeProm = await fetch(
        `${emailBaseUrl}/api/Spr_CodeValidator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            /* idCode: 1, */
            code: " ",
            dateGenerated: "2023-03-03",
            expiryDate: "2023-03-03",
            validated: 0,
            active: true
          })
        }
      );
      if (sendCodeProm.ok) {
        Mensaje("");
      } else {
        MensajeError("Ocurrió un error, intenta de nuevo");
      }
    } catch (e) {
      MensajeError("Ocurrió un error, intenta de nuevo");
    }

    setFormFields({...formFields, sendingVerificationCode: false});
  }

  async function verifyCode(verificationCode) {
    setFormFields({...formFields, verifyingCode: true, verificationCode});
    try {
      const verifyCodeProm = await fetch(
        `${emailBaseUrl}/api/Spr_CodeValidator?code=${verificationCode}`,
        {
          method: "GET"
        }
      );
      if (verifyCodeProm.ok) {
        MensajeVerificacion("");
        setIsAuthenticated(true);
        console.log("Verificacion exitosa");
      } else {
        MensajeError("Ocurrió un error, intenta de nuevo");
      }
    } catch (e) {
      MensajeError("Ocurrió un error, intenta de nuevo");
    }

    setFormFields({...formFields, verifyingCode: false, verificationCode});
  }

  function onChangeCaptcha(value) {
    console.log("Captcha value", value);
    if (value) {
      console.log("El usuario no es un robot");
      cambiarUsuarioValido(true);
      cambiarCaptchaValido(true);
    } else {
      console.log("Por favor acepta el captcha");
      cambiarUsuarioValido(false);
      cambiarCaptchaValido(false);
    }
  }
  const isMobile = window.innerWidth < 500;

  return (
    <>
      <div className="container py-5">
        <Position paso={paso} isMobile={isMobile} />
      </div>
      {paso === 1 && (
        <Register
          formFields={formFields}
          isAuthenticated={isAuthenticated}
          handleChange={handleChange}
          setPaso={setPaso}
          handleSendEmailCode={handleSendEmailCode}
          onChangeCaptcha={onChangeCaptcha}
          captchaValido={captchaValido}
          usuarioValido={usuarioValido}
          cambiarCaptchaValido={cambiarCaptchaValido}
          countries={countries}
          departments={departments}
          cities={cities}
        />
      )}
      {paso === 2 && (
        <Request
          formFields={formFields}
          handleChange={handleChange}
          setPaso={setPaso}
        />
      )}
      {paso === 3 && (
        <DragAndDrop
          setPaso={setPaso}
          handleSubmitPqrs={handleSubmitPqrs}
          cargando={formFields.sendingApplication} //Agregamos estado de cargando para mostrar el loader
        />
      )}
    </>
  );
}

export default SubmitPqrs;
