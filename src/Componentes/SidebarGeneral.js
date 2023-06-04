import React, { useState } from "react";
import "./Styles/StyleCopia.css";
import { Link } from "react-router-dom";
import { Icon } from "@tremor/react";
import {
  FolderOpenIcon,
  ArrowRightIcon,
  ChartPieIcon,
  MailIcon,
} from "@heroicons/react/outline";
import { Outlet } from "react-router-dom";
// import BandejaView from "./BandejaView"; // Ruta relativa al archivo BandejaView

function SidebarGeneral(props) {
  const [show, setShow] = useState(true);

  return (
    <main className={show ? "sb-space-toggle" : null}>
      <header
        className={`sb-header ${show ? "sb-space-toggle" : null}`}
      ></header>
      <aside className="sb-sidebar">
        <nav className={`sb-nav ${show ? "sb-show" : null}`}>
          <div className="sb-nav-list">
            {/*Boton de despliegue*/}
            <div className="sb-header-toggle" onClick={() => setShow(!show)}>
              <i className="fa-solid fa-bars"></i>
            </div>
            <div className="py-4 flex flex-col gap-4">
              <Link to="/Bandeja" className="">
                <Icon
                  className="ml-4"
                  size="sm"
                  variant="solid"
                  tooltip="Bandeja"
                  icon={FolderOpenIcon}
                  aria-label="hola"
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
              <Link to="/correos-represados" className="">
                <Icon
                  className="ml-4"
                  size="sm"
                  variant="solid"
                  tooltip="Reportes"
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
              tooltip="Carpeta"
              icon={ArrowRightIcon}
              aria-label="hola"
            />
          </Link>
        </nav>
        <div className=""></div>
      </aside>
      <div className="row sb-fond py-4">
        <Outlet />
      </div>
    </main>
  );
}

export default SidebarGeneral;
