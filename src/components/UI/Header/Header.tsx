import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Icon } from "@dive/penguin/dist/components";

import "./Header.scss";
import { useEffect } from "react";

export default function Header() {
  let { pathname } = useLocation();
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  const path = pathname.substring(pathname.lastIndexOf("/") + 1) as "dashboard" | "simulation";

  useEffect(() => {
    console.log(user);
  }, [user]);

  const auth = (
    <div className="header__auth">
      {isAuthenticated ? (
        <>
          <div className="header__user">
            <img className="header__picture" src={user?.picture} alt={user?.name} />
            <div className="header__userdata">
              <b>{user?.name}</b>
              <span>{user?.email}</span>
            </div>
          </div>
          <Button className="header__logout" onClick={logout}>
            <Icon type="material" name="logout" />
            Logout
          </Button>
        </>
      ) : (
        <Button className="header__login" onClick={loginWithRedirect}>
          <Icon type="material" name="login" />
          Login
        </Button>
      )}
    </div>
  );

  return (
    <header className="header flex flex-center flex-justify-between">
      <div className="header__left">
        <h1 className="header__title">Dive</h1>
        <div className="header__menu">
          <Link to="dashboard" className={classNames("header__link", { "header__link--active": path === "dashboard" })}>
            Dashboard
          </Link>
          <Link
            to="simulation"
            className={classNames("header__link", { "header__link--active": path === "simulation" })}
          >
            Simulation
          </Link>
        </div>
      </div>

      {auth}
    </header>
  );
}
