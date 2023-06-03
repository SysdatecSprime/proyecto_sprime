import styled from "styled-components";

const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 60vw;
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: rbga(100, 100, 111, 0, 2) 0px 7px 29px 0px;
`;

const HeaderModal = styled.div`
  display: flex;
  align: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;

  h3 {
    font-weight: 500;
    color: #1766dc;
    text-align: center;
  }
`;

const BotonCerrar = styled.button`
  position: relative;
  top: 0;
  right: 0;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #1766dc;
`;

export { Title, Overlay, Container, HeaderModal, BotonCerrar };
