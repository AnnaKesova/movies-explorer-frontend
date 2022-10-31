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

function MoviesCardList({ handleClick, allMovies, moviesToRender }) {

  const [moviesStartPack, setMoviesStartPack] = useState(moviesToRender);
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
  }, [moviesToRender]);


  // Функция изменяет количество фильмов "Ещё"
  const handleClickMoreMovies = () => {
    setMoviesPerPage(moviesPerPage + moviesAddToPage);
  };

  useEffect(() => {
    setMoviesStartPack(moviesToRender.slice(0, moviesPerPage));
  }, [moviesToRender, moviesPerPage]);

  
  
 // console.log (moviesPerPage)
  console.log(allMovies)
  //console.log(movies)

  return (
    <section className="content__moviesCardList moviesCardList">
      {allMovies.length === 0 ? (
        <div></div>
      ) : moviesToRender.length !== 0 ? (
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
      ) : (
        <div className="moviescardlist__notfound">Ничего не найдено...</div>
      )}
    </section>
  );
}


export default MoviesCardList;
