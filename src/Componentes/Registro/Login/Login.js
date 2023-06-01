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

function Login() {
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
            <TextInput placeholder="" />
            <Title className="my-2">Tipo de Autenticacion:</Title>
            <TextInput placeholder="" />
            <Title className="my-2">Ingresa Correo Electrónico:</Title>
            <TextInput placeholder="" />
            <Title className="my-2">Ingresa Contraseña:</Title>
            <TextInput placeholder="" />

            <Button
              className="my-3 w-100"
              size="xl"
              onClick={() => console.log("clicked")}>
              Iniciar Sesión
            </Button>
            <Flex justifyContent="center" className="space-x-2 ">
              <Button
                size="lg"
                variant="light"
                onClick={() => console.log("clicked")}>
                Recordar Contraseña
              </Button>
            </Flex>
          </Col>
        </Grid>
      </Card>
    </div>
  );
}
export default Login;
