import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './Pages/Dashboard/User/users.css'
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Css/components/alert.css";
import "./Css/components/loading.css";

import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";
import './custom.css'
import 'react-loading-skeleton/dist/skeleton.css'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <Router>
          <App />
        </Router>
      </MenuContext>
    </WindowContext>


  </React.StrictMode>
);
