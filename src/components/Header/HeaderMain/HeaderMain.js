import { Link } from "react-router-dom";
import "./HeaderMain.css";

function HeaderMain() {
  return (
    <nav className="header__menu menu">
      <Link
        className="menu__route menu__route_border_none"
        to="/signup"
        title="Регистрация"
      >
        Регистрация
      </Link>
      <Link
        className="menu__route menu__route_border_yes"
        to="/signin"
        title="Войти"
      >
        Войти
      </Link>
    </nav>
  );
}

export default HeaderMain;
