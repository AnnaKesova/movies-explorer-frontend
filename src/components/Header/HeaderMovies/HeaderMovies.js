import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./HeaderMovies.css";
import BurgerMenu from "../HeaderMovies/BurgerMenu/BurgerMenu";
import logo from "../../../images/logo.svg";

function HeaderMovies() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState("");
  const handleBurgerMenuOpen = () => setIsBurgerMenuOpen("open");
  const handleBurgerMenuClose = () => setIsBurgerMenuOpen("");

  return (
    <header className="page__header headerm">
      <div className="headerm__content">
        <Link className="headerm__link" to="/">
          <img src={logo} className="headerm__logo" alt="logo" />
        </Link>
        <nav className="headerm__movies movies">
          <div className="movies__list">
              <Link className="movies__dif" to="/movies">
                Фильмы
              </Link>
              <Link
                className="movies__dif movies__dif_normal"
                to="/saved-movies"
              >
                Сохранённые фильмы
              </Link>
          </div>
          <Link className="movies__profile" to="/profile">
            <span className="movies__name">Аккаунт</span>
            <div className="movies__radius">
            </div>
          </Link>
        </nav>
        <button
          className="movies__button-open"
          onClick={handleBurgerMenuOpen}
        ></button>
        <BurgerMenu
          isOpen={isBurgerMenuOpen}
          isClose={handleBurgerMenuClose}
        ></BurgerMenu>
      </div>
    </header>
  );
}

export default HeaderMovies;
