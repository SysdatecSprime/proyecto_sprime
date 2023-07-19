import React, {useState} from "react";
import {Form, Row, Col, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function ConsultarRadicado(props) {
  const [numeroRadicado, setNumeroRadicado] = useState("");
  const [numeroCedula, setNumeroCedula] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <h1 style={{textAlign: "center", marginLeft: "auto"}}>
        Consulta tu solicitud
      </h1>

      <Form
        className="container d-flex gap-5 flex-column"
        style={{marginTop: "60px"}}
      >
        <Form.Group
          style={{width: "30%", margin: "auto", minWidth: "250px"}}
          controlId="NumeroDeRadicado"
        >
          <Form.Label>No. del Radicado</Form.Label>
          <Form.Control
            name="numeroRadicado"
            onChange={(e) => setNumeroRadicado(e.target.value)}
            value={numeroRadicado}
            type="text"
          />
          <Button
            style={{marginTop: "20px"}}
            onClick={() => {
              navigate(`/Contraloria/TablesView?IdRadicado=${numeroRadicado}`);
            }}
          >
            Consultar por número de radicado
          </Button>
        </Form.Group>
        <Form.Group
          style={{width: "30%", margin: "auto", minWidth: "250px"}}
          controlId="NumeroDeCedula"
        >
          <Form.Label>No. de Cédula</Form.Label>
          <Form.Control
            name="numeroRadicado"
            onChange={(e) => setNumeroCedula(e.target.value)}
            value={numeroCedula}
            type="text"
          />
          <Button
            style={{marginTop: "20px"}}
            onClick={() => {
              navigate(`/Contraloria/Radicado?id=${numeroCedula}`);
            }}
          >
            Consultar por cédula
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
export default ConsultarRadicado;
