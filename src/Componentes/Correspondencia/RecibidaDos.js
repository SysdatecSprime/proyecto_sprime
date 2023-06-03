import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import DragAndDrop from "../DragAndDrop";
import Modal from "../Modal";
import Position from "../Position";
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
  Icon,
  Text,
  SelectBox,
  SelectBoxItem,
} from "@tremor/react";
import { MailIcon, GlobeIcon, InboxInIcon } from "@heroicons/react/outline";

function RecibidaDos(props) {
  const [validated, setValidated] = useState(false);
  const [modalCrearDocumento, setModalCrearDocumento] = useState(false);
  const [digitalizarRecibidoModal, setDigitalizarRecibidoModal] =
    useState(false);

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
              <Form.Control
                as="textarea"
                rows={3}
                className="my-1"
                name="Observations"
                onChange={e => props.handleChange(e)}
                value={props.formFields.Observations}
              />
            </Col>
          </Grid>
          <Grid numCols={1} numColsSm={2} numColsLg={4} className="gap-2 my-5 ">
            <Col numColSpan={1} numColSpanLg={4}>
              <Title>Anexos</Title>
              <DragAndDrop />
              <Flex justifyContent="end" className="space-x-2 textDigitaliza">
                <Title
                  size="sm"
                  variant="light"
                  color="blue"
                  onClick={() =>
                    setDigitalizarRecibidoModal(!digitalizarRecibidoModal)
                  }>
                  Digitalizar
                </Title>
              </Flex>
            </Col>
          </Grid>

          <Grid numCols={1} numColsSm={2} numColsLg={2} className="gap-2 mt-4">
            <Grid numCols={1} numColsSm={2} numColsLg={4} className="gap-2">
              <Col numColSpan={1} numColSpanLg={4}>
                <Title>Flujo</Title>
              </Col>
              <Col numColSpan={1} numColSpanLg={4}>
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

            <Grid>
              <Flex justifyContent="end">
                <Title>Crear documento</Title>
                <Icon
                  className="bandejaIcons m-3"
                  size="sm"
                  variant="solid"
                  tooltip="Correo"
                  icon={MailIcon}
                  onClick={() => setModalCrearDocumento(!modalCrearDocumento)}
                />
              </Flex>

              {/*  Aqui estan colocados todos lo modales */}
              <Modal
                estado={digitalizarRecibidoModal}
                cambiarEstado={setDigitalizarRecibidoModal}
                titulo="Digitalizacion de archivo">
                <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
                  <Col numColSpan={1} numColSpanLg={1}>
                    <Flex alignitems="center">
                      <Title className="mr-2">Numero:</Title>
                      <TextInput error={false} placeholder="" />
                    </Flex>
                  </Col>
                  <Flex alignitems="center">
                    <Title className="mr-2">Tipo: </Title>
                    <TextInput error={false} placeholder="" />
                  </Flex>
                  <Col>
                    <Flex alignitems="center">
                      <Title className="mr-2">Folio: </Title>
                      <TextInput error={false} placeholder="" />
                    </Flex>
                  </Col>
                  <Col numColSpan={1} numColSpanLg={2}>
                    <Flex alignitems="center">
                      <Title className="w-80">Seleccione el scanner:</Title>
                      <SelectBox
                        onValueChange={value =>
                          console.log("the new value is", value)
                        }
                        defaultValue="1">
                        <SelectBoxItem value="1" text="" />
                        <SelectBoxItem value="2" text="" />
                        <SelectBoxItem value="3" text="" />
                        <SelectBoxItem value="4" text="" />
                      </SelectBox>
                    </Flex>
                  </Col>{" "}
                  <Col>
                    <Flex justifyContent="center" className="space-x-2">
                      <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => console.log("clicked")}>
                        Digitalizar
                      </Button>

                      <Button
                        size="lg"
                        variant="primary"
                        to="/Corresp"
                        onClick={() => console.log("clicked")}>
                        Guardar
                      </Button>
                    </Flex>
                  </Col>
                  <Col numColSpan={1} numColSpanLg={3}>
                    <div className="image-upload-wrap"></div>
                  </Col>
                  <Col numColSpan={1} numColSpanLg={3}>
                    <Card>
                      <Title>Lectura de OCR</Title>
                      <Text>Informacion de la lectura del OCR</Text>
                    </Card>
                  </Col>
                </Grid>
              </Modal>
              <Modal
                estado={modalCrearDocumento}
                cambiarEstado={setModalCrearDocumento}
                titulo="Creación de documento">
                <Grid
                  numCols={1}
                  numColsSm={2}
                  numColsLg={3}
                  className="gap-2 mb-2">
                  <Col numColSpan={1} numColSpanLg={1}>
                    <Text>Correspondencia</Text>
                    <TextInput placeholder="Disabled" disabled={true} />
                  </Col>
                  <Col numColSpan={1} numColSpanLg={1}>
                    <Text>Revisión</Text>
                    <TextInput placeholder="Disabled" disabled={true} />
                  </Col>
                  <Col numColSpan={1} numColSpanLg={1}>
                    <Text>Código</Text>
                    <TextInput placeholder="Disabled" disabled={true} />
                  </Col>
                </Grid>
                <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2">
                  <Col numColSpan={1} numColSpanLg={1}>
                    <Text>Correspondencia</Text>
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
                  <Col numColSpan={1} numColSpanLg={1}>
                    <Text>Revisión</Text>
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

                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    className="mt-3">
                    <Text>Requiere Firma</Text>
                    <input type="checkbox" className="m-4"></input>
                  </Flex>
                </Grid>
                <Flex justifyContent="end">
                  <TextInput placeholder="Versión" disabled={true} />
                  <Icon
                    className="bandejaIcons"
                    size="sm"
                    tooltip="Global"
                    icon={GlobeIcon}
                  />
                  <Icon
                    className="bandejaIcons"
                    size="sm"
                    tooltip="Correo"
                    icon={MailIcon}
                  />
                  <Icon
                    className="bandejaIcons"
                    size="sm"
                    tooltip="Descarga"
                    icon={InboxInIcon}
                  />
                  <Icon
                    className="bandejaIcons"
                    size="sm"
                    tooltip="Global"
                    icon={GlobeIcon}
                  />
                  <Icon
                    className="bandejaIcons"
                    size="sm"
                    tooltip="Correo"
                    icon={MailIcon}
                  />
                </Flex>
                <Card></Card>
                <Grid
                  numCols={1}
                  numColsSm={2}
                  numColsLg={1}
                  className="gap-2 mt-3">
                  <Flex justifyContent="end" className="space-x-2">
                    <Button
                      size="lg"
                      variant="secondary"
                      onClick={() =>
                        setModalCrearDocumento(!modalCrearDocumento)
                      }>
                      Cerrar
                    </Button>
                    <Button
                      size="lg"
                      variant="primary"
                      to="/Corresp"
                      onClick={() => console.log("clicked")}>
                      Enviar
                    </Button>
                  </Flex>
                </Grid>
              </Modal>
            </Grid>
          </Grid>

          {/* <Grid numCols={1} numColsSm={2} numColsLg={3} className="gap-2 mt-4">
            <Card></Card>
            <Card></Card>
            <Card></Card>
          </Grid> */}
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
