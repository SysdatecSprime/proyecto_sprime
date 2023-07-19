import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Position from "../Position";
import * as FaIcons from "react-icons/fa";

function InternaDos(props) {
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
      <Row className="mb-3">
        <Col sm={8} className="py-5">
          <Position paso={props.paso} />
        </Col>
        <Col sm={4}>
          <Form.Group
            as={Row}
            className="mb-1"
            controlId="formPlaintextPassword">
            <Form.Label column sm="4">
              Fecha:
            </Form.Label>
            <Col sm="6">
              <Form.Control size="sm" type="date" />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-1"
            controlId="formPlaintextPassword">
            <Form.Label column sm="4">
              Remisión:
            </Form.Label>
            <Col sm="6">
              <Form.Control size="sm" type="date" placeholder="Password" />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-1"
            controlId="formPlaintextPassword">
            <Form.Label column sm="4">
              Prioridad:
            </Form.Label>
            <Col sm="6">
              <Form.Select size="sm" type="text" placeholder="Password" />
            </Col>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Form noValidate validated={validated} onSubmit={e => handleSubmit(e)}>
          <Row className="mb-3">
            <Form.Label className="fs-4 fw-bolder">Caracteristicas</Form.Label>

            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Anexos:</Form.Label>
              <Form.Control type="text" placeholder="" required />
              <Form.Control.Feedback type="invalid">
                Ingresa el destinatario.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Observaciones:</Form.Label>
              <Form.Control type="text" placeholder="" required />
              <Form.Control.Feedback type="invalid">
                Ingresa la dependencia.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label className="fs-4 fw-bolder">Flujos</Form.Label>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Flujo de Correspondencia:</Form.Label>
              <Form.Select type="text" placeholder="" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustom03"></Form.Group>
          </Row>

          <Row className="mb-3"></Row>

          <Row className="mb-3">
            <Form.Label className="fs-4 fw-bolder">
              Relacion de Correo
            </Form.Label>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Correspondencia Interna:</Form.Label>
              <Form.Control type="text" placeholder="" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>Correspondencia Recibida:</Form.Label>
              <Form.Control type="text" placeholder="" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>Correspondencia Enviada:</Form.Label>
              <Form.Control type="text" placeholder="" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 mx-2"></Row>

          <Row>
            <Form.Group as={Col} md="10">
              <Button
                className="my-5 text-start fs-4"
                variant="link "
                onClick={() => {
                  props.setInternaPasoUno(1);
                }}>
                <FaIcons.FaChevronLeft className="" />
                Atrás
              </Button>
            </Form.Group>
            <Form.Group as={Col} md="2">
              <Button
                to="/Corresp"
                className="my-5 text-end fs-4"
                variant="link "
                type="submit"
                onClick={() => {
                  props.setInternaPasoUno(3);
                }}>
                Siguiente
                <FaIcons.FaAngleRight className="" />
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </Row>
    </Container>
  );
}

export default InternaDos;
