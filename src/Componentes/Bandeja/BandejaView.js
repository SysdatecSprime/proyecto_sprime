import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
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
  DateRangePicker,
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
import Modal from "./Correspondencia/Modal";
import DragAndDrop from "./Correspondencia/DragAndDrop";
import "../Styles/StyleCopia.css";
import axios from "axios";
import { useTable } from "react-table";

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
  const [NumRadicado, setNumRadicado] = useState({});
  const [Asunto, SetAsunto] = useState({});
  const [Observaciones, setObservaciones] = useState({});
  const [filesData, setFilesData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showTableUpdate, setShowTableUpdate] = useState(false);
  const [UpdateData, setUpdateData] = useState([]);

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    const updatedCheckboxes = { ...checkboxes };

    Object.keys(updatedCheckboxes).forEach((key) => {
      updatedCheckboxes[key] = checked;
    });

    setCheckboxes(updatedCheckboxes);
  };

  const handleGestionModalOpen = (item) => {
    setGestionModal(true);
    setNumRadicado(item.CodeReceivMail);
    SetAsunto(item.Subject);
    setObservaciones(item.Observations);

    // Realizar la solicitud GET a la API REST
    axios
      .get(
        `https://sadecv.sysdatec.com/SPRIMESERVICES/wsocr/api/WF_Files/${item.CodeReceivMail}`
      )
      .then((response) => {
        // Obtener los datos de la respuesta
        const newFilesData = response.data.map((file) => ({
          fileName: file.fileName,
          extension: file.extension,
          base64File: file.base64File,
        }));

        console.log(newFilesData);

        setFilesData(newFilesData);
        setShowTable(true);
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error("Error al realizar la solicitud GET:", error);
      });
  };

  const handleUpdateRecModalOpen = (item) => {
    // Realizar la solicitud POST a la API REST
    axios
      .post("https://sadecv.sysdatec.com/MailBox/PostUpdates", {
        TipoCorreo: 1,
        CodeReceivMail: item.CodeReceivMail,
      })
      .then((response) => {
        // Obtener los datos de la respuesta
        const UpdateData = response.data.map((update) => ({
          Asignado: update.Asignado,
          Responsable: update.Responsable,
          DiasGestion: update.Dias,
        }));

        console.log(UpdateData);

        setUpdateData(UpdateData);
        setShowTableUpdate(true);
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error("Error al realizar la solicitud POST:", error);
      });
  };

  const MyDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    return (
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Selecciona una fecha"
        className="my-1 datepickerss"
      />
    );
  };

  function SelectBox() {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const renderInputField = () => {
      if (selectedOption === "Comentario") {
        return (
          <div>
            <Title>Comentario:</Title>
            <TextInput
              className="my-1"
              placeholder="Ingrese un comentario al paso actual"
            />
          </div>
        );
      } else if (selectedOption === "Gestion") {
        return (
          <div>
            <Title>Observacion:</Title>
            <TextInput
              className="my-1"
              placeholder="Ingrese una observacion a la gestion actual"
            />
          </div>
        );
      } else if (selectedOption === "Respuesta") {
        return (
          <div>
            <Title>Comentario:</Title>
            <TextInput
              className="my-1"
              placeholder="Ingrese un comentario para responder al ciudadano"
            />
          </div>
        );
      } else if (selectedOption === "Email") {
        return (
          <div>
            <Title>Email:</Title>
            <TextInput
              className="my-1"
              type="email"
              placeholder="Ingrese un correo electrónico"
            />
            <Title>Comentario:</Title>
            <TextInput
              className="my-1"
              placeholder="Ingrese un comentario para el correo a enviar"
            />
          </div>
        );
      } else {
        return null;
      }
    };

    return (
      <div>
        <select
          value={selectedOption}
          onChange={handleChange}
          className="seleccion"
        >
          <option value="">Selecciona una opción</option>
          <option value="Comentario" className="my-1">
            Añadir Comentario
          </option>
          <option value="Gestion" className="my-1">
            Gestionar Radicado
          </option>
          <option value="Respuesta" className="my-1">
            Responder al Ciudadano
          </option>
          <option value="Email" className="my-1">
            Responder por Correo Electronico
          </option>
        </select>
        {renderInputField()}
      </div>
    );
  }

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    // Realiza las acciones necesarias con el valor seleccionado
  };

  function Medalla({ status }) {
    let badgeColorClass = "";

    // console.log(status);

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

    // console.log(priority);

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
    // setNumRadicado("");
    // SetAsunto("");
    // setObservaciones("");
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
                    onClick={() => {
                      // setGestionModal(true);
                      // setNumRadicado(item.CodeReceivMail);
                      // SetAsunto(item.Subject);
                      // setObservaciones(item.Observations);
                      handleGestionModalOpen(item);
                      handleUpdateRecModalOpen(item);
                    }}
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
              <Modal
                estado={gestionModal}
                cambiarEstado={setGestionModal}
                // titulo={"Asunto: " + (Asunto && Asunto + " ")}
                titulo={
                  <span style={{ fontSize: 20 }}>
                    {"Asunto: " + (Asunto && Asunto + " ")}
                  </span>
                }
              >
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
                          <Title>
                            N° Radicado: {NumRadicado && NumRadicado + " "}
                          </Title>

                          {showTable && (
                            <Table className="custom-table">
                              <TableHead>
                                <TableRow>
                                  <TableHeaderCell>
                                    Archivos Cargados
                                  </TableHeaderCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {filesData.map((file, index) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                      <a
                                        href={`data:application/octet-stream;base64,${file.base64File}`}
                                        download={`${file.fileName}.${file.extension}`}
                                      >
                                        {file.fileName}.{file.extension}
                                      </a>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          )}
                        </Card>
                      </Col>

                      {/* KPI sidebar */}
                      <Col numColSpanLg={4}>
                        <div className="space-y-2">
                          <Card>
                            <Title>Detalles del radicado:</Title>
                            <textarea
                              className="my-1 textarea-expandido"
                              placeholder=""
                              value={Observaciones && Observaciones + " "}
                            ></textarea>
                            {/* <Editor className="my-1"placeholder="Detalles"/> */}
                            {/* <TextInput className="my-1" placeholder="" /> */}
                            <Title>Acciones:</Title>
                            <SelectBox
                              className="my-1 seleccion"
                              onChange={handleSelectChange}
                            ></SelectBox>
                            <Title>Fecha de Vencimiento del Paso Actual:</Title>
                            <MyDatePicker
                              className="my-1 seleccion"
                              placeholder=""
                            />
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
                            <Title>Flujo variable</Title>
                            {showTableUpdate && (
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableHeaderCell>
                                      Actualizaciones
                                    </TableHeaderCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {UpdateData.map((update, index) => (
                                    <React.Fragment key={index}>
                                      <TableRow>
                                        <TableCell>
                                          Asignado: {update.Asignado}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>
                                          Responsable: {update.Responsable}
                                        </TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell>
                                          Dias: {update.DiasGestion}
                                        </TableCell>
                                      </TableRow>
                                    </React.Fragment>
                                  ))}
                                </TableBody>
                              </Table>
                            )}
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
