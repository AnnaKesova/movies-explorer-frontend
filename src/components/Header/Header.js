import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import HeaderMain from "./HeaderMain/HeaderMain";
import HeaderMovies from "./HeaderMovies/HeaderMovies";

function Header({ loggedIn }) {
  const { pathname } = useLocation();
  return (
    <>
      <header
        className={`page__header ${pathname === "/" ? "header" : "headerm"} `}
      >
        <div className="header__content">
          <Link className="header__link" to="/">
            <img src={logo} className="header__logo" alt="logo" />
          </Link>
          {loggedIn ? <HeaderMovies /> : <HeaderMain />}
        </div>
      </header>
    </>
  );
}

export default Header;