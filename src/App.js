import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SidebarGeneral from "./Componentes/SidebarGeneral";
import Pqrs from "./Componentes/dashboard/pqrs";
import CorreosRepresados from "./Componentes/Correos/CorreosRepresados";
import Login from "./Componentes/Registro/Login/Login";
import Sidebar from "./Componentes/Bandeja/Sidebar";
import Bandeja from "./Componentes/Bandeja/BandejaView";
import MainContainerContraloria from "./ContraloriaPQRS/componentes/MainContent";
import SubmitPqrs from "./ContraloriaPQRS/componentes/SubmitPqrs";
import Request from "./ContraloriaPQRS/componentes/RequestView";
import DragAndDrop from "./ContraloriaPQRS/componentes/DragAndDrop";
import RequestsInbox from "./ContraloriaPQRS/componentes/Inbox/TablesView";
import SidebarContraloria from "./ContraloriaPQRS/componentes/Bandeja/SidebarCopia";
import ConsultarRadicado from "./ContraloriaPQRS/componentes/ConsultarRadicado";
import LayoutDeAccesibilidadContraloria from "./ContraloriaPQRS/componentes/Layout/LayoutDeAccesibilidad";
import CarteleraVirtual from "./ContraloriaPQRS/componentes/Inbox/CarteleraVirtual";
import RadicadoPorCedula from "./ContraloriaPQRS/componentes/Inbox/RadicadoPorCedula";
import ActualizarInfo from "./ContraloriaPQRS/componentes/ActualizarDatos";
import EjemploRadicado from "./ContraloriaPQRS/componentes/Inbox/DetalleRadicado/Example";
import MainCorrespondencia from "./ContraloriaPQRS/componentes/Bandeja/MainCorrepondencia";
import {
  userLogin,
  userLogout,
  setUser,
  setToken,
  setIdUser,
  setIdUserName,
  setUserDesc
} from "./Redux/modules/auth";
import {connect} from "react-redux";
import {getFromStorage, setInStorage} from "./Utils/storage/storage";
import MainContainer from "./Componentes/SprimePQRS/MainContainer";
import LayoutDeAccesibilidad from "./Componentes/SprimePQRS/Layout/LayoutDeAccesibilidad";
import RegisterRequest from "./Componentes/SprimePQRS/RegisterRequest";
import Inbox from "./Componentes/SprimePQRS/Inbox";

function mapDispatchToProps(dispatch) {
  return {
    userLogin: () => dispatch(userLogin()),
    userLogout: () => dispatch(userLogout()),
    setUser: (user) => dispatch(setUser(user)),
    setIdUser: (idUser) => dispatch(setIdUser(idUser)),
    setIdUserName: (userName) => dispatch(setIdUserName(userName)),
    setUserDesc: (userDesc) => dispatch(setUserDesc(userDesc)),
    setToken: (token) => dispatch(setToken(token))
  };
}
const select = (state) => {
  return {
    user: state.auth.user,
    authenticated: state.auth.authenticated
  };
};

function App(props) {
  useEffect(() => {
    verifySession();
  }, []);

  async function verifySession() {
    const obj = getFromStorage("sprime_app");

    if (obj) {
      /*   const { token } = obj;
      // Verify token
      const json = await verifyToken(token);
 */

      props.setUser({user: obj.user});
      props.userLogin();
    } else {
      setInStorage("sprime_app", null);
      props.userLogout();
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Login />} />
          {props.authenticated && (
            <>
              <Route path="/dashboard/*" element={<DashboardWithSidebar />} />
              <Route path="/Bandeja" exact={true} element={<Sidebar />} />
              <Route
                path="/CorreosRepresados"
                element={<ReporteWithSidebar />}
              />
            </>
          )}
          <Route element={<LayoutDeAccesibilidad />}>
            <Route path="/SprimePQRS" element={<MainContainer />} />
            <Route
              path="/SprimePQRS/RegistrarSolicitud"
              element={<RegisterRequest />}
            />
            <Route path="/SprimePQRS/ConsultarRadicado" element={<Inbox />} />
          </Route>
          <Route element={<LayoutDeAccesibilidadContraloria />}>
            <Route path="/Contraloria" element={<MainContainerContraloria />} />
            <Route
              path="/Contraloria/RegisterView"
              exact={true}
              element={<SubmitPqrs />}
            />
            <Route
              path="/Contraloria/RequestView"
              exact={true}
              element={<Request />}
            />
            <Route
              path="/Contraloria/DragAndDrop"
              exact={true}
              element={<DragAndDrop />}
            />
            <Route
              path="/Contraloria/TablesView"
              exact={true}
              element={<RequestsInbox />}
            />
            <Route
              path="/Contraloria/CarteleraVirtual"
              exact={true}
              element={<CarteleraVirtual />}
            />
            <Route
              path="/Contraloria/ConsultarRadicado"
              exact={true}
              element={<ConsultarRadicado />}
            />
            <Route
              path="/Contraloria/EjemploRadicado"
              exact={true}
              element={<EjemploRadicado />}
            />
            <Route
              path="/Contraloria/Radicado"
              exact={true}
              element={<RadicadoPorCedula />}
            />

            <Route
              path="/Contraloria/ActualizarDatos"
              exact={true}
              element={<ActualizarInfo />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

function ReporteWithSidebar() {
  return (
    <>
      <SidebarGeneral />
      <Routes>
        <Route path="/" element={<CorreosRepresados />} />
      </Routes>
    </>
  );
}

function DashboardWithSidebar() {
  return (
    <>
      <SidebarGeneral />
      <Routes>
        <Route path="/" element={<Pqrs />} />
        <Route path="pqrs" element={<Pqrs />} />
        {/* <Route path="correosrepresados" element={<CorreosRepresados />} /> */}
      </Routes>
    </>
  );
}

export default connect(select, mapDispatchToProps)(App);
