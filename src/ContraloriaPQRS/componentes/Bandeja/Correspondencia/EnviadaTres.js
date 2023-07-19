import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Position from "../Position";
import * as FaIcons from "react-icons/fa";
import {
  Grid,
  Col,
  TextInput,
  Flex,
  Title,
  Subtitle,
  Button,
} from "@tremor/react";

import InputGroup from "react-bootstrap/InputGroup";

function EnviadaTres(props) {
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
    <Container>
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

      <Row>
        <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
          <Row className="">
            <Form.Label className="fs-4 fw-bolder">
              Detalles de la Correspondencia
            </Form.Label>
          </Row>
          <Row className=""></Row>

          <Row className="mb-3">
            <Form.Label className="fs-4 fw-bolder">
              Correos Relacionados
            </Form.Label>
          </Row>

          <Row className="mb-3"></Row>

          <Row className="mb-3"></Row>

          <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2 mt-3">
            <Flex justifyContent="end" className="space-x-2">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  props.setEnviadaPasoUno(2);
                }}>
                Atrás
              </Button>

              <Button
                size="lg"
                variant="primary"
                to="/Corresp"
                onClick={() => {
                  props.setEnviadaPasoUno(1);
                }}>
                Siguiente
              </Button>
            </Flex>
          </Grid>
        </Form>
      </Row>
    </Container>
  );
}

export default EnviadaTres;
