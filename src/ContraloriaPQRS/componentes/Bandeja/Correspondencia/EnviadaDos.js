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

function EnviadaDos(props) {
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

      <Row>
        <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
          <Row className="mb-3">
            <Form.Label className="fs-4 fw-bolder">Caracteristicas</Form.Label>

            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Anexos:</Form.Label>
              <Form.Control type="text" placeholder="" required />
              <Form.Control.Feedback type="invalid">
                Ingresa el destinatario.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Fecha de Entrega/Devolución:</Form.Label>
              <Form.Control type="text" placeholder="" required />
              <Form.Control.Feedback type="invalid">
                Ingresa el destinatario.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Numero de Guia:</Form.Label>
              <Form.Control type="text" placeholder="" required />
              <Form.Control.Feedback type="invalid">
                Ingresa el destinatario.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Observaciones:</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                type="text"
                placeholder=""
                required
              />
              <Form.Control.Feedback type="invalid">
                Ingresa la dependencia.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3 d-flex justify-content-center"></Row>

          <Row className="mb-3">
            <Form.Label className="fs-4 fw-bolder">
              Relacion de Correo
            </Form.Label>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Correspondencia Recibida:</Form.Label>
              <Form.Control type="text" placeholder="" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>Correspondencia Enviada:</Form.Label>
              <Form.Control type="text" placeholder="" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 mx-2"></Row>

          <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2 mt-3">
            <Flex justifyContent="end" className="space-x-2">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  props.setEnviadaPasoUno(1);
                }}>
                Atrás
              </Button>

              <Button
                size="lg"
                variant="primary"
                to="/Corresp"
                onClick={() => {
                  props.setEnviadaPasoUno(3);
                }}>
                Siguiente
              </Button>
            </Flex>
          </Grid>
        </Form>
      </Row>
    </>
  );
}

export default EnviadaDos;
