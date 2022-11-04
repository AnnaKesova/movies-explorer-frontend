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

function MoviesCardList({ handleClick, allMovies, isMoviesRender }) {
  const [moviesPageDisplay, setMoviesPageDisplay] = useState(isMoviesRender);
  const [moviesPageScreen, setMoviesPageScreen] = useState(0);
  const [moviesAddToPage, setMoviesAddToPage] = useState(0);
 

  //  ширина экрана и количества отображемых фильмов и добовляемых
  useEffect(() => {
    const screenWidth = window.screen.width;

    if (screenWidth >= 1280) {
      setMoviesPageScreen(pageSizeMore_1280);
      setMoviesAddToPage(btnSizeMore_1280);
    } else if (screenWidth < 1280 && screenWidth > 761) {
      setMoviesPageScreen(pageSize_761_1279);
      setMoviesAddToPage(btnSizeLess_1279);
    } else {
      setMoviesPageScreen(pageSizeLess_761);
      setMoviesAddToPage(btnSizeLess_1279);
    }
  }, [isMoviesRender]);

  // Функция  "Ещё"
  const handleClickMoreMovies = () => {
    setMoviesPageScreen(moviesPageScreen + moviesAddToPage);
  };

  useEffect(() => {
    setMoviesPageDisplay(isMoviesRender.slice(0, moviesPageScreen));
  }, [isMoviesRender, moviesPageScreen]);


  return (
    <section className="content__moviesCardList moviesCardList">
      {allMovies.length === 0 ? (
        <div></div>
      ) : isMoviesRender.length !== 0 ? (
        <>
          <ul className="moviesCardList__list">
            {moviesPageDisplay.map((movie) => (
              <Movie
                movie={movie}
                key={movie.movieId || movie._id || movie.id}
                handleClick={handleClick}
              />
            ))}
          </ul>
          <div className="moviesCardList__else">
            <button
              className="moviesCardList__button"
              type="button"
              title="Ещё"
              onClick={handleClickMoreMovies}
            >
              Ещё
            </button>
          </div>
        </>
      ) : (
        <div className="moviescardlist__notfound">Ничего не найдено...</div>
      )}
    </section>
  );
}

export default MoviesCardList;