import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import DragAndDrop from "./DragAndDrop";
import Position from "./Position";
import {
  Grid,
  Col,
  TextInput,
  Flex,
  Title,
  Subtitle,
  Button,
  Icon
} from "@tremor/react";
import {MailIcon, GlobeIcon, InboxInIcon} from "@heroicons/react/outline";

function EnviadaDos(props) {
  const [validated, setValidated] = useState(false);
  const [modalCrearDocumento, setModalCrearDocumento] = useState(false);

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
              setPaso={(paso) => props.setEnviadaPasoUno(paso)}
            />
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
      <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
        <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
          <Col numColSpan={1} numColSpanLg={3}>
            <Title>Caracteristicas</Title>
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Anexos:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Fecha de Entrega/Devolución:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Numero de Guia:</Subtitle>
            <TextInput className="my-1" placeholder="" />
          </Col>
        </Grid>

        <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2">
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Observaciones Devolución/Entrega:</Subtitle>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder=""
              required
            />
          </Col>
        </Grid>
        <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2">
          <Col numColSpan={1} numColSpanLg={1}>
            <Subtitle>Observaciones:</Subtitle>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder=""
              required
            />
          </Col>
        </Grid>

        <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2 my-3 ">
          <Col numColSpan={1} numColSpanLg={1}>
            <DragAndDrop />
          </Col>
        </Grid>
        <Grid>
          <Flex justifyContent="start">
            <Title>Crear documento</Title>
            <Icon
              className="bandejaIcons m-3"
              size="sm"
              variant="solid"
              tooltip="Correo"
              icon={MailIcon}
              onClick={() => setModalCrearDocumento(!modalCrearDocumento)}
            />
            <Title>Asociar Radicado</Title>
            <Icon
              className="bandejaIcons m-3"
              size="sm"
              variant="solid"
              tooltip="Correo"
              icon={MailIcon}
              onClick={() => setModalCrearDocumento(!modalCrearDocumento)}
            />
          </Flex>
        </Grid>
        <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2 mt-3">
          <Flex justifyContent="end" className="space-x-2">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                props.setEnviadaPasoUno(1);
              }}
            >
              Atrás
            </Button>

            <Button
              size="lg"
              variant="primary"
              to="/Corresp"
              onClick={() => {
                props.setEnviadaPasoUno(3);
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

export default EnviadaDos;
