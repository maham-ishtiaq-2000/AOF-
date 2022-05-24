import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "./Components/Login";
import LandingScreenforCheck from './Components/LandingScreenforCheck'

const App = () => {
  return (
    // <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <LandingScreenforCheck />
      </Switch>
    </BrowserRouter>
    //  </React.Fragment>
  );
}

export default App;
