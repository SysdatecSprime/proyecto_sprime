import {
  Card,
  Col,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";
import UsuariosActivosDonut from "./UsuariosActivosDonut";

const UsuariosActivos = () => {
  return (
    <div>
      <Grid numColsLg={12} className="gap-4 w-full">
        <Col numColSpanLg={3}>
          <UsuariosActivosDonut />
        </Col>
        <Col numColSpanLg={9}>
          <Card>
            <Title>Usuarios Activos</Title>
            <Table>
              <TableHead className="block w-[calc(100%-1em)] pr-6">
                <TableRow className="table w-full table-fixed">
                  <TableHeaderCell>Nombre</TableHeaderCell>
                  <TableHeaderCell>Correo</TableHeaderCell>
                  <TableHeaderCell>Ubicación</TableHeaderCell>
                  <TableHeaderCell>Radicados totales</TableHeaderCell>
                  <TableHeaderCell>Radicados Activos</TableHeaderCell>
                  <TableHeaderCell>Radicados Inactivos</TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody className="block h-[300px] overflow-y-auto overflow-x-hidden pr-5">
                <TableRow className="table w-full table-fixed">
                  <TableCell>Nombre 1</TableCell>
                  <TableCell>Correo 1</TableCell>
                  <TableCell>Ubicación 1</TableCell>
                  <TableCell>Radicados totales 1</TableCell>
                  <TableCell>Radicados Activos 1</TableCell>
                  <TableCell>Radicados Inactivos 1</TableCell>
                </TableRow>
                <TableRow className="table w-full table-fixed">
                  <TableCell>Nombre 2</TableCell>
                  <TableCell>Correo 2</TableCell>
                  <TableCell>Ubicación 2</TableCell>
                  <TableCell>Radicados totales 2</TableCell>
                  <TableCell>Radicados Activos 2</TableCell>
                  <TableCell>Radicados Inactivos 2</TableCell>
                </TableRow>
                <TableRow className="table w-full table-fixed">
                  <TableCell>Nombre 3</TableCell>
                  <TableCell>Correo 3</TableCell>
                  <TableCell>Ubicación 3</TableCell>
                  <TableCell>Radicados totales 3</TableCell>
                  <TableCell>Radicados Activos 3</TableCell>
                  <TableCell>Radicados Inactivos 3</TableCell>
                </TableRow>
                <TableRow className="table w-full table-fixed">
                  <TableCell>Nombre 4</TableCell>
                  <TableCell>Correo 4</TableCell>
                  <TableCell>Ubicación 4</TableCell>
                  <TableCell>Radicados totales 4</TableCell>
                  <TableCell>Radicados Activos 4</TableCell>
                  <TableCell>Radicados Inactivos 4</TableCell>
                </TableRow>
                <TableRow className="table w-full table-fixed">
                  <TableCell>Nombre 5</TableCell>
                  <TableCell>Correo 5</TableCell>
                  <TableCell>Ubicación 5</TableCell>
                  <TableCell>Radicados totales 5</TableCell>
                  <TableCell>Radicados Activos 5</TableCell>
                  <TableCell>Radicados Inactivos 5</TableCell>
                </TableRow>
                <TableRow className="table w-full table-fixed">
                  <TableCell>Nombre 6</TableCell>
                  <TableCell>Correo 6</TableCell>
                  <TableCell>Ubicación 6</TableCell>
                  <TableCell>Radicados totales 6</TableCell>
                  <TableCell>Radicados Activos 6</TableCell>
                  <TableCell>Radicados Inactivos 6</TableCell>
                </TableRow>
                <TableRow className="table w-full table-fixed">
                  <TableCell>Nombre 7</TableCell>
                  <TableCell>Correo 7</TableCell>
                  <TableCell>Ubicación 7</TableCell>
                  <TableCell>Radicados totales 7</TableCell>
                  <TableCell>Radicados Activos 7</TableCell>
                  <TableCell>Radicados Inactivos 7</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Col>
      </Grid>
    </div>
  );
};

export default UsuariosActivos;
