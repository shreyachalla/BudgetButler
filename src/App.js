import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Groceries from "./pages/Groceries";
import Overview from "./pages/Overview";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          {/* <Route path="/home" component={Home} /> */}
          <Route path="/overview" component={Overview} />
          <Route path="/groceries" component={Groceries} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
