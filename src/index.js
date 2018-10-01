import React from "react";
import ReactDOM from "react-dom";
import "./public/css/index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
