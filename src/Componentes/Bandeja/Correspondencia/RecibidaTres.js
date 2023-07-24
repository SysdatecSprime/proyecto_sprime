import React, {useState} from "react";
import Position from "./Position";
import {
  Grid,
  Col,
  TextInput,
  Flex,
  Title,
  Subtitle,
  Text,
  Button,
  Icon,
  Card
} from "@tremor/react";
import {FolderDownloadIcon} from "@heroicons/react/outline";

function RecibidaTres(props) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <>
      <Grid numCols={1} numColsSm={1} numColsLg={4} className="gap-2">
        <Col numColSpan={1} numColSpanLg={4} className="mt-5">
          <div>
            <Position
              paso={props.paso}
              setPaso={(paso) => props.setRecibidoPasoUno(paso)}
            />
          </div>
        </Col>
      </Grid>
      <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2">
        <Col numColSpan={1} numColSpanLg={1}>
          <Title>Detalle de la correspondencia</Title>
        </Col>{" "}
        <Flex className="justify-content-start">
          <Subtitle>Destinatario: {props.formFields.SenderName}</Subtitle>
          <Text className="mx-3"></Text>
        </Flex>
        <Flex className="justify-content-start">
          <Subtitle>
            Clase de correspondencia: {props.formFields.MailClassName}
          </Subtitle>
          <Text className="mx-3 "></Text>
        </Flex>
        <Flex className="justify-content-start">
          <Subtitle>Remitente: {props.formFields.LegalName}</Subtitle>
          <Text className="mx-3"></Text>
        </Flex>
        <Flex className="justify-content-start">
          <Subtitle>Observaciones: {props.formFields.Observations}</Subtitle>
          <Text className="mx-3"></Text>
        </Flex>
      </Grid>
      <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2">
        <Col numColSpan={1} numColSpanLg={1}>
          <Title>Archivos cargados</Title>
        </Col>{" "}
        {props.formFields.Files.map((file, index) => {
          return (
            <TextInput key="index" placeholder={file.name} disabled={true} />
          );
        })}
      </Grid>
      {/* <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2">
        <Col numColSpan={1} numColSpanLg={1}>
          <Title>Relacion de expediente</Title>
        </Col>{" "}
        <Flex className="justify-content-start">
          <Icon
            className="bandejaIcons"
            size="sm"
            variant="solid"
            tooltip="Carpeta"
            icon={FolderDownloadIcon}
          />
          <Text>N° de expediente</Text>
        </Flex>
      </Grid> */}
      <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2">
        <Col numColSpan={1} numColSpanLg={1}>
          <Title>Flujo</Title>
        </Col>{" "}
        <TextInput placeholder="Disabled" disabled={true} />
      </Grid>

      <Grid numCols={1} numColsSm={2} numColsLg={1} className="gap-2 mt-3">
        <Flex justifyContent="end" className="space-x-2">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              props.setRecibidoPasoUno(2);
            }}
          >
            Atrás
          </Button>

          <Button
            size="lg"
            variant="primary"
            to="/Corresp"
            onClick={() => {
              props.CrearRecibida(1);
            }}
          >
            Guardar
          </Button>
        </Flex>
      </Grid>
    </>
  );
}

export default RecibidaTres;
