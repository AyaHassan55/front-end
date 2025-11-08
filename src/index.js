import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Css/components/alert.css";
import "./Css/components/loading.css";

import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./Context/MenuContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MenuContext>
      <Router>
        <App />
      </Router>
    </MenuContext>

  </React.StrictMode>
);
