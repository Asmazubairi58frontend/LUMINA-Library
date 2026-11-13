import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "./context/Store.jsx";
import "./styles/global.css";
import "./styles/bookshelf.css";
import "./styles/reading-room.css";
createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Provider>
      <App />
    </Provider>
  </HashRouter>,
);
