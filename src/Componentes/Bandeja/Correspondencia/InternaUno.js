import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {
  Grid,
  Col,
  TextInput,
  Flex,
  Title,
  Button,
  Subtitle,
  SelectBox
} from "@tremor/react";

import Position from "./Position";

function InternaUno(props) {
  const [validated, setValidated] = useState(false);

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
        <Col numColSpan={1} numColSpanLg={2} className="mt-5">
          <div>
            <Position
              paso={props.paso}
              setPaso={(paso) => props.setInternaPasoUno(paso)}
            />
          </div>
        </Col>
        <Col numColSpan={1} numColSpanLg={2} className="mt-2">
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
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
        >
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
                  props.setInternaPasoUno(2);
                }}
              >
                Siguiente
              </Button>
            </Flex>
          </Grid>
        </Form>
      </Row>
    </>
  );
}

export default InternaUno;
