//import logo from "./logo.svg";
import "./App.css";
import Data_store from "./stores/data_store.js";
import Card from "./components/card.js";
import LibraryView from "./components/libraryView.js";
import InfoBlock from "./components/infoBlock.js";
import { useState, useEffect } from "react";

function App() {
  const [detales, setDetales] = useState("");
  const getDetales = (obj) => setDetales(obj);
  console.log(detales.label, "detales");

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="main_block row">
            <div className="col sub1">
              <LibraryView
                lib={new Data_store()}
                getDetalesFunc={getDetales}
                detales={detales}
              />
            </div>
            <div className="col sub1">
              <InfoBlock info={detales} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
