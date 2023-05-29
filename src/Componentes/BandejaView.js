import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import {
  Card,
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableRow,
  Icon,
  SelectBox,
  SelectBoxItem,
  Grid,
  Col,
  TableCell,
  TabList,
  Tab,
  Title,
  Text,
  TextInput,
  Button,
  Flex,
} from "@tremor/react";
import {
  FolderOpenIcon,
  GlobeIcon,
  MailIcon,
  InboxInIcon,
  PaperClipIcon,
  PencilIcon,
  ArchiveIcon,
  DocumentIcon,
  ShareIcon,
  CalculatorIcon,
} from "@heroicons/react/outline";
import MainCorrespondencia from "./MainCorrespondencia";
import Modal from "./Modal";
import DragAndDrop from "./DragAndDrop";

function Bandeja({ radicados, tipoCorrespondencia, crearNuevo }) {
  const [validated, setValidated] = useState(false);
  const [estadoModal, setEstadoModal] = useState(false);
  const [digitalizarModal, setDigitalizarModal] = useState(false);
  const [gestionModal, setGestionModal] = useState(false);
  const [selecTabView, setSelecTabView] = useState(1);
  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleTabClick = value => {
    setSelecTabView(value);
  };
  if (crearNuevo === true) {
    return (
      <Card>
        <MainCorrespondencia />
      </Card>
    );
  }
  return (
    <>
      <Card>
        {(tipoCorrespondencia === 1 ||
          tipoCorrespondencia === 2 ||
          tipoCorrespondencia === 3) && (
          <Grid
            numCols={2}
            numcolsxs={1}
            numColsSm={1}
            numColsLg={2}
            className="gap-2">
            <Col numColSpan={1} numColSpanLg={1}>
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Carpeta"
                icon={FolderOpenIcon}
                onClick={() => setEstadoModal(!estadoModal)}
              />

              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Global"
                icon={GlobeIcon}
                onClick={() => setEstadoModal(!estadoModal)}
              />
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Correo"
                icon={MailIcon}
                onClick={() => setEstadoModal(!estadoModal)}
              />
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Descarga"
                icon={InboxInIcon}
                onClick={() => setEstadoModal(!estadoModal)}
              />
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Adjuntar"
                icon={PaperClipIcon}
                onClick={() => setEstadoModal(!estadoModal)}
              />
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Editar"
                icon={PencilIcon}
                onClick={() => setEstadoModal(!estadoModal)}
              />
            </Col>
            <Col numColSpan={1} numColSpanLg={1}>
              <SelectBox
                onValueChange={value => console.log("the new value is", value)}
                defaultValue="1">
                <SelectBoxItem
                  value="1"
                  text="Kilometers"
                  icon={CalculatorIcon}
                />
                <SelectBoxItem value="2" text="Meters" icon={CalculatorIcon} />
                <SelectBoxItem value="3" text="Miles" icon={CalculatorIcon} />
                <SelectBoxItem
                  value="4"
                  text="Nautical Miles"
                  icon={CalculatorIcon}
                />
              </SelectBox>
            </Col>
          </Grid>
        )}
        <Table className="mt-4">
          {tipoCorrespondencia === 1 && (
            <>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>
                    <input type="checkbox"></input>
                  </TableHeaderCell>
                  <TableHeaderCell>N° de radicado</TableHeaderCell>
                  <TableHeaderCell>Estado de correo</TableHeaderCell>
                  <TableHeaderCell>Remitente</TableHeaderCell>
                  <TableHeaderCell>Asunto</TableHeaderCell>
                  <TableHeaderCell>Responsable</TableHeaderCell>
                  <TableHeaderCell>Fecha de registro</TableHeaderCell>
                  <TableHeaderCell>Fecha de vencimiento</TableHeaderCell>
                  <TableHeaderCell>Clase de Correspondencia</TableHeaderCell>
                  <TableHeaderCell>Tipificacion</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {radicados?.map(item => (
                  <TableRow
                    key={item.IdMailReceived}
                    onClick={() => setGestionModal(!gestionModal)}>
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>{item.CodeReceivMail}</TableCell>
                    <TableCell>{item.IdMailStatus}</TableCell>
                    <TableCell>{item.SenderName}</TableCell>
                    <TableCell>{item.Subject}</TableCell>
                    <TableCell>{item.IdUserName}</TableCell>
                    <TableCell>{item.FromDate}</TableCell>
                    <TableCell>{item.ToDate}</TableCell>
                    <TableCell>{item.IdMailClass}</TableCell>
                    <TableCell>{item.IdTypification}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

              {/* Aqui estan todas las Modales */}
              <Modal
                estado={estadoModal}
                cambiarEstado={setEstadoModal}
                titulo="Prueba">
                <p>hola mundo</p>
              </Modal>
              <Modal estado={gestionModal} cambiarEstado={setGestionModal}>
                <TabList defaultValue="1">
                  <Tab
                    value="1"
                    text="Gestión de radicado"
                    onClick={() => handleTabClick(1)}
                  />
                  <Tab
                    value="2"
                    text="Historial"
                    onClick={() => handleTabClick(2)}
                  />
                </TabList>
                {selecTabView === 1 && (
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={e => handleSubmit(e)}>
                    <Grid numColsLg={6} className="gap-2">
                      {/* Main section */}
                      <Col numColSpanLg={2}>
                        <Card className="h-full">
                          <Title>N° Radicado:</Title>
                        </Card>
                      </Col>

                      {/* KPI sidebar */}
                      <Col numColSpanLg={4}>
                        <div className="space-y-2">
                          <Card>
                            <Title>Detalles del radicado:</Title>
                            <TextInput className="my-1" placeholder="" />
                            <Title>Tipo de respuesta:</Title>
                            <TextInput className="my-1" placeholder="" />
                            <Title>Tramite:</Title>
                            <TextInput className="my-1" placeholder="" />
                            <Title>Observaciones:</Title>
                            <TextInput className="my-1" placeholder="" />
                          </Card>
                          <Card>
                            <Flex justifyContent="between">
                              <Icon
                                className="bandejaIcons"
                                size="lg"
                                variant="solid"
                                tooltip="Global"
                                icon={GlobeIcon}
                                onClick={() =>
                                  setDigitalizarModal(!digitalizarModal)
                                }
                              />

                              <Icon
                                className="bandejaIcons"
                                size="lg"
                                variant="solid"
                                tooltip="Correo"
                                icon={MailIcon}
                                onClick={() => setEstadoModal(!estadoModal)}
                              />
                              <Icon
                                className="bandejaIcons"
                                size="lg"
                                variant="solid"
                                tooltip="Descarga"
                                icon={InboxInIcon}
                                onClick={() => setEstadoModal(!estadoModal)}
                              />
                              <Icon
                                className="bandejaIcons"
                                size="lg"
                                variant="solid"
                                tooltip="Global"
                                icon={GlobeIcon}
                                onClick={() => setEstadoModal(!estadoModal)}
                              />
                              <Icon
                                className="bandejaIcons"
                                size="lg"
                                variant="solid"
                                tooltip="Correo"
                                icon={MailIcon}
                                onClick={() => setEstadoModal(!estadoModal)}
                              />
                            </Flex>
                          </Card>
                        </div>
                      </Col>
                    </Grid>
                    <Grid numColsLg={3} className="gap-2 mt-2">
                      <Col numColSpanLg={1}>
                        <div className="space-y-2">
                          <Card>
                            <div className="h-24" />
                          </Card>
                        </div>
                      </Col>
                      <Col numColSpanLg={1}>
                        <div className="space-y-2">
                          <Card>
                            <div className="h-24" />
                          </Card>
                        </div>
                      </Col>
                      <Col numColSpanLg={1}>
                        <div className="space-y-2">
                          <Card>
                            <div className="h-24" />
                          </Card>
                        </div>
                      </Col>
                    </Grid>
                    <Grid
                      numCols={1}
                      numColsSm={2}
                      numColsLg={1}
                      className="gap-2 mt-3">
                      <Flex justifyContent="end" className="space-x-2">
                        <Button
                          size="lg"
                          variant="secondary"
                          onClick={() => setGestionModal(!gestionModal)}>
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
                  </Form>
                )}
                {selecTabView === 2 && <h1>numero 2</h1>}
              </Modal>
              <Modal
                estado={digitalizarModal}
                cambiarEstado={setDigitalizarModal}
                titulo="Digitalizar Archivo">
                <DragAndDrop />
              </Modal>
            </>
          )}
          {tipoCorrespondencia === 2 && (
            <>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>
                    <input type="checkbox"></input>
                  </TableHeaderCell>
                  <TableHeaderCell>N° de radicado</TableHeaderCell>
                  <TableHeaderCell>Clase de Correspondencia</TableHeaderCell>
                  <TableHeaderCell>Tipificacion</TableHeaderCell>
                  <TableHeaderCell>Estado de correo</TableHeaderCell>
                  <TableHeaderCell>Remitente</TableHeaderCell>
                  <TableHeaderCell>Asunto</TableHeaderCell>
                  <TableHeaderCell>Responsable</TableHeaderCell>
                  <TableHeaderCell>Fecha de registro</TableHeaderCell>
                  <TableHeaderCell>Fecha de vencimiento</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {radicados?.map(item => (
                  <TableRow key={item.IdMailSent}>
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>{item.IdMailSent}</TableCell>
                    <TableCell>{item.IdMailClass}</TableCell>
                    <TableCell>{item.IdTypification}</TableCell>
                    <TableCell>{item.IdMailStatus}</TableCell>
                    <TableCell>{item.SenderName}</TableCell>
                    <TableCell>{item.Subject}</TableCell>
                    <TableCell>{item.nombreUsuario}</TableCell>
                    <TableCell>{item.FromDate}</TableCell>
                    <TableCell>{item.ToDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          )}
          {tipoCorrespondencia === 3 && (
            <>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>
                    <input type="checkbox"></input>
                  </TableHeaderCell>
                  <TableHeaderCell>Usuario</TableHeaderCell>
                  <TableHeaderCell>Dependencia</TableHeaderCell>
                  <TableHeaderCell>Compañia</TableHeaderCell>
                  <TableHeaderCell>Negocio</TableHeaderCell>
                  <TableHeaderCell>Asunto</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {radicados?.map(item => (
                  <TableRow key={item.UserName}>
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>{item.UserName}</TableCell>
                    <TableCell>{item.Dependence}</TableCell>
                    <TableCell>{item.Company}</TableCell>
                    <TableCell>{item.Business}</TableCell>
                    <TableCell>{item.Subject}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          )}
        </Table>
      </Card>
    </>
  );
}

export default Bandeja;
