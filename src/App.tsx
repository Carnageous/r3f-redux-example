import { Route, Switch, Redirect } from "react-router-dom";

import { Dashboard, Simulation } from "./pages";

import "./App.scss";
import { Provider } from "react-redux";
import { store } from "store/store";
import { Header, Loading } from "components/UI";
import { useAuth0 } from "@auth0/auth0-react";

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
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <div className="app">
        <Header />

        <div className="app__content">
          <Page />
        </div>
      </div>
    </Provider>
  );
}

export default App;
