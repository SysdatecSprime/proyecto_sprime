import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import styled, {keyframes} from "styled-components";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Verificador from "./Recaptcha";
import HabeasData from "./Descargables/HabeasData.pdf";
import {BiLoader} from "react-icons/bi";
import ReCAPTCHA from "react-google-recaptcha";

const mediosRespuesta = [
  {label: "Correo Electrónico", value: "2"},
  {label: "Correo Certificado", value: "1"},
  {label: "Otros", value: "1"}
];
const tiposSolicitante = [
  {label: "Persona Natural", value: "Persona Natural"},
  {label: "Persona Jurídica", value: "Persona Juridica"},
  {label: "Niño/Niña", value: "Niño/Niña"},
  {label: "Adolescente", value: "Adolescente"},
  {label: "Apoderado", value: "Apoderado"}
];

const tipoDocumento = [
  {label: "Cédula Ciudadanía", value: "CC"},
  {label: "Cédula Extranjería", value: "CE"},
  {label: "Registro Civil", value: "RC"},
  {label: "Tarjeta de Identidad", value: "TI"},
  {label: "NIT", value: "NIT"},
  {label: "PPT", value: "PPT"}
];

function Register(props) {
  const [validated, setValidated] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    if (isCaptchaValid) {
      if (form.checkValidity() === true) {
        if (props.formFields.usuarioValido) {
          console.log("Entro en Validacion0");
          props.setPaso(2);
        } else {
          if (
            props.formFields.isAnonymus &&
            props.formFields.email.length > 0
          ) {
            console.log("Entro en Validacion");
            props.setPaso(2);
          } else {
            if (
              !props.formFields.isAnonymus &&
              props.formFields.email.length > 0
            ) {
              props.setPaso(2);
            } else {
              props.cambiarCaptchaValido(false);
              console.log("fallo en Validacion");
            }
          }
        }
      }
    } else {
      alert("Por favor, completa el reCAPTCHA.");
    }
  };

  function handleCaptchaChange(value) {
    setIsCaptchaValid(!!value);
  }

  let formFields = props.formFields;

  return (
    <>
      <Form
        noValidate
        validated={validated}
        className="container"
        onSubmit={handleSubmit}
      >
        <Row className="m-3">
          <div className="fs-3 fw-bold">Datos del solicitante</div>
        </Row>
        <Row className="m-3">
          <Form.Group as={Col} md="4" className="p-4">
            <Form.Check
              type="checkbox"
              name="isAnonymus"
              onChange={(e) => props.handleChange(e)}
              value={formFields.isAnonymus}
              label="Solicitud anónima"
              checked={formFields.isAnonymus}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            controlId="validationCustom01"
            className="py-2"
          >
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              name="email"
              onChange={(e) => props.handleChange(e)}
              value={formFields.email}
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
            />
            <Form.Control.Feedback type="invalid">
              Ingresa el correo
            </Form.Control.Feedback>
          </Form.Group>

          {props.formFields.isAnonymus && (
            <Form.Group as={Col} md="4" className="py-2">
              <Form.Label>
                El correo electrónico se solicita únicamente para fines de
                notificación. No será almacenado en nuestra base de datos.
              </Form.Label>
            </Form.Group>
          )}

          {!props.formFields.isAnonymus && (
            <Form.Group as={Col} md="4" className="py-2">
              <Form.Label>Medio de respuesta</Form.Label>
              <Form.Select
                name="answerOption"
                onChange={(e) => props.handleChange(e)}
                value={formFields.answerOption}
                type="text"
              >
                {mediosRespuesta.map((element, index) => {
                  return (
                    <option key={index} value={element.value}>
                      {element.label}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          )}
        </Row>
        <Row className="m-3">
          {!props.formFields.isAnonymus && (
            <>
              <Form.Group as={Col} md="4" className="py-2">
                <Form.Label>Número de teléfono</Form.Label>
                <Form.Control
                  name="cellPhone"
                  onChange={(e) => props.handleChange(e)}
                  value={formFields.cellPhone}
                  type="text"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md="4" className="py-2">
                <Form.Label>Tipo de documento</Form.Label>
                <Form.Select
                  name="docType"
                  onChange={(e) => props.handleChange(e)}
                  value={formFields.docType}
                  type="text"
                >
                  {tipoDocumento.map((element, index) => {
                    return (
                      <option key={index} value={element.value}>
                        {element.label}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="4" className="py-2">
                <Form.Label>Número de documento</Form.Label>
                <Form.Control
                  name="identification"
                  onChange={(e) => props.handleChange(e)}
                  value={formFields.identification}
                  type="text"
                  required
                />
              </Form.Group>
            </>
          )}
        </Row>

        {/*<Row className="m-3">
           {!props.formFields.isAnonymus && (
            <>
              <Form.Group
                as={Col}
                md="4"
                className="py-2 d-flex justify-content-center">
                <Button
                  onClick={() => props.handleSendEmailCode()}
                  className="boton-next"
                  disabled={props.formFields.sendingVerificationCode}>
                  {props.formFields.sendingVerificationCode ? (
                    <RotatingDiv className="mx-auto">
                      <BiLoader />
                    </RotatingDiv>
                  ) : (
                    <span>Enviar código</span>
                  )}
                </Button>
              </Form.Group>
              {!props.formFields.verifyingCode ? (
                <Form.Group as={Col} md="4" className="py-2">
                  <Form.Label>Código de verificación</Form.Label>
                  <Form.Control
                    name="verificationCode"
                    onChange={e => props.handleChange(e)}
                    value={formFields.verificationCode}
                    type="text"
                    maxLength="6"
                  />
                </Form.Group>
              ) : (
                <Spinner />
              )}
            </>
          )} 
          <Form.Group
            as={Col}
            md="4"
            className="py-2 d-flex justify-content-center">
            <Verificador onChangeCaptcha={props.onChangeCaptcha} />
            {props.captchaValido === false && (
              <div className="error-captcha">Por favor acepta el captcha</div>
            )}
          </Form.Group>
        </Row>*/}

        {!props.formFields.isAnonymus && (
          <>
            <Row className="m-3">
              <Form.Group as={Col} md="4" className="py-2">
                <Form.Label>Tipo de solicitante</Form.Label>
                <Form.Select
                  name="applicantType"
                  onChange={(e) => props.handleChange(e)}
                  value={formFields.applicantType}
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
              <Form.Group as={Col} md="4" className="py-2">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="firstName"
                  onChange={(e) => props.handleChange(e)}
                  value={formFields.firstName}
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="4" className="py-2">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  name="lastName"
                  onChange={(e) => props.handleChange(e)}
                  value={formFields.lastName}
                  type="text"
                  required
                />
              </Form.Group>
            </Row>

            <Row className="m-3">
              {formFields.applicantType === "Persona Juridica" && (
                <Form.Group as={Col} md="6" className="py-2">
                  <Form.Label>Razón social</Form.Label>
                  <Form.Control
                    name="businessName"
                    onChange={(e) => props.handleChange(e)}
                    value={formFields.businessName}
                    type="text"
                    required
                  />
                </Form.Group>
              )}
              {/*TODO Registrar en Sprime */}
              <Form.Group as={Col} md="6" className="py-2">
                <Form.Label>Ocupación</Form.Label>
                <Form.Control
                  name="occupation"
                  onChange={(e) => props.handleChange(e)}
                  value={formFields.occupation}
                  type="text"
                  required
                />
              </Form.Group>
            </Row>
            <Row className="m-3">
              {props.countries && (
                <Form.Group as={Col} md="4" className="py-2">
                  <Form.Label>País</Form.Label>
                  <Form.Select
                    name="country"
                    onChange={(e) => props.handleChange(e)}
                    value={formFields.country}
                    type="text"
                  >
                    <option value={"0"}>País</option>;
                    {props.countries.map((element, index) => {
                      return (
                        <option key={index} value={element.idCountry}>
                          {element.countryDesc}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              )}
              {props.departments && (
                <Form.Group as={Col} md="4" className="py-2">
                  <Form.Label>Departamento</Form.Label>
                  <Form.Select
                    name="department"
                    onChange={(e) => props.handleChange(e)}
                    value={formFields.department}
                    type="text"
                  >
                    <option value={"0"}>Departamento</option>;
                    {props.departments.map((element, index) => {
                      return (
                        <option key={index} value={element.idDepart}>
                          {element.departDesc}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              )}
              {props.cities && (
                <Form.Group as={Col} md="4" className="py-2">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Select
                    name="city"
                    onChange={(e) => props.handleChange(e)}
                    value={formFields.city}
                    type="text"
                    required
                  >
                    <option value={"0"}>Ciudad</option>;
                    {props.cities.map((element, index) => {
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
            <Row className="m-3">
              <Form.Group as={Col} md="8" className="py-2">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  name="address"
                  onChange={(e) => props.handleChange(e)}
                  value={formFields.address}
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                className="d-flex align-items-end py-2"
              >
                <div className="d-flex justify-content-center">
                  <Form.Check
                    label=""
                    className="d-flex align-items-center"
                    required
                  />
                  <Button variant="link" href={HabeasData} download>
                    Acepto manejo de datos personales
                  </Button>
                </div>
              </Form.Group>
            </Row>
          </>
        )}

        <Row className="mb-5 d-flex justify-content-between">
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
          <Form.Group as={Col} md="4" className="d-flex justify-content-center">
            <Button type="Submit" className="boton-next">
              Siguiente
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
}

export default Register;

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
