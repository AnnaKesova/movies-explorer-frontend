import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";

function Header() {
  return (
    <header className="page__header header">
      <div className="header__content">
        <Link class="header__link" href="/movies-explorer-frontend">
          <img src={logo} className="header__logo" alt="logo" />
        </Link>

        <nav className="header__menu menu">
          <ul className="menu__list">
            <li className="menu__routes">
              <button
                className="menu__route menu__route_border_none"
                type="button"
                title="Регистрация"
              >
                Регистрация
              </button>
            </li>
            <li className="menu__routes">
              <button
                className="menu__route menu__route_border_yes"
                type="button"
                title="Войти"
              >
                Войти
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
