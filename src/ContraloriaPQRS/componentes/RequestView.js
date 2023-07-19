import React, {useState, useEffect} from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {tiposSolicitud} from "../utils/examples";
import {BaseUrl} from "../utils/UrlBase";

function Request(props) {
  const [validated, setValidated] = useState(false);
  const [tiposSolicitud, setTiposSolicitud] = useState([]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() === true) {
      props.setPaso(3);
    }
  };

  let formFields = props.formFields;

  useEffect(() => {
    const getTiposSolicitud = async () => {
      try {
        const response = await fetch(`${BaseUrl}/PQRS`);
        const data = await response.json();
        const tiposSolicitud = data.map((element) => ({
          nombre: element.mailDesc,
          id: element.idMailClass
        }));
        setTiposSolicitud(tiposSolicitud);
      } catch (error) {
        console.log(error);
      }
    };

    getTiposSolicitud();
  }, []);

  return (
    <div className="container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="m-3">
          <div className="fs-3 fw-bold">Información de solicitud</div>
        </Row>
        <Row className="m-3">
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom01"
            className="py-3"
          >
            <Form.Label>Tipo de solicitud</Form.Label>
            <Form.Select
              name="applicationType"
              onChange={(e) => props.handleChange(e)}
              value={formFields.applicationType}
              type="text"
              id="validationCustom1"
              disabled={tiposSolicitud.length === false}
            >
              <option value="">Seleccione...</option>
              {tiposSolicitud.map((element, index) => {
                return (
                  <option key={index} value={element.id}>
                    {element.nombre}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            className="py-3"
            controlId="validationCustom02"
          >
            <Form.Label>Año de los hechos</Form.Label>
            <Form.Control
              type="text"
              maxLength={4}
              pattern="^(19[0-9][0-9]|20[0-9][0-9])$"
              name="year"
              value={formFields.year}
              onChange={(e) => props.handleChange(e)}
              required
            />
          </Form.Group>
        </Row>
        {formFields.applicationType === "69" && (
          <Row className="m-3">
            <Form.Group
              as={Col}
              md="6"
              className="py-3"
              controlId="validationCustom01"
              required
              name="entityInvolved"
              value={formFields.entityInvolved}
              onChange={(e) => props.handleChange(e)}
            >
              <Form.Label>Entidad involucrada</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Row>
        )}
        <Row className="m-3">
          <Form.Group
            as={Col}
            md="12"
            className="py-3"
            controlId="validationCustom01"
          >
            <Form.Label>Descripción de la solicitud</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              type="email"
              name="applicationDescription"
              value={formFields.applicationDescription}
              onChange={(e) => props.handleChange(e)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="m-4 d-flex justify-content-end">
          <Form.Group as={Col} className="d-flex justify-content-end py-2">
            <Button onClick={() => props.setPaso(1)} className="boton-back">
              Anterior
            </Button>
            <Button type="submit" className="boton-next">
              Siguiente
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}

export default Request;
