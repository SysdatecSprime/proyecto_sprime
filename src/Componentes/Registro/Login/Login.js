import {
  Card,
  Title,
  TextInput,
  Button,
  Grid,
  Col,
  Metric,
  Flex,
} from "@tremor/react";
import Sade from "../images/LogoSprime.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Modal } from "react-bootstrap";

const SelectBox = ({ url, valueKey, labelKey }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;

        const mappedOptions = data.map((item) => ({
          value: item[valueKey],
          label: item[labelKey],
        }));

        setOptions(mappedOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchData();
  }, [url, valueKey, labelKey]);

  return <Select options={options} placeholder="Seleccione una Opcion" />;
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLogin = () => {
    axios
      .post("https://sadecv.sysdatec.com/Security/Users/Login", {
        username,
        password,
      })
      .then((response) => {
        // Maneja la respuesta exitosa del inicio de sesión
        setModalMessage("Inicio de sesión exitoso");
        setShowModal(true);
      })
      .catch((error) => {
        // Maneja cualquier error que ocurra durante el inicio de sesión
        setModalMessage("Error en el inicio de sesión");
        setShowModal(true);
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="w-50 p-3 mt-5" decoration="top" decorationColor="indigo">
        <Grid numCols={1} numColsSm={1} numColsLg={2}>
          <Col numColSpan={1} numColSpanLg={1} className="mx-2 mb-2">
            <div className="h-100 w-100 p-5">
              <img src={Sade} width="100%" alt=""></img>
            </div>
          </Col>
          <Col numColSpan={1} numColSpanLg={1} className="mx-2">
            <Metric className="d-flex justify-content-center mb-3">
              Bienvenidos
            </Metric>
            <Title className="my-2">Seleccione la Empresa:</Title>
            <SelectBox
              url="https://sadecv.sysdatec.com/Configs/Bussiness/GetBussiness"
              valueKey="IdBusiness"
              labelKey="BusinessDesc"
            />
            <Title className="my-2">Metodo de Autenticacion:</Title>
            <TextInput value="TRADICIONAL" placeholder="" readOnly />

            <Title className="my-2">Usuario:</Title>
            <TextInput
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Title className="my-2">Contraseña:</Title>
            <TextInput
              placeholder=""
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="my-3 w-100" size="xl" onClick={handleLogin}>
              Iniciar Sesión
            </Button>

            <Flex justifyContent="center" className="space-x-2 ">
              <Button
                size="lg"
                variant="light"
                onClick={() => console.log("clicked")}
              >
                Recordar Contraseña
              </Button>

              <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Resultado del inicio de sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => setShowModal(false)}>Cerrar</Button>
                </Modal.Footer>
              </Modal>
            </Flex>
          </Col>
        </Grid>
      </Card>
    </div>
  );
}
export default Login;
