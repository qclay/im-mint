import React, {useState, useEffect} from "react";
import Header from "./components/Header/Header";
import MintContent from './components/MintContent/MintContent';
import Menu from "./components/Menu/Menu";
import { Context, value } from './Context';

// Images
import background from './images/background.jpg';
import logo from './images/logo.png';

function App() {
  const [ctx, setCtx] = useState(value);
  
  useEffect(() => {
      document.body.style.overflow        = ctx.openMenu !== false ? "hidden" : "";
  }, [ctx]);

  return (
    <Context.Provider value={[ctx, setCtx]}>
      <div className="mint" data-lazy-bg={background}>
        <Header />
        <a href="/" className="mint__logo">
          <img src={logo} alt="logo" />
        </a>
        <MintContent />
      </div>
      <Menu />
    </Context.Provider>
  );
}

export default App;
