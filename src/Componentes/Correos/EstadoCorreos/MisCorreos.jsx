import { Button } from "@tremor/react";
import Tabla from "../Tabla";
import {
  columnsCorreosRepresados,
  rowsCorreosRepresados,
} from "../../../Utils/data/constants";

import { DropDownElement } from "../DropDownElement";
import { TextInputElement } from "../TextInputElement";
import { DateElement } from "../DateElement";

export default function MisCorreos() {
  return (
    <section className="px-4 min-h-screen">
      <form className="flex flex-wrap justify-evenly gap-y-2 gap-x-4 ">
        <DropDownElement
          title="Tipo de Correo"
          placeholder="Seleccione un tipo de correo"
          options={["Correo 1", "Correo 2", "Correo 3"]}
        />
        <DropDownElement
          title="Usuario Remite"
          placeholder="Seleccione un tipo de usuario"
          options={["Todos", "Tipo 1", "Tipo 2", "Tipo 3"]}
        />
        <DropDownElement
          title="Flujo"
          placeholder="Seleccione un flujo"
          options={["Todos", "Flujo 1", "Flujo 2", "Flujo 3"]}
        />
        <DropDownElement
          title="Empresa"
          placeholder="Seleccione una empresa"
          options={["Todas", "Empresa 1", "Empresa 2", "Empresa 3"]}
        />
        <DropDownElement
          title="Dependencia Inicial"
          placeholder="Seleccione una dependencia inicial"
          options={["Todas", "Dependencia 1", "Dependencia 2", "Dependencia 3"]}
        />
        <DropDownElement
          title="Dependencia paso Flujo"
          placeholder="Seleccione una dependencia paso flujo"
          options={[
            "Todas",
            "Dependencia paso 1",
            "Dependencia paso 2",
            "Dependencia paso 3",
          ]}
        />
        <DropDownElement
          title="Tipo de Negocio"
          placeholder="Seleccione el tipo de negocio"
          options={["Todos", "Tipo 1", "Tipo 2", "Tipo 3"]}
        />

        <DropDownElement
          title="Estado Verificación"
          placeholder="Seleccione un estado de verificación"
          options={[
            "Todos",
            "Estado verificación 1",
            "Estado verificación 2",
            "Estado verificación 3",
          ]}
        />
        <DropDownElement
          title="Responsable Paso Flujo"
          placeholder="Seleccione un responsable"
          options={["Responsable 1", "Responsable 2", "Responsable 3"]}
        />
        <DropDownElement
          title="Tipificación"
          placeholder="Seleccione una tipificación"
          options={["Tipificación 1", "Tipificación 2", "Tipificación 3"]}
        />
        <DropDownElement
          title="Estado Correos"
          placeholder="Seleccione un estado de correo"
          options={["Estado correo 1", "Estado correo 2", "Estado correo 3"]}
        />
        <DropDownElement
          title="Información General Radicación"
          placeholder="Seleccione una opción"
          options={["Si", "No"]}
        />

        <DropDownElement
          title="Grupo"
          placeholder="Seleccione un grupo"
          options={["Grupo 1", "Grupo 2", "Grupo 3"]}
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

        <DropDownElement
          title="Clase Correspondencia"
          placeholder="Seleccione una clase de correspondencia"
          options={["Clase 1", "Clase 2", "Clase 3"]}
        />

        <TextInputElement
          title="Asunto"
          placeholder="Ingrese el asunto del correo"
        />

        <DateElement title="Fecha Ingreso" placeholder="Seleccione una fecha" />

        <DropDownElement
          title="Finalizados al radicar"
          placeholder="Seleccione una opción"
          options={["Si", "No"]}
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

        <TextInputElement
          title="Numero de documento"
          placeholder="Ingrese el numero de documento"
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
