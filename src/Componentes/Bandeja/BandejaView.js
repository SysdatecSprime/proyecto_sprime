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
  MultiSelectBox,
  MultiSelectBoxItem,
  Badge,
  Divider,
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
import "../Styles/StyleCopia.css";

const data = [
  {
    name: "30/05/2023",
    Role: "Federal Councillor",
    departement:
      "The Federal Department of Defence, Civil Protection and Sport (DDPS)",
    status: "active",
  },
  {
    name: "30/05/2023",
    Role: "Federal Councillor",
    departement:
      "The Federal Department of the Environment, Transport, Energy and Communications (DETEC)",
    status: "active",
  },
  {
    name: "30/05/2023",
    Role: "Federal Councillor",
    departement: "The Federal Department of Home Affairs (FDHA)",
    status: "active",
  },
];

function Bandeja({ radicados, tipoCorrespondencia, crearNuevo }) {
  const [validated, setValidated] = useState(false);
  const [estadoModal, setEstadoModal] = useState(false);
  const [digitalizarModal, setDigitalizarModal] = useState(false);
  const [firmaModal, setFirmaModal] = useState(false);
  const [asociarExpModal, setAsociarExpModal] = useState(false);
  const [trdModal, setTrdModal] = useState(false);
  const [gestionModal, setGestionModal] = useState(false);
  const [selecTabView, setSelecTabView] = useState(1);
  const [checkboxes, setCheckboxes] = useState({});

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    const updatedCheckboxes = { ...checkboxes };

    Object.keys(updatedCheckboxes).forEach((key) => {
      updatedCheckboxes[key] = checked;
    });

    setCheckboxes(updatedCheckboxes);
  };

  function Medalla({ status }) {
    let badgeColorClass = "";

    console.log(status);

    // Asigna la clase de color según el valor de item.MailStatus
    if (status === "ACTIVO") {
      badgeColorClass = "emerald"; // Clase de estilo para color verde
    } else if (status === "INACTIVO") {
      badgeColorClass = "yellow"; // Clase de estilo para color amarillo
    } else if (status === "FINALIZADO") {
      badgeColorClass = "blue"; // Clase de estilo para color rojo
    }

    return <Badge color={badgeColorClass}>{status}</Badge>;
  }

  function MedallaPrioridad({ priority }) {
    let badgeColorClass = "";

    console.log(priority);

    // Asigna la clase de color según el valor de item.MailStatus
    if (priority === "BAJA") {
      badgeColorClass = "emerald"; // Clase de estilo para color verde
    } else if (priority === "MEDIA") {
      badgeColorClass = "yellow"; // Clase de estilo para color amarillo
    } else if (priority === "ALTA") {
      badgeColorClass = "red"; // Clase de estilo para color rojo
    }

    return <Badge color={badgeColorClass}>{priority}</Badge>;
  }

  function MedallaFecha({ ExpDate }) {
    let badgeColorClass = "";

    const currentDate = new Date(); // Fecha actual
    const fechaExp = new Date(ExpDate); // Fecha de expiración

    // Compara las fechas ignorando la hora y los minutos
    const esAnterior = fechaExp < currentDate.setHours(0, 0, 0, 0);
    const esIgual = fechaExp.toDateString() === currentDate.toDateString();

    // Asigna la clase de color según el valor de item.MailStatus
    if (esAnterior) {
      badgeColorClass = "red"; // Color rojo para fechas anteriores
    } else if (esIgual) {
      badgeColorClass = "yellow"; // Color amarillo para fechas iguales
    } else {
      badgeColorClass = "emerald"; // Color amarillo para fechas iguales
    }

    return <Badge color={badgeColorClass}>{ExpDate}</Badge>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    // Obtener los checkboxes seleccionados
    const selectedCheckboxes = Object.keys(checkboxes).filter(
      (key) => checkboxes[key]
    );

    // Realizar alguna acción con los checkboxes seleccionados
    console.log("Checkboxes seleccionados:", selectedCheckboxes);
  };

  const handleTabClick = (value) => {
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
            className="gap-2"
          >
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
                onValueChange={(value) =>
                  console.log("the new value is", value)
                }
                defaultValue="1"
              >
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
                    <input
                      type="checkbox"
                      checked={Object.values(checkboxes).every(
                        (value) => value
                      )}
                      onChange={handleCheckboxChange}
                    />
                  </TableHeaderCell>
                  <TableHeaderCell>N° de radicado</TableHeaderCell>
                  <TableHeaderCell>Prioridad</TableHeaderCell>
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
                {radicados?.map((item) => (
                  <TableRow
                    key={item.IdMailReceived}
                    onClick={() => setGestionModal(!gestionModal)}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={checkboxes[item.IdMailReceived]}
                        onChange={() => {
                          const updatedCheckboxes = { ...checkboxes };
                          updatedCheckboxes[item.IdMailReceived] =
                            !updatedCheckboxes[item.IdMailReceived];
                          setCheckboxes(updatedCheckboxes);
                        }}
                      />
                    </TableCell>
                    <TableCell>{item.CodeReceivMail}</TableCell>
                    <TableCell>
                      <MedallaPrioridad priority={item.IdPriority} />
                    </TableCell>
                    <TableCell>
                      <Medalla status={item.MailStatus} />
                    </TableCell>
                    <TableCell>{item.SenderName}</TableCell>
                    <TableCell>{item.Subject}</TableCell>
                    <TableCell>{item.ResponDesc}</TableCell>
                    <TableCell>{item.CreationDate}</TableCell>
                    <TableCell>
                      <MedallaFecha ExpDate={item.ExpDate} />
                    </TableCell>
                    <TableCell>{item.ClaseCorrespondencia}</TableCell>
                    <TableCell>{item.IdTypification}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

              {/* Aqui estan todas las Modales */}
              <Modal
                estado={estadoModal}
                cambiarEstado={setEstadoModal}
                titulo="Prueba"
              >
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
                    onSubmit={(e) => handleSubmit(e)}
                  >
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
                                onClick={() => setTrdModal(!trdModal)}
                              />
                              <Icon
                                className="bandejaIcons"
                                size="lg"
                                variant="solid"
                                tooltip="Descarga"
                                icon={InboxInIcon}
                                onClick={() => setFirmaModal(!firmaModal)}
                              />
                              <Icon
                                className="bandejaIcons"
                                size="lg"
                                variant="solid"
                                tooltip="Global"
                                icon={GlobeIcon}
                                onClick={() =>
                                  setAsociarExpModal(!asociarExpModal)
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
                      className="gap-2 mt-3"
                    >
                      <Flex justifyContent="end" className="space-x-2">
                        <Button
                          size="lg"
                          variant="secondary"
                          onClick={() => setGestionModal(!gestionModal)}
                        >
                          Cerrar
                        </Button>
                        <Button
                          size="lg"
                          variant="primary"
                          to="/Corresp"
                          onClick={() => console.log("clicked")}
                        >
                          Enviar
                        </Button>
                      </Flex>
                    </Grid>
                  </Form>
                )}
                {selecTabView === 2 && (
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <Title className="mt-5">Radicado N°:</Title>
                    <Table className="mt-2">
                      <TableBody>
                        {data.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                              <Text>{item.departement}</Text>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Grid
                      numCols={1}
                      numColsSm={2}
                      numColsLg={1}
                      className="gap-2 mt-3"
                    >
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
                            console.log("clicked");
                          }}
                        >
                          Siguiente
                        </Button>
                      </Flex>
                    </Grid>
                  </Form>
                )}
              </Modal>
              <Modal
                estado={digitalizarModal}
                cambiarEstado={setDigitalizarModal}
                titulo="Digitalizar Archivo"
              >
                <DragAndDrop />
              </Modal>
              <Modal
                estado={trdModal}
                cambiarEstado={setTrdModal}
                titulo="Asociar TRD"
              >
                <MultiSelectBox>
                  <MultiSelectBoxItem value="1" text="Option 1" />
                  <MultiSelectBoxItem value="2" text="Option 2" />
                  <MultiSelectBoxItem value="3" text="Option 3" />
                </MultiSelectBox>
              </Modal>
              <Modal
                estado={firmaModal}
                cambiarEstado={setFirmaModal}
                titulo="Firma Documento"
              >
                <DragAndDrop />
              </Modal>
              <Modal
                estado={asociarExpModal}
                cambiarEstado={setAsociarExpModal}
                titulo="Asociar Expediente"
              >
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
                  <TableHeaderCell>N° de radicado</TableHeaderCell>{" "}
                  <TableHeaderCell>Prioridad</TableHeaderCell>
                  <TableHeaderCell>Estado de correo</TableHeaderCell>
                  <TableHeaderCell>Destinatario</TableHeaderCell>
                  <TableHeaderCell>Asunto</TableHeaderCell>
                  <TableHeaderCell>Responsable</TableHeaderCell>
                  <TableHeaderCell>Fecha de registro</TableHeaderCell>
                  <TableHeaderCell>Clase de Correspondencia</TableHeaderCell>
                  {/* <TableHeaderCell>Tipificacion</TableHeaderCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {radicados?.map((item) => (
                  <TableRow key={item.IdMailSent}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={checkboxes[item.IdMailSent]}
                        onChange={() => {
                          const updatedCheckboxes = { ...checkboxes };
                          updatedCheckboxes[item.IdMailSent] =
                            !updatedCheckboxes[item.IdMailSent];
                          setCheckboxes(updatedCheckboxes);
                        }}
                      />
                    </TableCell>
                    <TableCell>{item.CodeMailSent}</TableCell>
                    <TableCell>
                      <MedallaPrioridad priority={item.IdPriority} />
                    </TableCell>
                    <TableCell>
                      <Medalla status={item.MailStatus} />
                    </TableCell>
                    <TableCell>{item.DestinatPerson}</TableCell>
                    <TableCell>{item.Subject}</TableCell>
                    <TableCell>{item.UserDesc}</TableCell>
                    <TableCell>{item.CreationDate}</TableCell>
                    <TableCell>{item.ClaseCorrespondencia}</TableCell>
                    {/* <TableCell>{item.IdTypification}</TableCell> */}
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
                  <TableHeaderCell>N° de radicado</TableHeaderCell>
                  <TableHeaderCell>Prioridad</TableHeaderCell>
                  <TableHeaderCell>Estado de correo</TableHeaderCell>
                  <TableHeaderCell>Destinatario</TableHeaderCell>
                  <TableHeaderCell>Asunto</TableHeaderCell>
                  <TableHeaderCell>Responsable</TableHeaderCell>
                  <TableHeaderCell>Fecha de registro</TableHeaderCell>
                  <TableHeaderCell>Fecha de vencimiento</TableHeaderCell>
                  <TableHeaderCell>Clase de Correspondencia</TableHeaderCell>
                  <TableHeaderCell>Tipificacion</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {radicados?.map((item) => (
                  <TableRow key={item.UserName}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={checkboxes[item.IdMailInternal]}
                        onChange={() => {
                          const updatedCheckboxes = { ...checkboxes };
                          updatedCheckboxes[item.IdMailInternal] =
                            !updatedCheckboxes[item.IdMailInternal];
                          setCheckboxes(updatedCheckboxes);
                        }}
                      />
                    </TableCell>
                    <TableCell>{item.CodeInterMail}</TableCell>
                    <TableCell>
                      <MedallaPrioridad priority={item.IdPriority} />
                    </TableCell>
                    <TableCell>
                      <Medalla status={item.MailStatus} />
                    </TableCell>
                    <TableCell>{item.UserDesc}</TableCell>
                    <TableCell>{item.Subject}</TableCell>
                    <TableCell>{item.ResponDesc}</TableCell>
                    <TableCell>{item.CreationDate}</TableCell>
                    <TableCell>
                      <MedallaFecha ExpDate={item.ExpDate} />
                    </TableCell>
                    <TableCell>{item.ClaseCorrespondencia}</TableCell>
                    <TableCell>{item.IdTypification}</TableCell>
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
