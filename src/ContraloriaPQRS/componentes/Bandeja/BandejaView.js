import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import { useState, useEffect } from "react";
import {
  Card,
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableRow,
  Icon,
  SelectBox,
  SelectBoxItem,
  Grid,
  Col,
  TableCell,
} from "@tremor/react";
import {
  FolderOpenIcon,
  GlobeIcon,
  MailIcon,
  InboxInIcon,
  PaperClipIcon,
  PencilIcon,
  ArchiveIcon,
  DocumentIcon,
  ShareIcon,
  CalculatorIcon,
} from "@heroicons/react/outline";
import MainCorrespondencia from "./MainCorrepondencia";

function Bandeja({ radicados, tipoCorrespondencia, crearNuevo }) {
  if (crearNuevo === true) {
    return (
      <Card>
        <MainCorrespondencia />
      </Card>
    );
  }
  return (
    <>
      <Card>
        {(tipoCorrespondencia === 1 ||
          tipoCorrespondencia === 2 ||
          tipoCorrespondencia === 3) && (
          <Grid
            numCols={2}
            numcolsxs={1}
            numColsSm={1}
            numColsLg={2}
            className="gap-2">
            <Col numColSpan={1} numColSpanLg={1}>
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Carpeta"
                icon={FolderOpenIcon}
              />
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Global"
                icon={GlobeIcon}
              />
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Correo"
                icon={MailIcon}
              />
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Descarga"
                icon={InboxInIcon}
              />
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Adjuntar"
                icon={PaperClipIcon}
              />
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Editar"
                icon={PencilIcon}
              />
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Archivo"
                icon={ArchiveIcon}
              />
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Documento"
                icon={DocumentIcon}
              />
              <Icon
                className="bandejaIcons"
                size="sm"
                variant="solid"
                tooltip="Sum of Sales"
                icon={ShareIcon}
              />
            </Col>
            <Col numColSpan={1} numColSpanLg={1}>
              <SelectBox
                onValueChange={value => console.log("the new value is", value)}
                defaultValue="1">
                <SelectBoxItem
                  value="1"
                  text="Kilometers"
                  icon={CalculatorIcon}
                />
                <SelectBoxItem value="2" text="Meters" icon={CalculatorIcon} />
                <SelectBoxItem value="3" text="Miles" icon={CalculatorIcon} />
                <SelectBoxItem
                  value="4"
                  text="Nautical Miles"
                  icon={CalculatorIcon}
                />
              </SelectBox>
            </Col>
          </Grid>
        )}
        <Table className="mt-4">
          {tipoCorrespondencia === 1 && (
            <>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>
                    <input type="checkbox"></input>
                  </TableHeaderCell>
                  <TableHeaderCell>N° de radicado</TableHeaderCell>
                  <TableHeaderCell>Clase de Correspondencia</TableHeaderCell>
                  <TableHeaderCell>Tipificacion</TableHeaderCell>
                  <TableHeaderCell>Estado de correo</TableHeaderCell>
                  <TableHeaderCell>Remitente</TableHeaderCell>
                  <TableHeaderCell>Asunto</TableHeaderCell>
                  <TableHeaderCell>Responsable</TableHeaderCell>
                  <TableHeaderCell>Fecha de registro</TableHeaderCell>
                  <TableHeaderCell>Fecha de vencimiento</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {radicados?.map(item => (
                  <TableRow key={item.IdMailReceived}>
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>{item.IdMailReceived}</TableCell>
                    <TableCell>{item.IdMailClass}</TableCell>
                    <TableCell>{item.IdTypification}</TableCell>
                    <TableCell>{item.IdMailStatus}</TableCell>
                    <TableCell>{item.SenderName}</TableCell>
                    <TableCell>{item.Subject}</TableCell>
                    <TableCell>{item.IdUserName}</TableCell>
                    <TableCell>{item.FromDate}</TableCell>
                    <TableCell>{item.ToDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          )}
          {tipoCorrespondencia === 2 && (
            <>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>
                    <input type="checkbox"></input>
                  </TableHeaderCell>
                  <TableHeaderCell>N° de radicado</TableHeaderCell>
                  <TableHeaderCell>Clase de Correspondencia</TableHeaderCell>
                  <TableHeaderCell>Tipificacion</TableHeaderCell>
                  <TableHeaderCell>Estado de correo</TableHeaderCell>
                  <TableHeaderCell>Remitente</TableHeaderCell>
                  <TableHeaderCell>Asunto</TableHeaderCell>
                  <TableHeaderCell>Responsable</TableHeaderCell>
                  <TableHeaderCell>Fecha de registro</TableHeaderCell>
                  <TableHeaderCell>Fecha de vencimiento</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {radicados?.map(item => (
                  <TableRow key={item.IdMailSent}>
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>{item.IdMailSent}</TableCell>
                    <TableCell>{item.IdMailClass}</TableCell>
                    <TableCell>{item.IdTypification}</TableCell>
                    <TableCell>{item.IdMailStatus}</TableCell>
                    <TableCell>{item.SenderName}</TableCell>
                    <TableCell>{item.Subject}</TableCell>
                    <TableCell>{item.nombreUsuario}</TableCell>
                    <TableCell>{item.FromDate}</TableCell>
                    <TableCell>{item.ToDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          )}
          {tipoCorrespondencia === 3 && (
            <>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>
                    <input type="checkbox"></input>
                  </TableHeaderCell>
                  <TableHeaderCell>Usuario</TableHeaderCell>
                  <TableHeaderCell>Dependencia</TableHeaderCell>
                  <TableHeaderCell>Compañia</TableHeaderCell>
                  <TableHeaderCell>Negocio</TableHeaderCell>
                  <TableHeaderCell>Asunto</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {radicados?.map(item => (
                  <TableRow key={item.UserName}>
                    <TableCell>
                      <input type="checkbox" />
                    </TableCell>
                    <TableCell>{item.UserName}</TableCell>
                    <TableCell>{item.Dependence}</TableCell>
                    <TableCell>{item.Company}</TableCell>
                    <TableCell>{item.Business}</TableCell>
                    <TableCell>{item.Subject}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          )}
        </Table>
      </Card>
    </>
  );
}

export default Bandeja;
