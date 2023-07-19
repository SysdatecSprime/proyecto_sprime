import { Tab, TabList } from "@tremor/react";
import React, { useState } from "react";
import { MailIcon } from "@heroicons/react/outline";
import RecibidaUno from "./Correspondencia/RecibidaUno";
import RecibidaDos from "./Correspondencia/RecibidaDos";
import RecibidaTres from "./Correspondencia/RecibidaTres";
import EnviadaUno from "./Correspondencia/EnviadaUno";
import EnviadaDos from "./Correspondencia/EnviadaDos";
import EnviadaTres from "./Correspondencia/EnviadaTres";
import InternaUno from "./Correspondencia/InternaUno";
import InternaDos from "./Correspondencia/InternaDos";
import InternaTres from "./Correspondencia/InternaTres";

function MainCorrespondencia() {
  const [selecTabView, setSelecTabView] = useState(1);
  const [recibidoPasoUno, setRecibidoPasoUno] = useState(1);
  const [enviadaPasoUno, setEnviadaPasoUno] = useState(1);
  const [internaPasoUno, setInternaPasoUno] = useState(1);

  const handleTabClick = value => {
    setSelecTabView(value);
  };

  return (
    <>
      <TabList defaultValue={1}>
        <Tab
          value={1}
          text="Correspondencia Recibida"
          icon={MailIcon}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          value={2}
          text="Correspondencia Enviada"
          icon={MailIcon}
          onClick={() => handleTabClick(2)}
        />
        <Tab
          value={3}
          text="Correspondencia Interna"
          icon={MailIcon}
          onClick={() => handleTabClick(3)}
        />
      </TabList>

      {selecTabView === 1 && (
        <>
          {" "}
          {recibidoPasoUno === 1 && (
            <RecibidaUno
              paso={recibidoPasoUno}
              setRecibidoPasoUno={setRecibidoPasoUno}
            />
          )}
          {recibidoPasoUno === 2 && (
            <RecibidaDos
              paso={recibidoPasoUno}
              setRecibidoPasoUno={setRecibidoPasoUno}
            />
          )}
          {recibidoPasoUno === 3 && (
            <RecibidaTres
              paso={recibidoPasoUno}
              setRecibidoPasoUno={setRecibidoPasoUno}
            />
          )}
        </>
      )}
      {selecTabView === 2 && (
        <>
          {enviadaPasoUno === 1 && (
            <EnviadaUno
              paso={enviadaPasoUno}
              setEnviadaPasoUno={setEnviadaPasoUno}
            />
          )}
          {enviadaPasoUno === 2 && (
            <EnviadaDos
              paso={enviadaPasoUno}
              setEnviadaPasoUno={setEnviadaPasoUno}
            />
          )}
          {enviadaPasoUno === 3 && (
            <EnviadaTres
              paso={enviadaPasoUno}
              setEnviadaPasoUno={setEnviadaPasoUno}
            />
          )}
        </>
      )}
      {selecTabView === 3 && (
        <>
          {internaPasoUno === 1 && (
            <InternaUno
              paso={internaPasoUno}
              setInternaPasoUno={setInternaPasoUno}
            />
          )}
          {internaPasoUno === 2 && (
            <InternaDos
              paso={internaPasoUno}
              setInternaPasoUno={setInternaPasoUno}
            />
          )}
          {internaPasoUno === 3 && (
            <InternaTres
              paso={internaPasoUno}
              setInternaPasoUno={setInternaPasoUno}
            />
          )}
        </>
      )}
    </>
  );
}

export default MainCorrespondencia;
