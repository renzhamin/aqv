import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

let baseURL = "/api";

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:5000/api";
}

import axios from "axios";

axios.defaults.baseURL = baseURL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
