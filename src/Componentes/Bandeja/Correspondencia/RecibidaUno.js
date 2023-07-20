import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

import Position from "./Position";
import {
  Grid,
  Col,
  TextInput,
  Flex,
  Title,
  Subtitle,
  Button,
  SelectBox,
  SelectBoxItem,
  DateRangePicker,
  DateRangePickerValue,
} from "@tremor/react";
import { es } from "date-fns/locale";
import { dataBandeja, adminUrl } from "../UrlBase";
import axios from "axios";

const tiposSolicitante = [
  { label: "Persona Natural", value: "Persona Natural" },
  { label: "Persona Jurídica", value: "Persona Juridica" },
  { label: "Niño/Niña", value: "Niño/Niña" },
  { label: "Adolescente", value: "Adolescente" },
  { label: "Apoderado", value: "Apoderado" },
  { label: "Anónimo", value: "Anonimo" },
];

const tiposDocumento = [
  { label: "Cédula Ciudadanía", value: "CC" },
  { label: "Cédula Extranjería", value: "CE" },
  { label: "Registro Civil", value: "RC" },
  { label: "Tarjeta de Identidad", value: "TI" },
  { label: "NIT", value: "NIT" },
  { label: "PPT", value: "PPT" },
];

const mediosRespuesta = [
  { label: "Correo Electrónico", value: "2" },
  { label: "Correo Certificado", value: "1" },
  { label: "Otros", value: "1" },
];
function RecibidaUno(props) {
  const [prioridad, setPrioridad] = useState([]);
  const [usuarioDp, setUsuarioDp] = useState([]);
  const [empresa, setEmpresa] = useState([]);
  const [tipificacion, setTipificacion] = useState([]);
  const [classCorrespondencia, setClassCorrespondencia] = useState([]);
  const [negocio, setNegocio] = useState([]);
  const [grupo, setGrupo] = useState([]);
  const [contacto, setContacto] = useState([]);
  const [medioRecepcion, setMedioRecepcion] = useState([]);
  const [validated, setValidated] = useState(false);
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (props.formFields.IdDepartment) {
      getCitiesByDepartment(props.formFields.IdDepartment);
    }
  }, [props.formFields.IdDepartment]);

  useEffect(() => {
    if (props.formFields.IdCountry) {
      getDepartments(props.formFields.IdCountry);
      getCitiesByCountry(props.formFields.IdCountry);
    }
  }, [props.formFields.IdCountry]);

  useEffect(() => {
    obtenerPrioridad();
    obtenerUsuarioDp();
    obtenerEmpresa();
    obtenerTipificacion();
    obtenerClassCorrespondencia();
    obtenerNegocio();
    obtenerGrupo();
    obtenerContacto();
    obtenerMedioRecepcion();
    getCountries();
  }, []);

  const getCountries = async () => {
    const countriesProm = await fetch(`${adminUrl}/Conf_Country`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const respCountries = await countriesProm.json();
    if (countriesProm.ok) {
      setCountries(respCountries);
    }
  };

  const getDepartments = async (idCountry) => {
    const departmentsProm = await fetch(
      `${adminUrl}/Conf_Departament/ByCountry/${idCountry}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
          "Content-Type": "application/json",
        },
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
          "Content-Type": "application/json",
        },
      }
    );
    const respCities = await citiesProm.json();
    if (citiesProm.ok) {
      setCities(respCities);
    }
  };

  //llamado a prioridad
  const obtenerPrioridad = async () => {
    try {
      const prioridadProm = await fetch(
        `${dataBandeja}/SPRIMESERVICES/WsWf/api/WF_Priority`,
        {
          method: "GET",
        }
      );
      const respPrioridad = await prioridadProm.json();
      console.log(respPrioridad);
      if (prioridadProm.ok) {
        setPrioridad(respPrioridad);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //llamado a Usuario con Dependencia
  const obtenerUsuarioDp = async () => {
    try {
      const usuarioDpProm = await fetch(
        `${dataBandeja}/Configs/UserDep/GetUserDeps`,
        {
          method: "GET",
        }
      );
      const respUsuarioDp = await usuarioDpProm.json();
      if (usuarioDpProm.ok) {
        setUsuarioDp(respUsuarioDp);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //llamado a Empresas
  const obtenerEmpresa = async () => {
    try {
      const empresaProm = await fetch(
        `${dataBandeja}/Configs/Bussiness/GetBussiness`,
        {
          method: "GET",
        }
      );
      const respEmpresa = await empresaProm.json();
      console.log(respEmpresa);
      if (empresaProm.ok) {
        setEmpresa(respEmpresa);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //llamado a Tipificacion
  const obtenerTipificacion = async () => {
    try {
      const tipificacionProm = await fetch(
        `${dataBandeja}/SPRIMESERVICES/WsWf/api/WF_Typification`,
        {
          method: "GET",
        }
      );
      const respTipificacion = await tipificacionProm.json();
      console.log(respTipificacion);
      if (tipificacionProm.ok) {
        setTipificacion(respTipificacion);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //llamado a Clase de correspondencia
  const obtenerClassCorrespondencia = async () => {
    try {
      const classCorrespondenciaProm = await fetch(
        `${dataBandeja}/SPRIMESERVICES/WsWf/api/WF_MailClass`,
        {
          method: "GET",
        }
      );
      const respClassCorrespondencia = await classCorrespondenciaProm.json();
      console.log(respClassCorrespondencia);
      if (classCorrespondenciaProm.ok) {
        setClassCorrespondencia(respClassCorrespondencia);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //llamado a Negocios
  const obtenerNegocio = async () => {
    try {
      const negocioProm = await fetch(
        `${dataBandeja}/Configs/Company/GetCompany`,
        {
          method: "GET",
        }
      );
      const respNegocio = await negocioProm.json();
      console.log(respNegocio);
      if (negocioProm.ok) {
        setNegocio(respNegocio);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //llamado a Grupos
  const obtenerGrupo = async () => {
    try {
      const grupoProm = await fetch(
        `${dataBandeja}/SPRIMESERVICES/WsWf/api/WF_MailGroup`,
        {
          method: "GET",
        }
      );
      const respGrupo = await grupoProm.json();
      if (grupoProm.ok) {
        setGrupo(respGrupo);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //llamado a Contacto
  const obtenerContacto = async () => {
    try {
      const contactoProm = await fetch(
        `${dataBandeja}/SPRIMESERVICES/WsWf/api/WF_Contact`,
        {
          method: "GET",
        }
      );
      const respContacto = await contactoProm.json();
      console.log(respContacto);
      if (contactoProm.ok) {
        setContacto(respContacto);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //llamado a Medio de recepción
  const obtenerMedioRecepcion = async () => {
    try {
      const medioRecepcionProm = await fetch(
        `${dataBandeja}/SPRIMESERVICES/WsWf/api/WF_ReceptionMedium`,
        {
          method: "GET",
        }
      );
      const respMedioRecepcion = await medioRecepcionProm.json();
      console.log(respMedioRecepcion);
      if (medioRecepcionProm.ok) {
        setMedioRecepcion(respMedioRecepcion);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Grid numCols={1} numColsSm={2} numColsLg={4} className="gap-2">
        <Col numColSpan={1} numColSpanLg={3} className="mt-5">
          <div>
            <Position
              paso={props.paso}
              setPaso={(paso) => props.setRecibidoPasoUno(paso)}
            />
          </div>
        </Col>
        <Col numColSpan={1} numColSpanLg={1} className="mt-2">
          <Flex className="gap-2">
            <Title>Fecha:</Title>
            <DateRangePicker
              className="max-w-md mx-auto"
              value={[new Date(), new Date()]}
              enableDropdown={false}
              enableClear={false}
              disabled={true}
            />
          </Flex>
          <Flex className="gap-2">
            <Title>Fecha de vencimiento:</Title>
            <DateRangePicker
              className="max-w-md mx-auto"
              value={[
                new Date(props.formFields.DueDate),
                new Date(props.formFields.DueDate),
              ]}
              onValueChange={(e) => {
                props.handleDirectChange("DueDate", e[0]);
              }}
              enableDropdown={false}
              enableClear={false}
            />
          </Flex>
          <Flex className="gap-2">
            <Title>Prioridad:</Title>
            <SelectBox
              className="my-1 ms-3"
              name="IdPriority"
              onValueChange={(e) => props.handleDirectChange("IdPriority", e)}
              value={props.formFields.IdPriority}
            >
              {prioridad.map((element, index) => {
                return (
                  <SelectBoxItem
                    key={index}
                    text={element.priorityDesc}
                    value={element.idPriority}
                  />
                );
              })}
            </SelectBox>
          </Flex>
          <Flex className="gap-2">
            <Form.Check
              type="checkbox"
              label="Correspondencia temporal"
              name="IsTemporal"
              checked={props.formFields.IsTemporal}
              onChange={(e) => {
                props.handleDirectChange("IsTemporal", e.target.checked);
              }}
            />
          </Flex>
        </Col>
      </Grid>
      <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
        <Grid numCols={1} numColsSm={2} numColsLg={4} className="gap-2">
          <Col numColSpan={1} numColSpanLg={4}>
            <Title>Destinatario</Title>
          </Col>
          <Col numColSpan={1} numColSpanLg={2}>
            <Subtitle>Para:</Subtitle>
            <SelectBox
              className="my-1"
              name="IdUser"
              onValueChange={(e) => {
                props.handleDirectChange("IdUser", {
                  id: e,
                  name: usuarioDp.find((element) => element.IdUser === e)
                    .UserDesc,
                });
              }}
              value={props.formFields.IdUser}
            >
              {usuarioDp.map((element, index) => {
                console.log(element);
                return (
                  <SelectBoxItem
                    key={index}
                    value={element.IdUser}
                    text={element.UserDesc}
                  />
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={2}>
            <Subtitle>Dependencia:</Subtitle>
            <TextInput
              className="my-1"
              /*  name="IdDependence"
              onChange={e => props.handleChange(e)}
              value={props.formFields.IdDependence} */
              placeholder=""
            />
          </Col>
          <Col numColSpan={1} numColSpanLg={2}>
            <Subtitle>Notificar:</Subtitle>
            <TextInput className="my-1" placeholder="" onChange={(e) => {}} />
          </Col>
        </Grid>
        <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2 mt-3">
          <Col numColSpan={1} numColSpanLg={3}>
            <Title>Detalles de la correspondencia</Title>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Empresa:</Subtitle>
            <SelectBox
              className="my-1"
              name="IdBusiness"
              onValueChange={(e) => props.handleDirectChange("IdBusiness", e)}
              value={props.formFields.IdBusiness}
            >
              {empresa.map((element, index) => {
                return (
                  <SelectBoxItem
                    key={index}
                    value={element.IdBusiness}
                    text={element.BusinessDesc}
                  />
                );
              })}
            </SelectBox>
          </Col>

          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Tipificacion:</Subtitle>
            <SelectBox
              className="my-1"
              name="IdTypification"
              onValueChange={(e) =>
                props.handleDirectChange("IdTypification", e)
              }
              value={props.formFields.IdTypification}
            >
              {tipificacion.map((element, index) => {
                return (
                  <SelectBoxItem
                    key={index}
                    text={element.typificDesc}
                    value={element.idTypification}
                  />
                );
              })}
            </SelectBox>
          </Col>

          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Clase de correspondencia:</Subtitle>
            <SelectBox
              className="my-1"
              name="IdMailClass"
              onValueChange={(e) =>
                props.handleDirectChange("IdMailClass", {
                  id: e,
                  name: classCorrespondencia.find(
                    (element) => element.idMailClass === e
                  ).mailDesc,
                })
              }
              value={props.formFields.IdMailClass}
            >
              {classCorrespondencia.map((element, index) => {
                return (
                  <SelectBoxItem
                    key={index}
                    value={element.idMailClass}
                    text={element.mailDesc}
                  />
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Negocio:</Subtitle>
            <SelectBox
              className="my-1"
              name="IdCompany"
              onValueChange={(e) => props.handleDirectChange("IdCompany", e)}
              value={props.formFields.IdCompany}
            >
              {negocio.map((element, index) => {
                return (
                  <SelectBoxItem
                    key={index}
                    text={element.CompanyDesc}
                    value={element.IdCompany}
                  />
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Grupo:</Subtitle>
            <SelectBox
              className="my-1"
              name="IdGroups"
              onValueChange={(e) => props.handleDirectChange("IdGroups", e)}
              value={props.formFields.IdGroups}
            >
              {grupo.map((element, index) => {
                return (
                  <SelectBoxItem
                    key={index}
                    text={element.groMailDesc}
                    value={element.idMailGroup}
                  />
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Medio de recepción:</Subtitle>
            <SelectBox
              className="my-1"
              name="IdRecMed"
              onValueChange={(e) => props.handleDirectChange("IdRecMed", e)}
              value={props.formFields.IdRecMed}
            >
              {medioRecepcion.map((element, index) => {
                return (
                  <SelectBoxItem
                    key={index}
                    text={element.recMedDesc}
                    value={element.idRecMed}
                  />
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={3}>
            <Subtitle>Asunto (máximo 150 caracteres):</Subtitle>
            <TextInput
              className="my-1"
              name="Subject"
              onChange={(e) => {
                if (e.target.value.length <= 150) {
                  props.handleChange(e);
                }
              }}
              value={props.formFields.Subject}
              placeholder=""
            />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>N° Folio:</Subtitle>
            <TextInput
              className="my-1"
              placeholder=""
              type="number"
              name="NroFolios"
              value={props.formFields.NroFolios}
              onChange={(e) => props.handleChange(e)}
            />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>N° Comunicación:</Subtitle>
            <TextInput
              className="my-1"
              placeholder=""
              name="NroComunication"
              value={props.formFields.NroComunication}
              onChange={(e) => props.handleChange(e)}
            />
          </Col>
        </Grid>
        <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2 mt-3">
          <Col numColSpan={1} numColSpanLg={3}>
            <Title>Remitente</Title>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Tipo de remitente:</Subtitle>
            <SelectBox
              className="my-1"
              name="IdTipology"
              onValueChange={(e) => props.handleDirectChange("IdTipology", e)}
              value={props.formFields.IdTipology}
            >
              {tiposSolicitante.map((element, index) => {
                return (
                  <SelectBoxItem
                    key={index}
                    text={element.label}
                    value={element.value}
                  />
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Contacto:</Subtitle>
            <SelectBox
              className="my-1"
              name="IdContact"
              onValueChange={(e) => props.handleDirectChange("IdContact", e)}
              value={props.formFields.IdContact}
            >
              {contacto.map((element, index) => {
                return (
                  <SelectBoxItem
                    key={index}
                    text={element.name}
                    value={element.idContact}
                  />
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Remitente/ Razon social:</Subtitle>
            <TextInput
              name="LegalName"
              value={props.formFields.LegalName}
              onChange={(e) => props.handleChange(e)}
              className="my-1"
              placeholder=""
            />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Tipo de documento:</Subtitle>
            <SelectBox
              className="my-1"
              name="IdIdentificType"
              onValueChange={(e) =>
                props.handleDirectChange("IdIdentificType", e)
              }
              value={props.formFields.IdIdentificType}
            >
              {tiposDocumento.map((element, index) => {
                return (
                  <SelectBoxItem
                    key={index}
                    text={element.label}
                    value={element.value}
                  />
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Numero de documento:</Subtitle>
            <TextInput
              className="my-1"
              placeholder=""
              name="DocNumber"
              value={props.formFields.DocNumber}
              onChange={(e) => props.handleChange(e)}
            />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Teléfono:</Subtitle>
            <TextInput
              className="my-1"
              placeholder=""
              name="Phone"
              value={props.formFields.Phone}
              onChange={(e) => props.handleChange(e)}
            />
          </Col>
          {countries && (
            <Col numColSpan={1} numColSpanLg={1}>
              <Subtitle>País:</Subtitle>
              <SelectBox
                className="my-1"
                name="IdCountry"
                onValueChange={(e) => props.handleDirectChange("IdCountry", e)}
                value={props.formFields.IdCountry}
              >
                {countries.map((element, index) => {
                  return (
                    <SelectBoxItem
                      key={index}
                      text={element.countryDesc}
                      value={element.idCountry}
                    />
                  );
                })}
              </SelectBox>
            </Col>
          )}
          {departments && (
            <Col numColSpan={1} numColSpanLg={1}>
              <Subtitle>Departamento:</Subtitle>
              <SelectBox
                className="my-1"
                name="IdDepartment"
                onValueChange={(e) =>
                  props.handleDirectChange("IdDepartment", e)
                }
                value={props.formFields.IdDepartment}
              >
                {departments.map((element, index) => {
                  return (
                    <SelectBoxItem
                      key={index}
                      text={element.departDesc}
                      value={element.idDepart}
                    />
                  );
                })}
              </SelectBox>
            </Col>
          )}
          {cities && (
            <Col numColSpan={1} numColSpanLg={1}>
              <Subtitle>Ciudad:</Subtitle>
              <SelectBox
                className="my-1"
                name="IdCity"
                onValueChange={(e) => props.handleDirectChange("IdCity", e)}
                value={props.formFields.IdCity}
              >
                {cities.map((element, index) => {
                  return (
                    <SelectBoxItem
                      key={index}
                      text={element.cityDesc}
                      value={element.idCity}
                    />
                  );
                })}
              </SelectBox>
            </Col>
          )}

          <Col numColSpan={1} numColSpanLg={2}>
            <Subtitle>Dirección:</Subtitle>
            <TextInput
              className="my-1"
              placeholder=""
              name="AddressSends"
              value={props.formFields.AddressSends}
              onChange={(e) => props.handleChange(e)}
            />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Medio de respuesta:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
        </Grid>
        <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2 mt-3">
          <Flex justifyContent="end" className="space-x-2">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => console.log("clicked")}
            >
              Cerrar
            </Button>

            <Button
              size="lg"
              variant="primary"
              to="/Corresp"
              onClick={() => {
                props.setRecibidoPasoUno(2);
              }}
            >
              Siguiente
            </Button>
          </Flex>
        </Grid>
      </Form>
    </>
  );
}

export default RecibidaUno;
