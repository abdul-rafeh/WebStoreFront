import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "./Pages/Main";
import DetailsPage from "./Pages/Details";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/details/:id" exact component={DetailsPage} />
    </Switch>
  );
}
