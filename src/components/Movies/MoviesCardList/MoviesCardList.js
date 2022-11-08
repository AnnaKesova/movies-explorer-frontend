import "./MoviesCardList.css";
import Movie from "../Movie/Movie";
import React, { useState, useEffect } from "react";
import {
  pageSizeMore_1280,
  pageSize_761_1279,
  pageSizeLess_761,
  btnSizeMore_1280,
  btnSizeLess_1279,
} from "../../../utils/constants";

function MoviesCardList({
  handleSaveClick,
  allMovies,
  isMoviesRender,
  savedMovies,
  handleClick,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [moviesPageDisplay, setMoviesPageDisplay] = useState(isMoviesRender);
  const [moviesPageScreen, setMoviesPageScreen] = useState(0);
  const [moviesAddToPage, setMoviesAddToPage] = useState(0);

  useEffect(() => {
    const windowSize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (screenWidth > 1280) {
      setMoviesPageScreen(pageSizeMore_1280);
      setMoviesAddToPage(btnSizeMore_1280);
    } else if (screenWidth <= 1280 && screenWidth > 761) {
      setMoviesPageScreen(pageSize_761_1279);
      setMoviesAddToPage(btnSizeLess_1279);
    } else if (screenWidth <= 761) {
      setMoviesPageScreen(pageSizeLess_761);
      setMoviesAddToPage(btnSizeLess_1279);
    }

    window.addEventListener("resize", windowSize);
    return () => {
      window.removeEventListener("resize", windowSize);
    };
  }, [screenWidth]);

  // Функция  "Ещё"
  const handleClickMoreMovies = () => {
    setMoviesPageScreen(moviesPageScreen + moviesAddToPage);
  };

  useEffect(() => {
    setMoviesPageDisplay(isMoviesRender.slice(0, moviesPageScreen));
  }, [isMoviesRender, moviesPageScreen]);
  //debugger;
  return (
    <section className="content__moviesCardList moviesCardList">
      { 
      allMovies.length === 0  &&  localStorage.getItem("filter") === null  ? (
        <div></div>
      ) : isMoviesRender.length !== 0  ? (
        <>
          <ul className="moviesCardList__list">
            {moviesPageDisplay.map((movie) => (
              <Movie
                movie={movie}
                savedMovies={savedMovies}
                key={movie.movieId || movie._id || movie.id}
                handleSaveClick={handleSaveClick}
                handleClick={handleClick}
              />
            ))}
          </ul>
          <div className="moviesCardList__else">
            {isMoviesRender.length > moviesPageScreen ? (
              <button
                className="moviesCardList__button"
                type="button"
                title="Ещё"
                onClick={handleClickMoreMovies}
              >
                Ещё
              </button>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <div className="moviescardlist__notfound">Ничего не найдено...</div>
      )}
    </section>
  );
}

export default MoviesCardList;
