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

function MoviesCardList({ handleClick, allMovies, isMoviesRender, message }) {
  const [moviesStartPack, setMoviesStartPack] = useState(isMoviesRender);
  const [moviesPerPage, setMoviesPerPage] = useState(0);
  const [moviesAddToPage, setMoviesAddToPage] = useState(0);

  //  ширина экрана и количества отображемых фильмов и добовляемых
  useEffect(() => {
    const screenWidth = window.screen.width;

    if (screenWidth >= 1280) {
      setMoviesPerPage(pageSizeMore_1280);
      setMoviesAddToPage(btnSizeMore_1280);
    } else if (screenWidth < 1280 && screenWidth > 761) {
      setMoviesPerPage(pageSize_761_1279);
      setMoviesAddToPage(btnSizeLess_1279);
    } else {
      setMoviesPerPage(pageSizeLess_761);
      setMoviesAddToPage(btnSizeLess_1279);
    }
  }, [isMoviesRender]);

  // Функция  "Ещё"
  const handleClickMoreMovies = () => {
    setMoviesPerPage(moviesPerPage + moviesAddToPage);
  };

  useEffect(() => {
    setMoviesStartPack(isMoviesRender.slice(0, moviesPerPage));
  }, [isMoviesRender, moviesPerPage]);

  return (
    <section className="content__moviesCardList moviesCardList">
      {allMovies &&
        <>
          <ul className="moviesCardList__list">
            {moviesStartPack.map((movie) => (
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
      }
      <div className="moviescardlist__notfound">{message}</div>
    </section>
  );
}

export default MoviesCardList;
