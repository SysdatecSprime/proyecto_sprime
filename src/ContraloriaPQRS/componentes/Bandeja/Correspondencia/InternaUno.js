import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import * as FaIcons from "react-icons/fa";
import Position from "../Position";

function InternaUno(props) {
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
            <Form.Label className="fs-4 fw-bolder">Destinatario</Form.Label>

            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Para:</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Ingresa el destinatario.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Dependencia:</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Ingresa la dependencia.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Ciudad Destino:</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Ingresa el destinatario.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="8" controlId="validationCustom03">
              <Form.Label>Dirección:</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Ingresa la dependencia.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label className="fs-4 fw-bolder">
              Detalle de la Correspondencia
            </Form.Label>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Empresa:</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>Tipificación</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>Clase de Correspondencia</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>Negocio:</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>Medio de Recepción:</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <Form.Label>Numero de Folio:</Form.Label>
              <Form.Control type="number" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>Numero de Comunicación:</Form.Label>
              <Form.Control type="number" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-4">
            <Form.Group as={Col} md="12" controlId="validationCustom05">
              <Form.Label>Asunto</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label className="fs-4 fw-bolder">Remitente</Form.Label>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Para:</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>Dependencia:</Form.Label>
              <Form.Control type="text" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Ciudad de Remitente:</Form.Label>
              <Form.Control type="number" placeholder="" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="10">
              <Button className="my-5 text-start" variant="link " type="submit">
                <FaIcons.FaFileUpload className="form-logo-icon d-block " />
                Anexar
              </Button>
            </Form.Group>
            <Form.Group as={Col} md="2">
              <Button
                to="/Corresp"
                className="my-5 text-end fs-4"
                variant="link "
                onClick={() => {
                  props.setInternaPasoUno(2);
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

export default InternaUno;
