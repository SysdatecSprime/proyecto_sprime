import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import HeaderNav from "../Header";
import styled from "styled-components";

export default function LayoutDeAccesibilidad() {
  const [zoom, setZoom] = useState(0.9);

  function handleZoomIn() {
    setZoom(zoom + 0.1);
  }

  function handleZoomOut() {
    setZoom(Math.max(zoom - 0.1, 0.1));
  }

  function handleReset() {
    setZoom(1);
  }

  return (
    <>
      <HeaderNav
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        handleReset={handleReset}
      />
      <ContainerAccesibilidad zoom={zoom}>
        <Outlet />
      </ContainerAccesibilidad>
    </>
  );
}

const ContainerAccesibilidad = styled.div`
  transform: ${({zoom}) => `scale(${zoom})`};
  transition: transform 0.3s ease-in-out;
  transform-origin: 0 0;
`;
