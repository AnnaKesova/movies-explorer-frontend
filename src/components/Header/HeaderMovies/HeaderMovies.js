import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./HeaderMovies.css";
import BurgerMenu from "../HeaderMovies/BurgerMenu/BurgerMenu";
import logo from "../../../images/logo.svg";
import people from "../../../images/people.svg";

function HeaderMovies() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState("");
  const handleBurgerMenuOpen = () => setIsBurgerMenuOpen("open");
  const handleBurgerMenuClose = () => setIsBurgerMenuOpen("");

  return (
    <header className="page__header headerm">
      <div className="headerm__content">
        <Link class="headerm__link" to="/">
          <img src={logo} className="headerm__logo" alt="logo" />
        </Link>
        <nav className="headerm__movies movies">
          <ul className="movies__list">
            <li className="movies__navigate">
              <Link className="movies__dif" to="/movies">
                Фильмы
              </Link>
            </li>
            <li className="movies__navigate">
              <Link
                className="movies__dif movies__dif_normal"
                to="/saved-movies"
              >
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <Link className="movies__profile" to="/profile">
            <span className="movies__name">Аккаунт</span>
            <div className="movies__radius">
              <img src={people} className="movies__my" alt="people" />
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
