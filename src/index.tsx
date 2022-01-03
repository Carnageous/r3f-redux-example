import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

import { Auth0Provider } from "@auth0/auth0-react";

import "./index.scss";

// This is where the whole penguin styles are imported. You can still use all the components without using this
// base style though: The components' css is injected automatically. You also don't need scss for the components.
import "@dive/penguin/dist/scss/base.scss";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dive-test.eu.auth0.com"
      clientId="a4CvLac1t483oO8hD8WXhWD1IcxbHPBY"
      redirectUri={window.location.origin}
      audience="https://dive-test.eu.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <Router history={history}>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
