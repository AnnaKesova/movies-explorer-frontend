import "./Movie.css";
import React from "react";
import { useLocation } from "react-router-dom";

function Movie({ movie, handleClick, savedMovies, handleSaveClick }) {
  const { nameRU, trailerLink, duration, image } = movie || {};
  const { pathname } = useLocation();
  const isSaved = savedMovies.some((i) => i.id === movie.id);

  // Фильм - время
  function setDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  function handleClickOn() {
    handleClick(movie);
  }

  // Обрабокта  клика на иконке
  function handleClickOnIcon() {
    if (isSaved) {
      handleClick(movie);
    } else {
      handleSaveClick(movie);
    }
  }

  return (
    <>
      <li className="moviesCardList__film">
        <div className="moviesCardList__about">
          <div className="moviesCardList__description">
            <p className="moviesCardList__name">{nameRU}</p>
            <p className="moviesCardList__time">{setDuration(duration)}</p>
          </div>

          {pathname === "/saved-movies" && (
            <button
              type="button"
              onClick={handleClickOn}
              className={
                !isSaved
                  ? "moviesCardList__save-close "
                  : "moviesCardList__save-close "
              }
            ></button>
          )}

          {pathname === "/movies" && (
            <button
              type="button"
              className={
                isSaved ? "moviesCardList__save_active" : "moviesCardList__save"
              }
              onClick={handleClickOnIcon}
            ></button>
          )}
        </div>
        <a
          className="moviesCardList__link"
          href={trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          <img src={image} className="moviesCardList__poster" alt={nameRU} />
        </a>
      </li>
    </>
  );
}

export default Movie;
