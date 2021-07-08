import Footer from "./Footer";
import Display from "./pages/Display";
import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Index from "./pages/Index";

class App extends Component {

  render() {
    return (
      <div id="wrapper">
        {/* <SideBar /> */}
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Switch>
              <Route exact path="/">
                <Index />
              </Route>
              <Route exact path="/display/:id" component={Display} />
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
