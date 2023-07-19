import React, {useEffect, useState} from "react";
import {Col, Row, Form, Button, Spinner} from "react-bootstrap";
import DragDropFile from "./DragDrop";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterRequest(props) {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [tipoSolicitud, setTipoSolicitud] = useState("");
  const [descripcionSolictud, setDescripcionSolicitud] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [empresa, setEmpresa] = useState("");
  const [cargando, setCargando] = useState(false);

  const tiposSolicitud = [
    {value: 1, label: "Soporte"},
    {value: 2, label: "Falla técnica"},
    {value: 3, label: "Solicitud"},
    {value: 4, label: "Reclamo"}
  ];

  async function handleSubmitPqrs(e, documentos) {
    setCargando(true);
    try {
      //HACER COSAS
      Swal.fire({
        title: `Radicado N°10`,
        text: "Solicitud Cargada con EXITO",
        icon: "success",
        confirmButtonText: "Consultar Solicitud"
      }).then((result) => {
        navigate("/SprimePQRS/");
      });
    } catch (e) {
      Swal.fire({
        title: "¡Error!",
        text: "No hemos podido cargar tu solicitud, inténtalo más tarde",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
    } finally {
      setCargando(false);
    }
    console.log("documentos", documentos);
  }

  return (
    <>
      <Form>
        <Row style={{margin: "auto"}}>
          <Form.Group as={Col} xs="6" className="py-2">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs="6" className="py-2">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              name="email"
              onChange={(e) => setCorreo(e.target.value)}
              value={correo}
              type="correo"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
            />
            <Form.Control.Feedback type="invalid">
              Ingresa el correo
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs="6" className="py-2">
            <Form.Label>Empresa</Form.Label>
            <Form.Control
              name="empresa"
              onChange={(e) => setEmpresa(e.target.value)}
              value={empresa}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs="6" className="py-2">
            <Form.Label>Tipo de solicitud</Form.Label>
            <Form.Select
              name="tipoSolictud"
              onChange={(e) => setTipoSolicitud(e.target.value)}
              value={tipoSolicitud}
              type="text"
              id="validationCustom1"
              disabled={tiposSolicitud.length === 0}
            >
              <option value="">Seleccione...</option>
              {tiposSolicitud.map((element, index) => {
                return (
                  <option key={index} value={element.value}>
                    {element.label}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row style={{margin: "auto"}}>
          <Form.Group as={Col} xs="12" className="py-2">
            <Form.Label>Descripción de la solicitud</Form.Label>
            <Form.Control
              name="descripcionSolictud"
              onChange={(e) => setDescripcionSolicitud(e.target.value)}
              value={descripcionSolictud}
              type="text"
              required
              multiple
            />
          </Form.Group>
        </Row>
      </Form>
      <div className="container">
        <div className="container main-upload ">
          <div className="py-5 px-3">
            <h4 className="title-drag">
              Seleccione o arrastre el anexo que desea agregar.
            </h4>
            <p className="paragraph">
              El archivo debe tener una extensión, por ejemplo (archivo.ext)
              Puede adjuntar archivos de tipo: (.pdf) (.jpg) (.png) (.gif)(.bmp)
              (.doc) (.docx) (.xls) (.xlsx) (.zip) (.rar) (.tif) (.mp3) (.mp4)
              Tamaño máximo permitido por archivo: 25MB
            </p>
          </div>
          <DragDropFile
            multiple={true}
            label="Arrastra"
            fileType={[
              "application/pdf",
              "image/png",
              "image/jpeg",
              "image/gif",
              "image/bmp",
              "text/doc",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "application/vnd.ms-excel",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "application/zip",
              "application/x-rar-compressed",
              "image/tiff",
              "audio/mpeg",
              "video/mp4"
            ]}
            setFiles={setDocumentos}
          />
        </div>

        <div className="center d-flex justify-content-end py-5">
          <Row className="d-flex justify-content-end">
            <Form.Group as={Col} mt="">
              <Button
                onClick={(e) => {
                  navigate("/SprimePQRS/");
                }}
                className="boton-next"
              >
                {<span>Volver</span>}
              </Button>
            </Form.Group>
            <Form.Group as={Col} mt="">
              <Button
                disabled={cargando}
                onClick={(e) => {
                  handleSubmitPqrs(e, documentos);
                }}
                className="boton-next"
              >
                {
                  // Este es el Loader
                  cargando ? <Spinner size="sm" /> : <span>Registrar</span>
                }
              </Button>
            </Form.Group>
          </Row>
        </div>
      </div>
    </>
  );
}
