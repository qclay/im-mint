import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DAppProvider } from "@usedapp/core";
import lazyLoad from './javascript/LazyLoadImages';
import "./scss/style.scss";

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{
      notifications: { expirationPeriod: 4000 }
    }}>
      <App />
    </DAppProvider>
  </React.StrictMode>, 
  document.getElementById("root")
);

lazyLoad();