import React, { useState } from "react";
import "./styleCopia.css";
import { Link } from "react-router-dom";
import Bandeja from "./BandejaView";
import * as BsIcons from "react-icons/bs";
import { Card, Icon, Subtitle } from "@tremor/react";
import { FolderOpenIcon } from "@heroicons/react/outline";
import SelectView from "./SelectView";
import { dataBandeja } from "../../utils/UrlBase";

function Sidebar() {
  const [show, setShow] = useState(true);
  const [radicados, setRadicados] = useState([]);
  const [tipoCorrespondencia, setTipoCorrespondencia] = useState(1);
  const [crearNuevo, setCrearNuevo] = useState(false);
  console.log(tipoCorrespondencia);

  async function consultaRadicado(TipoCorreo) {
    const bandejaProm = await fetch(`${dataBandeja}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TipoCorreo: TipoCorreo,
      }),
    });

    const respRadicados = await bandejaProm.json();

    if (bandejaProm.ok) {
      console.log(respRadicados);
      setRadicados(respRadicados.Radicados);
    }
  }

  return (
    <main className={show ? "sb-space-toggle" : null}>
      <header
        className={`sb-header ${show ? "sb-space-toggle" : null}`}></header>
      <aside className="sb-sidebar">
        <nav className={`sb-nav ${show ? "sb-show" : null}`}>
          <div className="sb-nav-list">
            {/*Boton de despliegue*/}
            <div className="sb-header-toggle" onClick={() => setShow(!show)}>
              <i className="fa-solid fa-bars"></i>
            </div>
            <div className="py-4">
              <Icon
                className="ml-4"
                size="sm"
                variant="solid"
                tooltip="Carpeta"
                icon={FolderOpenIcon}
                aria-label="hola"
              />
            </div>
          </div>
          <Link to="" className="sb-nav-link">
            <i className="fa-solid fa-right-from-bracket sb-nav-link-icons"></i>
          </Link>
        </nav>
        <div className=""></div>
      </aside>
      <div className="row sb-fond py-4">
        {show && (
          <div className="col-2">
            <SelectView
              consultaRadicado={consultaRadicado}
              setTipoCorrespondencia={setTipoCorrespondencia}
              setCrearNuevo={setCrearNuevo}
            />
          </div>
        )}
        <div className={`${show ? "col-10" : "col-12"}`}>
          <Bandeja
            radicados={radicados}
            tipoCorrespondencia={tipoCorrespondencia}
            crearNuevo={crearNuevo}
          />
        </div>
      </div>
    </main>
  );
}

export default Sidebar;
