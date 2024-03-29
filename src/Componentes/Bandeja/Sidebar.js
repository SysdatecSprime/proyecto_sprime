import React, {useState} from "react";
import "../Styles/StyleCopia.css";
import {Link} from "react-router-dom";
import Bandeja from "./BandejaView";
import {Icon} from "@tremor/react";
import {
  FolderOpenIcon,
  ArrowRightIcon,
  ChartPieIcon,
  MailIcon,
  InboxInIcon,
  MenuIcon
} from "@heroicons/react/outline";
import SelectView from "./SelectView";
import {dataBandeja} from "./UrlBase";
import {Outlet} from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import {useLocation} from "react-router-dom/dist";

function Sidebar(props) {
  const [show, setShow] = useState(true);
  const [radicados, setRadicados] = useState([]);
  const [tipoCorrespondencia, setTipoCorrespondencia] = useState(1);
  const [crearNuevo, setCrearNuevo] = useState(false);
  const {pathname} = useLocation();
  console.log("Tipo: " + tipoCorrespondencia);

  async function consultaRadicado(TipoCorreo) {
    const bandejaProm = await fetch(`${dataBandeja}/MailBox/PostBox`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        TipoCorreo: TipoCorreo
      })
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
        className={`sb-header ${show ? "sb-space-toggle" : null}`}
      ></header>
      <aside className="sb-sidebar">
        <nav className={`sb-nav`}>
          <div className="sb-nav-list">
            {/*Boton de despliegue*/}
            <div
              /* className="sb-header-toggle" */ onClick={() => setShow(!show)}
            >
              <Icon
                className="ml-4"
                size="sm"
                variant="solid"
                tooltip=""
                icon={MenuIcon}
                aria-label="expandir"
              />
            </div>
            <div className="py-4 flex flex-col gap-4">
              <Link to="/Bandeja" className="">
                <Icon
                  className="ml-4"
                  size="sm"
                  variant="solid"
                  tooltip="Bandeja"
                  icon={InboxInIcon}
                  aria-label="bandeja"
                />
              </Link>
              <Link to="/dashboard" className="">
                <Icon
                  className="ml-4"
                  size="sm"
                  variant="solid"
                  tooltip="Dashboard"
                  icon={ChartPieIcon}
                  aria-label="dashboard"
                />
              </Link>
              <Link to="/correosrepresados" className="">
                <Icon
                  className="ml-4"
                  size="sm"
                  variant="solid"
                  tooltip="correos represados"
                  icon={MailIcon}
                  aria-label="correos represados"
                />
              </Link>
            </div>
          </div>
          <Link to="" className="sb-nav-link">
            <Icon
              className=""
              size="sm"
              tooltip="Bandeja"
              icon={ArrowRightIcon}
              aria-label="hola"
            />
          </Link>
        </nav>
        <div className=""></div>
      </aside>
      <div className="row sb-fond py-4">
        {pathname === "/Bandeja" ? (
          <>
            {show && (
              <div className="col-3">
                <SelectView
                  consultaRadicado={consultaRadicado}
                  setTipoCorrespondencia={setTipoCorrespondencia}
                  setCrearNuevo={setCrearNuevo}
                />
              </div>
            )}
            <div className={`${show ? "col-9" : "col-12"}`}>
              <Bandeja
                radicados={radicados}
                tipoCorrespondencia={tipoCorrespondencia}
                crearNuevo={crearNuevo}
              />
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </main>
  );
}

export default Sidebar;
