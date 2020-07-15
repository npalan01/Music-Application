import React from "react";
import { Switch, Route } from "react-router-dom";
// import Overview from './Overview.js';
import { Home } from "./Home";
import { Favorites } from "./Favorites.js";
import ContactUs from "./ContactUs";

const Main = () => (
  <div>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Home" component={Home} />
      <Route path="/Favorites" component={Favorites} />
      <Route path="/ContactUs" component={ContactUs} />
    </Switch>
  </div>
);

export default Main;
