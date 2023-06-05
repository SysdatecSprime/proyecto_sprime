import React from "react";
import {
  Overlay,
  HeaderModal,
  BotonCerrar,
  Container,
} from "../../elementos/ElementoModal";
import * as FaIcons from "react-icons/fa";

const Modal = ({ children, estado, cambiarEstado, titulo }) => {
  return (
    <>
      {estado && (
        <Overlay>
          <Container>
            <HeaderModal>
              <h3>{titulo}</h3>

              <BotonCerrar
                className="nav-logo-icon"
                onClick={() => cambiarEstado(false)}>
                <FaIcons.FaRegTimesCircle />
              </BotonCerrar>
            </HeaderModal>
            {children}
          </Container>
        </Overlay>
      )}
    </>
  );
};

export default Modal;
