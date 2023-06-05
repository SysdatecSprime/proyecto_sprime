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
} from "@tremor/react";
import { dataBandeja } from "../UrlBase";
import axios from "axios";

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

  useEffect(() => {
    obtenerPrioridad();
  }, []);
  useEffect(() => {
    obtenerUsuarioDp();
  }, []);
  useEffect(() => {
    obtenerEmpresa();
  }, []);
  useEffect(() => {
    obtenerTipificacion();
  }, []);
  useEffect(() => {
    obtenerClassCorrespondencia();
  }, []);
  useEffect(() => {
    obtenerNegocio();
  }, []);
  useEffect(() => {
    obtenerGrupo();
  }, []);
  useEffect(() => {
    obtenerContacto();
  }, []);
  useEffect(() => {
    obtenerMedioRecepcion();
  }, []);

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
      console.log(respUsuarioDp);
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
      console.log(respGrupo);
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
            <Position paso={props.paso} />
          </div>
        </Col>
        <Col numColSpan={1} numColSpanLg={1} className="mt-2">
          <Flex className="gap-2">
            <Title>Fecha:</Title>
            <TextInput className="my-1 ms-5" placeholder="" />
          </Flex>
          <Flex className="gap-2">
            <Title>Remision:</Title>
            <TextInput className="my-1 ms-3" placeholder="" />
          </Flex>
          <Flex className="gap-2">
            <Title>Prioridad:</Title>
            <SelectBox
              className="my-1 ms-3"
              name="idPriority"
              onChange={(e) => props.handleChange(e)}
              /* value={props.formFields.IdPriority} */
            >
              {prioridad.map((element, index) => {
                return (
                  <SelectBoxItem key={index} value={element.priorityDesc}>
                    {element.idPriority}
                  </SelectBoxItem>
                );
              })}
            </SelectBox>
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
              onChange={(e) => props.handleChange(e)}
              /* value={props.formFields.IdPriority} */
            >
              {usuarioDp.map((element, index) => {
                return (
                  <SelectBoxItem key={index} value={element.UserDesc}>
                    {element.IdUser}
                  </SelectBoxItem>
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
            <TextInput className="my-1" placeholder="" />
          </Col>
          <Col numColSpan={1} numColSpanLg={2}>
            <Subtitle>Dependencia:</Subtitle>
            <TextInput className="my-1" placeholder="" />
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
              onChange={(e) => props.handleChange(e)}
              /* value={props.formFields.IdPriority} */
            >
              {empresa.map((element, index) => {
                return (
                  <SelectBoxItem key={index} value={element.BusinessDesc}>
                    {element.IdBusiness}
                  </SelectBoxItem>
                );
              })}
            </SelectBox>
          </Col>

          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Tipificacion:</Subtitle>
            <SelectBox
              className="my-1"
              name="idTypification"
              onChange={(e) => props.handleChange(e)}
              /* value={props.formFields.IdPriority} */
            >
              {tipificacion.map((element, index) => {
                return (
                  <SelectBoxItem key={index} value={element.typificDesc}>
                    {element.idTypification}
                  </SelectBoxItem>
                );
              })}
            </SelectBox>
          </Col>

          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Clase de correspondencia:</Subtitle>
            <SelectBox
              className="my-1"
              name="idMailClass"
              onChange={(e) => props.handleChange(e)}
              /* value={props.formFields.IdPriority} */
            >
              {classCorrespondencia.map((element, index) => {
                return (
                  <SelectBoxItem key={index} value={element.mailDesc}>
                    {element.idMailClass}
                  </SelectBoxItem>
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Negocio:</Subtitle>
            <SelectBox
              className="my-1"
              name="IdCompany"
              onChange={(e) => props.handleChange(e)}
              /* value={props.formFields.IdPriority} */
            >
              {negocio.map((element, index) => {
                return (
                  <SelectBoxItem key={index} value={element.CompanyDesc}>
                    {element.IdCompany}
                  </SelectBoxItem>
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Grupo:</Subtitle>
            <SelectBox
              className="my-1"
              name="IdGroups"
              onChange={(e) => props.handleChange(e)}
              /* value={props.formFields.IdPriority} */
            >
              {grupo.map((element, index) => {
                return (
                  <SelectBoxItem key={index} value={element.groMailDesc}>
                    {element.idGroupMail}
                  </SelectBoxItem>
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Medio de recepción:</Subtitle>
            <SelectBox
              className="my-1"
              name="idRecMed"
              onChange={(e) => props.handleChange(e)}
              /* value={props.formFields.IdPriority} */
            >
              {medioRecepcion.map((element, index) => {
                return (
                  <SelectBoxItem key={index} value={element.recMedDesc}>
                    {element.idRecMed}
                  </SelectBoxItem>
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={3}>
            <Subtitle>Asunto:</Subtitle>
            <TextInput
              className="my-1"
              name="Subject"
              onChange={(e) => props.handleChange(e)}
              value={props.formFields.Subject}
              placeholder=""
            />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>N° Folio:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>N° Comunicación:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
        </Grid>
        <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2 mt-3">
          <Col numColSpan={1} numColSpanLg={3}>
            <Title>Remitente</Title>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Tipo de remitente:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Contacto:</Subtitle>
            <SelectBox
              className="my-1"
              name="idContact"
              onChange={(e) => props.handleChange(e)}
              /* value={props.formFields.IdPriority} */
            >
              {contacto.map((element, index) => {
                return (
                  <SelectBoxItem key={index} value={element.name}>
                    {element.idContact}
                  </SelectBoxItem>
                );
              })}
            </SelectBox>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Remitente/ Razon social:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Tipo de documento:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Numero de documento:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Teléfono:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>País:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Departamento:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Ciudad:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
          <Col numColSpan={1} numColSpanLg={2}>
            <Subtitle>Dirección:</Subtitle>
            <TextInput className="my-1" placeholder="" />
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
