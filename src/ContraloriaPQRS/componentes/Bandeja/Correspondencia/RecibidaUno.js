import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import * as FaIcons from "react-icons/fa";
import Position from "../Position";
import {
  Grid,
  Col,
  TextInput,
  Flex,
  Title,
  Subtitle,
  Button,
} from "@tremor/react";

function RecibidaUno(props) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
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
            <TextInput className="my-1 ms-5" />
          </Flex>
          <Flex className="gap-2">
            <Title>Remision:</Title>
            <TextInput className="my-1 ms-3" />
          </Flex>
          <Flex className="gap-2">
            <Title>Prioridad:</Title>
            <TextInput className="my-1 ms-3" />
          </Flex>
        </Col>
      </Grid>
      <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
        <Grid numCols={1} numColsSm={2} numColsLg={4} className="gap-2">
          <Col numColSpan={1} numColSpanLg={4}>
            <Title>Destinatario</Title>
          </Col>
          <Col numColSpan={1} numColSpanLg={2}>
            <Subtitle>Para:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={2}>
            <Subtitle>Dependencia:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={2}>
            <Subtitle>Notificar:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={2}>
            <Subtitle>Dependencia:</Subtitle>
            <TextInput className="my-1" />
          </Col>
        </Grid>
        <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2 mt-3">
          <Col numColSpan={1} numColSpanLg={3}>
            <Title>Detalles de la correspondencia</Title>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Empresa:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Tipificacion:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Clase de correspondencia:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Negocio:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Grupo:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Medio de recepción:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={3}>
            <Subtitle>Asunto:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>N° Folio:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>N° Comunicación:</Subtitle>
            <TextInput className="my-1" />
          </Col>
        </Grid>
        <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2 mt-3">
          <Col numColSpan={1} numColSpanLg={3}>
            <Title>Remitente</Title>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Tipo de remitente:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Remitente/ Razon social:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Contacto:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Tipo de documento:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Numero de documento:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Teléfono:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>País:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Departamento:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Ciudad:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={2}>
            <Subtitle>Dirección:</Subtitle>
            <TextInput className="my-1" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Medio de respuesta:</Subtitle>
            <TextInput className="my-1" />
          </Col>
        </Grid>
        <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2 mt-3">
          <Flex justifyContent="end" className="space-x-2">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => console.log("clicked")}>
              Cerrar
            </Button>

            <Button
              size="lg"
              variant="primary"
              to="/Corresp"
              onClick={() => {
                props.setRecibidoPasoUno(2);
              }}>
              Siguiente
            </Button>
          </Flex>
        </Grid>
      </Form>
    </>
  );
}

export default RecibidaUno;
