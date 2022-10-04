import "./HeaderRegister.css";
import { Link } from "react-router-dom";
import "./../Header.css";
import logo from "../../../images/logo.svg";

function HeaderRegister() {
  return (
    <header className="page__header header header-register">
      <div className="header__content header__content header__content-register">
        <Link class="header__link" to="/">
          <img src={logo} className="header__logo header__logo-register" alt="logo" />
        </Link>
      </div>
    </header>
  );
}

export default HeaderRegister;
