import React, {useState, useEffect} from "react";
import Header from "./components/Header/Header";
import MintContent from './components/MintContent/MintContent';
import ModalAccount from "./components/ModalAccount/ModalAccount";
import { Helmet } from "react-helmet";
import { Context, value } from './Context';

// Images
import background from './images/background.jpg';
import logo from './images/logo.png';

function App() {
  const [ctx, setCtx] = useState(value);
  
  useEffect(() => {
      document.body.style.overflow = ctx.showAccountInfoModal !== false ? "hidden" : "";
  }, [ctx]);

  return (
    <Context.Provider value={[ctx, setCtx]}>
      <Helmet>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Helmet>
      <div className="mint" data-lazy-bg={background}>
        <Header />
        <div className="mint__sidebar">
          <a href="/" className="mint__logo">
            <img src={logo} alt="logo" />
          </a>          
        </div>
        <MintContent />
      </div>
      <ModalAccount isActive={ctx.showAccountInfoModal} delay="750" />
    </Context.Provider>
  );
}

export default App;
