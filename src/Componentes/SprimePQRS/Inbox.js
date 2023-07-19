/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import TitlesLabel from "./TitlesLabel";
import {Button, Spinner, Row, Col, Form} from "react-bootstrap";
import DetalleRadicado from "./DetalleRadicado";
import {useNavigate, useSearchParams} from "react-router-dom";
import {emailBaseUrl} from "./utils/UrlBase";
import {Mensaje, MensajeError} from "./Mensajes";
import "./styles/inbox.css";
import {useState} from "react";
import Swal from "sweetalert2";

export default function Inbox() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const numeroDocumento = searchParams.get("id");

  const [loadingRequests, setLoadingRequests] = useState(true);
  const [radicados, setRadicados] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [sendingVerificationCode, setSendingVerificationCode] = useState(false);
  const [correo, setCorreo] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);

  function goBack() {
    navigate("/SprimePQRS/");
  }

  async function sendVerificationCode(e) {
    e.preventDefault();
    setSendingVerificationCode(true);
    try {
      const sendCodeProm = await fetch(
        `${emailBaseUrl}/api/Spr_CodeValidator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: correo,
            /* idCode: 1, */
            code: " ",
            dateGenerated: "2023-03-03",
            expiryDate: "2023-03-03",
            validated: 0,
            active: true
          })
        }
      );

      if (sendCodeProm.ok) {
        Mensaje(
          "Un código de verificación ha sido enviado a tu correo, ingrésalo en el campo de verificación"
        );
        setVerificationCodeSent(true);
      } else {
        MensajeError(
          "Ocurrió un error al enviar el código de verificación, intenta de nuevo"
        );
      }
    } catch (e) {
      MensajeError(
        "Ocurrió un error al enviar el código de verificación, intenta de nuevo"
      );
    } finally {
      setSendingVerificationCode(false);
    }
  }

  async function getRequests() {
    /* try {
      const data = await fetch(
        `${cargaRadicadosUrl}/api/CRCCorreoRecibidoes/${numeroDocumento}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const response = await data.json();
      if (data.ok && response.length > 0) {
        setRadicados(response);
      } else {
        Swal.fire({
          title: "Cédula No encontrada",
          text: "Error",
          icon: "error",
          confirmButtonText: "Regresar"
        }).then((result) => {
          navigate(`/ConsultarRadicado`);
        });
      }
      console.log(response);
    } catch (e) {
      Swal.fire({
        title: "Cédula No encontrada",
        text: "Error",
        icon: "error",
        confirmButtonText: "Regresar"
      }).then((result) => {
        navigate(`/ConsultarRadicado`);
      });
    }

    setLoadingRequests(false); */
  }

  return (
    <>
      {!authenticated ? (
        <div className="query-card">
          <h2>Consulta tus solicitudes</h2>
          <Row>
            <Form
              onSubmit={(e) => {
                if (!sendingVerificationCode) {
                  sendVerificationCode(e);
                }
              }}
            >
              <Form.Group as={Col} xs="12" className="py-2">
                <Form.Control
                  name="email"
                  onChange={(e) => setCorreo(e.target.value)}
                  value={correo}
                  type="correo"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  required
                  placeholder="Correo electrónico"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa el correo
                </Form.Control.Feedback>
              </Form.Group>
              <Col xs="12" className="py-2">
                <Button type="submit">
                  {sendingVerificationCode ? (
                    <Spinner size="sm" />
                  ) : (
                    "Enviar código de verificación"
                  )}
                </Button>
              </Col>
            </Form>
            {verificationCodeSent && (
              <Form.Group as={Col} xs="12">
                <Form.Control
                  name="verificationCode"
                  onChange={(e) => setVerificationCode(e.target.value)}
                  value={verificationCode}
                  type="text"
                  required
                  placeholder="Código de verificación"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa el correo
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Row>
        </div>
      ) : loadingRequests ? (
        <div className="d-flex align-items-center justify-content-center mt-4">
          <Spinner size="md" />
        </div>
      ) : (
        <div className="container py-5">
          {radicados.length > 0 ? (
            <>
              <TitlesLabel
                titulo={`Hola ${radicados[0].personaRemite}`}
                parrafo="Estas son tus solicitudes:"
              />
              <div className="legend">
                <div className="semaforo">
                  <div>
                    <div className="inbox-convention-text">Resuelto</div>
                    <div className="inbox-convention-color green"></div>
                  </div>
                  <div>
                    <div className="inbox-convention-text">En Revisión</div>
                    <div className="inbox-convention-color yellow"></div>
                  </div>
                  <div>
                    <div className="inbox-convention-text">
                      Inactivo/Rechazado
                    </div>
                    <div className="inbox-convention-color red"></div>
                  </div>
                </div>
              </div>

              <div className="shadow p-5 mb-5 bg-body-tertiary rounded">
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Buscar"
                />

                <div className="table-responsive">
                  <table className="table table-hover mt-4">
                    <>
                      <thead>
                        <tr>
                          <th>No. Radicado</th>
                          <th>Tipo de solicitud</th>
                          <th>Asunto</th>
                          <th>Fecha de creación</th>
                          <th className="text-center">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {radicados.map((request, index) => {
                          return (
                            <DetalleRadicado
                              key={`tabla-${index}`}
                              radicado={request}
                            />
                          );
                        })}
                      </tbody>
                    </>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Spinner size="md" />
            </div>
          )}

          <Button
            onClick={goBack}
            style={{
              backgroundColor: "#0856af"
            }}
          >
            Atrás
          </Button>
        </div>
      )}
    </>
  );
}
