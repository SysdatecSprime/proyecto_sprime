const LOGIN = "sprime/auth/LOGIN";
const LOGOUT = "sprime/auth/LOGOUT";
const SET_USER = "sprime/auth/SET_USER";
const SET_ID_USER = "sprime/auth/SET_ID_USER";
const SET_ID_USER_NAME = "sprime/auth/SET_ID_USER_NAME";
const SET_USER_DESC = "sprime/auth/SET_USER_DESC";
const SET_TOKEN = "sprime/auth/SET_TOKEN";

const initialState = {
  authenticated: false,
  user: {},
  idUser: "",
  idUserName: "",
  userDesc: "",
  token: ""
};

export default function reducer(state = initialState, action) {
  const payload = action.payload;

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authenticated: true
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: {},
        idUser: "",
        idUserName: "",
        userDesc: "",
        token: ""
      };
    case SET_USER:
      return {
        ...state,
        user: payload.user
      };
    case SET_ID_USER:
      return {
        ...state,
        idUser: payload.idUser
      };
    case SET_ID_USER_NAME:
      return {
        ...state,
        idUserName: payload.idUserName
      };
    case SET_USER_DESC:
      return {
        ...state,
        userDesc: payload.userDesc
      };
    case SET_TOKEN:
      return {
        ...state,
        token: payload.token
      };

    default:
      return state;
  }
}

export function userLogin() {
  return {type: LOGIN};
}

export function userLogout() {
  return {type: LOGOUT};
}

export function setUser(payload) {
  return {type: SET_USER, payload};
}

export function setIdUser(payload) {
  return {type: SET_ID_USER, payload};
}

export function setToken(payload) {
  return {type: SET_TOKEN, payload};
}

export function setIdUserName(payload) {
  return {type: SET_ID_USER_NAME, payload};
}

export function setUserDesc(payload) {
  return {type: SET_USER_DESC, payload};
}
