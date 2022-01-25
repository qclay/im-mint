import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DAppProvider } from "@usedapp/core";
import lazyLoad from './javascript/LazyLoadImages';
import "./scss/style.scss";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    {/* <ChakraProvider theme={theme}> */}
      <DAppProvider config={{
        notifications: { expirationPeriod: 4000 }
      }}>
        <App />
      </DAppProvider>
    {/* </ChakraProvider>  */}
  </React.StrictMode>, 
  document.getElementById("root")
);

lazyLoad();