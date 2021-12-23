import { Route, Switch, Redirect, useLocation, Link } from "react-router-dom";

import { Dashboard, Simulation } from "./pages";

import "./App.scss";
import classNames from "classnames";
import { Provider } from "react-redux";
import { store } from "store/store";

function Page() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/simulation" component={Simulation} />
    </Switch>
  );
}

function App() {
  let { pathname } = useLocation();
  const path = pathname.substring(pathname.lastIndexOf("/") + 1) as "dashboard" | "simulation";

  return (
    <Provider store={store}>
      <div className="app">
        <header className="app__header flex flex-center flex-justify-between">
          <h1 className="app__title">Dive</h1>
          <div className="app__header__menu">
            <Link
              to="dashboard"
              className={classNames("app__header__link", { "app__header__link--active": path === "dashboard" })}
            >
              Dashboard
            </Link>
            <Link
              to="simulation"
              className={classNames("app__header__link", { "app__header__link--active": path === "simulation" })}
            >
              Simulation
            </Link>
          </div>
        </header>

        <div className="app__content">
          <Page />
        </div>
      </div>
    </Provider>
  );
}

export default App;
