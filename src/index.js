import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {hydrate, render} from "react-dom";
import {Provider} from "react-redux";
import store from "./Redux/create";

const root = document.getElementById("root");
if (root.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    root
  );
} else {
  render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    root
  );
}
