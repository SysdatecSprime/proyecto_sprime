import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import DragDropFile from "../../DragDrop";
import Position from "../Position";
import * as FaIcons from "react-icons/fa";
import {
  Grid,
  Col,
  TextInput,
  Flex,
  Title,
  Button,
  Dropdown,
  DropdownItem,
  Card,
} from "@tremor/react";

function RecibidaDos(props) {
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
        <Form>
          <Grid numCols={1} numColsSm={2} numColsLg={4} className="gap-2">
            <Col numColSpan={1} numColSpanLg={4}>
              <Title>Caracteristicas</Title>
            </Col>
            <Col numColSpan={1} numColSpanLg={4}>
              <Form.Control as="textarea" rows={3} />
            </Col>
          </Grid>
          <Grid numCols={1} numColsSm={2} numColsLg={4} className="gap-2">
            <Col numColSpan={1} numColSpanLg={4}>
              <Title>Anexos</Title>
            </Col>
            <Col numColSpan={1} numColSpanLg={4}>
              <DragDropFile />
            </Col>
          </Grid>
          <Grid numCols={1} numColsSm={2} numColsLg={4} className="gap-2">
            <Col numColSpan={1} numColSpanLg={4}>
              <Title>Flujo</Title>
            </Col>
            <Col numColSpan={1} numColSpanLg={2}>
              <Dropdown
                className="mt-2"
                onValueChange={value =>
                  console.log("The selected value is", value)
                }
                placeholder="Render mode">
                <DropdownItem value="1" text="Transparent" />
                <DropdownItem value="2" text="Outline" />
              </Dropdown>
            </Col>
          </Grid>
          <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2 mt-4">
            <Card></Card>
            <Card></Card>
            <Card></Card>
          </Grid>
          <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2 mt-3">
            <Flex justifyContent="end" className="space-x-2">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  props.setRecibidoPasoUno(1);
                }}>
                Atrás
              </Button>

              <Button
                size="lg"
                variant="primary"
                to="/Corresp"
                onClick={() => {
                  props.setRecibidoPasoUno(3);
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

export default RecibidaDos;
