import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Position from "./Position";
import {Grid, Col, TextInput, Flex, Title, Button} from "@tremor/react";

function InternaTres(props) {
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

          <Row className="mb-3">
            <Form.Label className="fs-4 fw-bolder">Flujos</Form.Label>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Flujo de Correspondencia:</Form.Label>
              <Form.Select type="text" placeholder="" required disabled />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              controlId="validationCustom03"
            ></Form.Group>
          </Row>

          <Row className="mb-3"></Row>

          <Row className="mb-3"></Row>

          <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2 mt-3">
            <Flex justifyContent="end" className="space-x-2">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  props.setInternaPasoUno(2);
                }}
              >
                Atrás
              </Button>

              <Button
                size="lg"
                variant="primary"
                to="/Corresp"
                onClick={() => {
                  props.setInternaPasoUno(1);
                }}
              >
                Guardar
              </Button>
            </Flex>
          </Grid>
        </Form>
      </Row>
    </>
  );
}

export default InternaTres;
