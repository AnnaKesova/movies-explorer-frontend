import "./Movie.css";
import React from "react";


import like from "../../../images/save9.svg";


function Movie({movie, handleClick}) {
    const { nameRU, trailerLink, duration, image } = movie;

  // Фильм - время
  const getTimeFromMins = (duration) => {
    let hours = Math.trunc(duration / 60);
    let minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  
  return (
    <>
      <li className="moviesCardList__film">
        <div className="moviesCardList__about">
          <div className="moviesCardList__description">
            <p className="moviesCardList__name">{nameRU}</p>
            <p className="moviesCardList__time">{getTimeFromMins(duration)}</p>
          </div>
          <button className="moviesCardList__save" type="button"  >
            <img src={like} className="moviesCardList__like" alt="сохранить" />
          </button>
        </div>
        <a className="moviesCardList__link" href={trailerLink}  target="_blank"  rel="noreferrer">
        <img src={image} className="moviesCardList__poster" alt={nameRU} />
        </a>
      </li>
    </>
  );
}

export default Movie;
