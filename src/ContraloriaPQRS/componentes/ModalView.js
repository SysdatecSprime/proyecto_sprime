import React from "react";
import {
  Overlay,
  HeaderModal,
  BotonCerrar,
  ContainerModal,
} from "../elementos/ElementModal";
import * as FaIcons from "react-icons/fa";

const Modal = ({ children, estado, cambiarEstado, titulo }) => {
  return (
    <>
      {estado && (
        <Overlay>
          <ContainerModal>
            <HeaderModal>
              <h3>{titulo}</h3>

              <BotonCerrar
                className="nav-logo-icon"
                onClick={() => cambiarEstado(false)}
              >
                <FaIcons.FaRegTimesCircle />
              </BotonCerrar>
            </HeaderModal>
            {children}
          </ContainerModal>
        </Overlay>
      )}
    </>
  );
};

export default Modal;
