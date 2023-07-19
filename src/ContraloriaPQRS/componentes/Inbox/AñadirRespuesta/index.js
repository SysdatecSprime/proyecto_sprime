import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { useState } from "react";
import styled from "styled-components";
import DragDropFile from "../../DragDrop";

export default function AñadirRespuesta({ descripcion }) {
  const [show, setShow] = useState(false);
  const [documentos, setDocumentos] = useState([]);

  console.log(documentos);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <>
      <Button className={styles.btn} onClick={handleShow}>
        Responder
      </Button>
      {show && (
        <Overlay>
          <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Body className={styles.container}>
              <h3 className={styles.title}>Respuesta</h3>
              <div>
                <h4 className="h5">Descripción</h4>
                <p>{descripcion}</p>
              </div>
              <div>
                <h4 className="h5">Respuesta</h4>
                <div className={styles.response}>
                  <div className={styles.dragAndDrop}>
                    <DragDropFile
                      multiple={false}
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
                        "video/mp4",
                      ]}
                      setFiles={setDocumentos}
                    />
                    <Button
                      className={styles.backBtn}
                      variant="secondary"
                      onClick={handleClose}
                    >
                      Cancelar
                    </Button>
                  </div>

                  <Form onSubmit={handleSubmit} className={styles.form}>
                    <Form.Group controlId="Detalles">
                      <Form.Label>
                        Descripcion de los archivos anexados
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        style={{ height: "200px" }}
                        placeholder="Si deseas, puedes escribir información relacionada con los archivos anexados..."
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      className={[styles.btn, styles.submitBtn]}
                    >
                      Enviar
                    </Button>
                  </Form>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </Overlay>
      )}
    </>
  );
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
