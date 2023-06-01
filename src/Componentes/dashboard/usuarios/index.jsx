import { Title } from "@tremor/react";
import UsuariosActivos from "./UsuariosActivos";
import Radicados from "./Radicados";

export default function Usuarios() {
  return (
    <div>
      <div className="py-5">
        <Title> Usuarios </Title>
      </div>
      <div className="p-2">
        <UsuariosActivos />
      </div>
      <div className="p-2">
        <Radicados />
      </div>
    </div>
  );
}
