import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

import "./index.scss";

// This is where the whole penguin styles are imported. You can still use all the components without using this
// base style though: The components' css is injected automatically. You also don't need scss for the components.
import "@dive/penguin/dist/scss/base.scss"

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
