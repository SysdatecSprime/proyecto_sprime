import { Button, Title } from "@tremor/react";
import Tabla from "../Tabla";
import {
  columnsCorreosRepresados,
  rowsCorreosRepresados,
} from "../../../Utils/data/constants";
import { DropDownElement } from "../DropDownElement";
import { TextInputElement } from "../TextInputElement";
import { DateElement } from "../DateElement";

export default function CorreosRepresados() {
  return (
    <section className="px-4 min-h-screen">
      <div className="p-4 pl-0">
        <Title>Correos Represados</Title>
      </div>
      <form className="flex flex-wrap justify-evenly gap-y-2 gap-x-4 ">
        <DropDownElement
          title="Tipo"
          placeholder="Seleccione un tipo"
          options={[
            "Todos",
            "Correos de seguimiento",
            "Mis Correos",
            "Otras Dependencias",
          ]}
        />
        <DropDownElement
          title="Empresa"
          placeholder="Seleccione una empresa"
          options={["Empresa 1", "Empresa 2", "Empresa 3"]}
        />
        <DropDownElement
          title="Tipo de negocio"
          placeholder="Seleccione un tipo de negocio"
          options={["Tipo 1", "Tipo 2", "Tipo 3"]}
        />
        <DropDownElement
          title="Tipificación"
          placeholder="Seleccione una tipificación"
          options={["Tipificación 1", "Tipificación 2", "Tipificación 3"]}
        />
        <DropDownElement
          title="Grupo"
          placeholder="Seleccione un grupo"
          options={["Grupo 1", "Grupo 2", "Grupo 3"]}
        />
        <DropDownElement
          title="Clase Correspondencia"
          placeholder="Seleccione una clase de correspondencia"
          options={["Clase 1", "Clase 2", "Clase 3"]}
        />
        <DropDownElement
          title="Requiere Respuesta"
          placeholder="Seleccione una opción"
          options={["Si", "No"]}
        />
        <TextInputElement
          title="Numero de Radicado"
          placeholder="Ingrese el numero de radicado"
        />

        <DropDownElement
          title="Tipo de Correo"
          placeholder="Seleccione un tipo de correo"
          options={["Tipo 1", "Tipo 2", "Tipo 3"]}
        />
        <DropDownElement
          title="Responsable Paso Flujo"
          placeholder="Seleccione un responsable"
          options={["Responsable 1", "Responsable 2", "Responsable 3"]}
        />
        <DropDownElement
          title="Dependencia Paso Flujo"
          placeholder="Seleccione una dependencia"
          options={["Dependencia 1", "Dependencia 2", "Dependencia 3"]}
        />
        <DateElement title="Fecha Ingreso" placeholder="Seleccione una fecha" />
        <TextInputElement
          title="Numero de documento"
          placeholder="Ingrese el numero de documento"
        />

        <DropDownElement
          title="Flujo"
          placeholder="Seleccione un flujo"
          options={["Flujo 1", "Flujo 2", "Flujo 3"]}
        />
        <DropDownElement
          title="Dependencia Inicial"
          placeholder="Seleccione una dependencia"
          options={["Dependencia 1", "Dependencia 2", "Dependencia 3"]}
        />
        <DropDownElement
          title="Notificados"
          placeholder="Seleccione una opción"
          options={["Si", "No"]}
        />
        <DateElement
          title="Fecha Radicación"
          placeholder="Seleccione una fecha"
        />
        <div className="w-full py-4">
          <Button type="submit" variant="primary" className="float-right w-40">
            Buscar
          </Button>
        </div>
      </form>
      <small> Se encontraron 32 resultados {">"}</small>
      <Tabla rows={rowsCorreosRepresados} columns={columnsCorreosRepresados} />
    </section>
  );
}
