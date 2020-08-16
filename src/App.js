import React from "react";
import "antd/dist/antd.css";
import { Router } from "react-router-dom";

import Routes from "./routes";
import history from "./service";

function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

export default App;
