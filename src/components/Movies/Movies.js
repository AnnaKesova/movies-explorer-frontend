import "./Movies.css";
import { useState, useEffect } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { moviesLegth } from "../../utils/constants";
import Preloader from "../Movies/Preloader/Preloader";

function Movies({
  movies,
  allMovies,
  getAllMovies,
  isPreloaderActive,
}) {
  const [flag] = useState("content");

  
  const extractCheckBoxStatus = () => {
    const userCheckBoxStatus = JSON.parse(localStorage.getItem("checkBox"));
    return userCheckBoxStatus ? userCheckBoxStatus : false;
  };


  const extractKeyWords = () => {
    const userKeyWords = localStorage.getItem("keyWords");
    return userKeyWords ? "" : userKeyWords;
  };

  const [isCheckBoxActive, setIsCheckBoxActive] = useState(
    extractCheckBoxStatus()
  );
  const [keyWords, setKeyWords] = useState(extractKeyWords());
  const [moviesToRender, setMoviesToRender] = useState([]);

  // Обработка запроса на поиск фильма
  const handleMoviesSearch = (text) => {
    if (allMovies.length < 1) {
      getAllMovies();
    }
    setKeyWords(text);
  };

  const filterMovies = (movies, keyWords, isCheckBoxActive) => {
    let filteredMovies = movies;

    if (keyWords !== "") {
      filteredMovies = filteredMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(keyWords.toLowerCase())
      );
    }

    if (isCheckBoxActive) {
      filteredMovies = filteredMovies.filter(
        (item) => item.duration <= moviesLegth
      );
    }
    
    return filteredMovies;
  };

  //  нажатие на чекбокс
  const handleCheckBoxClick = () => {
    setIsCheckBoxActive(!isCheckBoxActive);
  };

  // Сохранение чекбокса фильтрации короткометражных фильмов
  useEffect(() => {
    localStorage.setItem("checkBox", isCheckBoxActive);
  }, [isCheckBoxActive]);

  useEffect(() => {
    const moviesFiltered = filterMovies(allMovies, keyWords, isCheckBoxActive);
    setMoviesToRender(moviesFiltered);
  }, [isCheckBoxActive, keyWords, allMovies]);

  // Сохраняю слово при его изменении
  useEffect(() => {
    localStorage.setItem("keyWords", keyWords);
  }, [keyWords]);

  useEffect(() => {
    const moviesFiltered = filterMovies(allMovies, keyWords);
    setMoviesToRender(moviesFiltered);
  }, [keyWords, allMovies]);

  return (
    <main className="page__content content">
      <SearchForm
        handleMoviesSearch={handleMoviesSearch}
        keyWords={keyWords}
        isCheckBoxActive={isCheckBoxActive}
        handleCheckBoxClick={handleCheckBoxClick}
        setKeyWords={setKeyWords}
        setIsCheckBoxActive={setIsCheckBoxActive}
      ></SearchForm>
      <MoviesCardList
        moviesToRender={moviesToRender}
        flag={flag}
        movies={movies}
        allMovies={allMovies}
      ></MoviesCardList>
    </main>
  );
}

export default Movies;
