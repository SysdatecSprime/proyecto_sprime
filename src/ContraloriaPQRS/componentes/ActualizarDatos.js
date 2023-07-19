import React, {useState, useEffect} from "react";
import {adminUrl, emailBaseUrl} from "../utils/UrlBase";
import {Button, Row, Form, Col, Spinner} from "react-bootstrap";
import Verificador from "./Recaptcha";
import {
  Mensaje,
  MensajeError,
  MensajeExito,
  MensajeVerificacion
} from "./Mensajes";
import Swal from "sweetalert2";
import {BiLoader} from "react-icons/bi";
import styled, {keyframes} from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import {useNavigate} from "react-router-dom";

const tiposDocumento = [
  {label: "Cédula Ciudadanía", value: "CC"},
  {label: "Cédula Extranjería", value: "CE"},
  {label: "Registro Civil", value: "RC"},
  {label: "Tarjeta de Identidad", value: "TI"},
  {label: "NIT", value: "NIT"},
  {label: "PPT", value: "PPT"}
];

const tiposSolicitante = [
  {label: "Persona Natural", value: "1"},
  {label: "Persona Jurídica", value: "2"},
  {label: "Niño/Niña", value: "3"},
  {label: "Adolescente", value: "4"},
  {label: "Apoderado", value: "5"}
];

function ActualizarInfo(props) {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const [actualizandoUsuario, setActualizandoUsuario] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [documento, setDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("CC");
  const [email, setEmail] = useState("");
  const [fixedEmail, setFixedEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [validandoCodigo, setValidandoCodigo] = useState(false);
  const [enviandoCodigo, setEnviandoCodigo] = useState(false);
  const [formularioActualizacion, setFormularioActualizacion] = useState({
    address: "",
    idContact: 0,
    codeContact: "",
    idCountry: 0,
    idDepartament: 0,
    idCity: 0,
    idRequesterType: 0,
    name: "",
    lastName: "",
    occupation: "",
    legalName: ""
  });
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);

  const [nombre, setNombre] = useState("");

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (formularioActualizacion.departamento) {
      getCitiesByDepartment(formularioActualizacion.departamento);
    }
  }, [formularioActualizacion.departamento]);

  useEffect(() => {
    if (formularioActualizacion.pais) {
      getDepartments(formularioActualizacion.pais);
      getCitiesByCountry(formularioActualizacion.pais);
    }
  }, [formularioActualizacion.pais]);

  const getCountries = async () => {
    const countriesProm = await fetch(`${adminUrl}/Conf_Country`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const respCountries = await countriesProm.json();
    if (countriesProm.ok) {
      setFormularioActualizacion({...formularioActualizacion, pais: "49"});
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

  async function consultarDocumentoRegistrado() {
    if (documento.length >= 6) {
      try {
        const verifyCodeProm = await fetch(
          `${emailBaseUrl}/api/WF_Contact/BusquedaCedula/${documento}`,
          {
            method: "GET"
          }
        );

        const respDatosClienteActualizar = await verifyCodeProm.json();
        console.log(respDatosClienteActualizar);
        if (verifyCodeProm.ok) {
          console.log(
            "Que me acuerde de mirar estos datos: ",
            respDatosClienteActualizar
          );
          setEmail(respDatosClienteActualizar.email);

          setNombre(respDatosClienteActualizar.nombre);
          MensajeVerificacion("");
          /* setIsAuthenticated(true);*/
          console.log("Documento Consultado con exito");
          return true;
        } else {
          setEmail("");
          MensajeError(
            "Ocurrió un error al verificar el documento, intenta de nuevo"
          );
          return false;
        }
      } catch (e) {
        MensajeError(
          "Ocurrió un error al verificar el documento, intenta de nuevo"
        );
        return false;
      }
    }
  }

  async function actualizarDatosRegistrado() {
    if (documento.length >= 6) {
      try {
        const verifyCodeProm = await fetch(
          `${emailBaseUrl}/api/WF_Contact/Contacts/Email={Email}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              idContact: 0,
              codeContact: "string",
              idCountry: 0,
              idDepartament: 0,
              idCity: 0,
              idRequesterType: 0,
              idIdentificType: 0,
              name: nombre,
              lastName: "string",
              numberDoc: "string",
              email: "string",
              phone: "string",
              occupation: "string"
            })
          }
        );
        if (verifyCodeProm.ok) {
          Mensaje("");
        } else {
          MensajeError("Ocurrió un error, intenta de nuevo");
        }

        const respDatosClienteActualizar = await verifyCodeProm.json();

        if (verifyCodeProm.ok) {
          console.log(
            "Que me acuerde de mirar estos datos: ",
            respDatosClienteActualizar
          );
          setEmail(respDatosClienteActualizar.email);
          setNombre(respDatosClienteActualizar.nombre);
          MensajeVerificacion("");
          /* setIsAuthenticated(true); */
          console.log("Correo Consultado con exito");
        } else {
          setEmail("");
        }
      } catch (e) {
        /* MensajeError("Ocurrió un error, intenta de nuevo"); */
        setEmail("No se encontró email");
      }
    }
  }

  async function handleSendEmailCode() {
    setEnviandoCodigo(true);
    try {
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
        Mensaje(
          "Un código de verificación ha sido enviado a tu correo, ingrésalo en el campo de verificación"
        );
        setCodigoEnviado(true);
      } else {
        MensajeError(
          "Ocurrió un error al enviar el código de verificación, intenta de nuevo"
        );
      }
    } catch (e) {
      MensajeError(
        "Ocurrió un error al enviar el código de verificación, intenta de nuevo"
      );
    } finally {
      setEnviandoCodigo(false);
    }
  }

  async function verifyCode(cod) {
    if (cod.length === 6) {
      setValidandoCodigo(true);
      try {
        const verifyCodeProm = await fetch(
          `${emailBaseUrl}/api/Spr_CodeValidator?code=${cod}`,
          {
            method: "GET"
          }
        );
        const verifyCodeResp = await verifyCodeProm.json();
        if (verifyCodeProm.ok) {
          //Obtener usuario
          const respUsuario = await fetch(
            `${emailBaseUrl}/api/WF_Contact/BusquedaEmail/${verifyCodeResp.email}`,
            {
              method: "GET"
            }
          );
          const respUsuarioJson = await respUsuario.json();
          if (respUsuario.ok) {
            setFixedEmail(verifyCodeResp.email);
            setFormularioActualizacion({
              idContact: respUsuarioJson.idContact,
              codeContact: respUsuarioJson.codeContact,
              idCountry: respUsuarioJson.idCountry,
              idDepartament: respUsuarioJson.idDepartament,
              idCity: respUsuarioJson.idCity,
              idRequesterType: respUsuarioJson.idRequesterType,
              name: respUsuarioJson.name,
              lastName: respUsuarioJson.lastName,
              occupation: respUsuarioJson.occupation,
              address: respUsuarioJson.address,
              legalName: respUsuarioJson.legalName
            });
            setDocumento(respUsuarioJson.numberDoc);
            setTipoDocumento(respUsuarioJson.idIdentificType);
            MensajeVerificacion("Código validado con éxito");
            setIsAuthenticated(true);
          } else {
            MensajeError("Error validando el código");
          }
        } else {
          MensajeError("Error validando el código");
        }
      } catch (e) {
        console.log(e);
        MensajeError("Error validando el código");
      } finally {
        setValidandoCodigo(false);
      }
    }
  }

  async function ActualizarDatos() {
    setActualizandoUsuario(true);
    try {
      const sendCodeProm = await fetch(
        `${emailBaseUrl}/api/WF_Contact/${formularioActualizacion.idContact}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idContact: formularioActualizacion.idContact,
            codeContact: formularioActualizacion.codeContact,
            idCountry: formularioActualizacion.idCountry,
            idDepartament: formularioActualizacion.idDepartament,
            idCity: formularioActualizacion.idCity,
            idRequesterType: formularioActualizacion.idRequesterType,
            idIdentificType: tipoDocumento,
            name: formularioActualizacion.name,
            lastName: formularioActualizacion.lastName,
            numberDoc: documento,
            occupation: formularioActualizacion.occupation,
            email: fixedEmail,
            legalName: formularioActualizacion.legalName,
            address: formularioActualizacion.address
          })
        }
      );
      if (sendCodeProm.ok) {
        Swal.fire({
          title: `¡Éxito!`,
          text: "Información Actualizada con éxito",
          icon: "success",
          confirmButtonText: "Aceptar"
        }).then((result) => {
          navigate(`/Contraloria`);
        });
      } else {
        MensajeError("Error al actualizar la información");
      }
    } catch (e) {
      MensajeError("Error al actualizar la información");
    } finally {
      setActualizandoUsuario(false);
    }
  }

  function handleCaptchaChange(value) {
    setIsCaptchaValid(!!value);
  }

  function handleFormChange(event) {
    const {name, value} = event.target;
    setFormularioActualizacion({...formularioActualizacion, [name]: value});
  }

  return (
    <Form noValidate validated={validated} className="container">
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Tipo de documento</Form.Label>
          <Form.Select
            name="docType"
            onChange={(e) => setTipoDocumento(e.target.value)}
            value={tipoDocumento}
            type="text"
          >
            {tiposDocumento.map((element, index) => {
              return (
                <option key={index} value={element.value}>
                  {element.label}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Número de documento</Form.Label>
          <Form.Control
            name="documentocliente"
            value={documento}
            onChange={(e) => {
              setDocumento(e.target.value);
            }}
            type="text"
            maxLength="10"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group
          as={Col}
          md="4"
          controlId="validationCustom01"
          className="py-2 d-flex justify-content-center"
        >
          <Button
            onClick={handleSendEmailCode}
            style={{
              backgroundColor: "#0856af"
            }}
          >
            {enviandoCodigo ? <Spinner size="sm" /> : "Enviar código"}
          </Button>
        </Form.Group>
        {validandoCodigo ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Código de verificación</Form.Label>
            <Form.Control
              name="verificationCode"
              onChange={(e) => verifyCode(e.target.value)}
              type="text"
              maxLength="6"
            />
          </Form.Group>
        )}
        <Form.Group
          as={Col}
          md="8"
          className="d-flex justify-content-start px-5"
        >
          <ReCAPTCHA
            sitekey="6LdZ68AmAAAAAMcGXzUo5IDcSqxHX5UJOc-zuoiq"
            onChange={handleCaptchaChange}
          />
        </Form.Group>
      </Row>
      {isAuthenticated && (
        <>
          <hr />
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Tipo de solicitante</Form.Label>
              <Form.Select
                name="idRequesterType"
                onChange={handleFormChange}
                value={formularioActualizacion.idRequesterType}
                type="text"
                id="validationCustom1"
                required
              >
                {tiposSolicitante.map((element, index) => {
                  return (
                    <option key={index} value={element.value}>
                      {element.label}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Nombre(s)</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                placeholder=""
                value={formularioActualizacion.name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Apellido(s)</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=""
                name="lastName"
                value={formularioActualizacion.lastName}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {(formularioActualizacion.idRequesterType === "2" ||
              formularioActualizacion.idRequesterType === "3" ||
              formularioActualizacion.idRequesterType === "4") && (
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Razón social</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder=""
                  name="legalName"
                  value={formularioActualizacion.legalName}
                  onChange={handleFormChange}
                />
              </Form.Group>
            )}
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Ocupación</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=""
                name="occupation"
                value={formularioActualizacion.occupation}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {countries.length > 0 && (
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>País</Form.Label>
                <Form.Select
                  required
                  type="text"
                  placeholder=""
                  value={formularioActualizacion.idCountry}
                  onChange={handleFormChange}
                  name="idCountry"
                >
                  <option value={"0"}>País</option>;
                  {countries.map((element, index) => {
                    return (
                      <option key={index} value={element.idCountry}>
                        {element.countryDesc}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            )}
            {departments.length > 0 && (
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Departamento</Form.Label>
                <Form.Select
                  required
                  type="text"
                  name="idDepartament"
                  placeholder=""
                  value={formularioActualizacion.idDepartament}
                  onChange={handleFormChange}
                >
                  <option value={"0"}>Departamento</option>;
                  {departments.map((element, index) => {
                    return (
                      <option key={index} value={element.idDepart}>
                        {element.departDesc}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            )}
            {cities.length > 0 && (
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Ciudad</Form.Label>
                <Form.Select
                  required
                  name="idCity"
                  type="text"
                  placeholder=""
                  value={formularioActualizacion.idCity}
                  onChange={handleFormChange}
                >
                  <option value={"0"}>Ciudad</option>
                  {cities.map((element, index) => {
                    return (
                      <option key={index} value={element.idCity}>
                        {element.cityDesc}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            )}
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="8" controlId="validationCustom01">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder=""
                value={formularioActualizacion.address}
                onChange={handleFormChange}
                name="address"
              />
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustom01"
              className="pt-2 d-flex justify-content-center"
            >
              <Button
                onClick={() => {
                  if (!actualizandoUsuario) {
                    ActualizarDatos();
                  }
                }}
                style={{
                  backgroundColor: "#0856af"
                }}
              >
                {" "}
                {actualizandoUsuario ? (
                  <Spinner animation="border" color="white" size="sm" />
                ) : (
                  "Actualizar"
                )}
              </Button>
            </Form.Group>
          </Row>
        </>
      )}
    </Form>
  );
}

export default ActualizarInfo;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatingDiv = styled.div`
  animation: ${rotate} 2s linear infinite;
`;
