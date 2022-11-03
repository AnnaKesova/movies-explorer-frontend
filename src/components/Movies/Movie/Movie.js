import "./Movie.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Movie({ movie, handleClick }) {
  const { nameRU, trailerLink, duration, image } = movie || {};
  const [isSaved, setIsSaved] = useState(movie);
  const { pathname } = useLocation();
 

  // Фильм - время
  function setDuration(duration) {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		return `${hours}ч ${minutes}м`;
	}

   // Обрабокта  клика на иконке
   const handleClickOnIcon = () => {
    setIsSaved(!isSaved); // Меняем сстатус сохранения фильма
    handleClick(movie, isSaved); 
  };

  return (
    <>
      <li className="moviesCardList__film">
        <div className="moviesCardList__about">
          <div className="moviesCardList__description">
            <p className="moviesCardList__name">{nameRU}</p>
            <p className="moviesCardList__time">{setDuration(duration)}</p>
          </div>
          <button  type="button" className={`moviesCardList__save ${
            pathname === "/saved-movies"
              ? "moviesCardList__save_active"
             : "moviesCardList__save" 
          } ${isSaved ? "moviesCardList__save_active" : ""}`}
          onClick={handleClickOnIcon}> </button>
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
