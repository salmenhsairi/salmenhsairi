import "./App.css";
import Footer from "./Footer";
import Display from "./pages/Display";
import { Route , Switch } from "react-router";
import Nav from "./Nav";
import Index from "./pages/Index";
import SideBar from "./SideBar";
import Erreur404 from "./pages/Erreur404"
import Blank from "./pages/Blank";
import Tables from "./pages/Tables";
import Charts from "./pages/Charts";
import Cards from "./pages/Cards";
import Buttons from "./pages/Buttons";
import UtilitiesOther from "./pages/UtilitiesOther";
import UtilitiesColor from "./pages/UtilitiesColor";
import UtilitiesBorder from "./pages/UtilitiesBorder";
import UtilitiesAnimation from "./pages/UtilitiesAnimation";
import { useState } from "react";

function App() {
  const [filter, setFilter] = useState("");
  const [display, setDisplay] = useState(false);
  const setInput = (query) => {
    setFilter(query);
  }
  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {!display && <Nav inputHandler={setInput} />}
          <Switch>
            <Route exact path="/">
              <Index setInput={filter} />
            </Route>
            {/* <Route path="/index.html">
              <Index setInput={filter} />
            </Route> */}
            <Route exact path="/display/:id">
              <Display
                toggleDisplay={(display) => {
                  setDisplay(display);
                }}
              />
            </Route>
            <Route path="/buttons.html">
              <Buttons />
            </Route>
            <Route path="/cards.html">
              <Cards />
            </Route>
            <Route path="/charts.html">
              <Charts />
            </Route>
            <Route path="/tables.html">
              <Tables />
            </Route>
            <Route path="/404.html">
              <Erreur404 />
            </Route>
            <Route path="/utilities-color.html">
              <UtilitiesColor />
            </Route>
            <Route path="/utilities-animation.html">
              <UtilitiesAnimation />
            </Route>
            <Route path="/utilities-border.html">
              <UtilitiesBorder />
            </Route>
            <Route path="/utilities-other.html">
              <UtilitiesOther />
            </Route>
            <Route path="/blank.html">
              <Blank />
            </Route>
          </Switch>
          {/* <UtilitiesAnimation /> */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
