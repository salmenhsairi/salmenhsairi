import Display from "./pages/Display";
import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Index from "./pages/Index";
import CreateEvent from "./pages/CreateEvent";

class App extends Component {

  render() {
    return (
  
            <Switch>
              <Route exact path="/">
                <Index />
              </Route>
              <Route exact path="/newevent">
                <CreateEvent />
              </Route>
              <Route exact path="/display/:id" component={Display} />
            </Switch>

    );
  }
}

export default App;
