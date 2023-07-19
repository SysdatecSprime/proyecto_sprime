import {useState} from "react";
import styled, {keyframes} from "styled-components";
import {Spinner, Col, Form, Row, Button} from "react-bootstrap";
import DragDropFile from "./DragDrop";
import {BiLoader} from "react-icons/bi";

function DragAndDrop(props) {
  const [documentos, setDocumentos] = useState([]);

  return (
    <div className="container">
      <Row className="m-3">
        <div className="fs-3 fw-bold">Soportes y Anexos</div>
      </Row>
      <div className="container main-upload ">
        <div className="py-5 px-3">
          <h4 className="title-drag">
            Seleccione o arrastre el anexo que desea agregar.
          </h4>
          <p className="paragraph">
            El archivo debe tener una extensión, por ejemplo (archivo.ext) Puede
            adjuntar archivos de tipo: (.pdf) (.jpg) (.png) (.gif)(.bmp) (.doc)
            (.docx) (.xls) (.xlsx) (.zip) (.rar) (.tif) (.mp3) (.mp4) Como
            excepción a la regla, los tipos *.mp3 y *.mp4 pueden subirse hasta
            de 25Mb en tamaño
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
            <Button onClick={() => props.setPaso(2)} className="boton-back">
              Anterior
            </Button>
          </Form.Group>
          <Form.Group as={Col} mt="">
            <Button
              disabled={props.cargando}
              onClick={(e) => {
                props.handleSubmitPqrs(e, documentos);
              }}
              className="boton-next"
            >
              {
                // Este es el Loader
                props.cargando ? <Spinner size="sm" /> : <span>Registrar</span>
              }
            </Button>
          </Form.Group>
        </Row>
      </div>
    </div>
  );
}
export default DragAndDrop;

const StyleDragArea = styled.div`
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .file-upload-content {
    display: none;
    text-align: center;
  }

  .file-upload-input {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 60%;
    height: 35%;
    outline: none;
    opacity: 0;
    cursor: pointer;
  }

  .image-upload-wrap {
    display: flex;
    justify-content: center;
    height: 350px;
    width: 1290px;
    top: 37.2%;
    bottom: 8.19%;
    background: #f9f9fb;
    border: 1px dashed #d2d7e5;
    border-radius: 16px;
  }
  .text-information {
    margin-top: 30px;
    text-align: center;
  }

  img {
    border: none;
    margin-top: 30px;
    height: 100px;
    width: 100px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatingDiv = styled.div`
  animation: ${rotate} 2s linear infinite;
`;
