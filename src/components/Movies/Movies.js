import "./Movies.css";
import { useState, useEffect } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { moviesLegth } from "../../utils/constants";
import Preloader from "../Movies/Preloader/Preloader";

function Movies({ allMovies, getAllMovies, IsPreloader }) {

  const extractCheckBoxStatus = () => {
    const userCheckBoxStatus = JSON.parse(localStorage.getItem("checkBox"));
    return userCheckBoxStatus ?  false : userCheckBoxStatus;
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
    console.log(
      "!",
      movies.length,
      filteredMovies.length,
      keyWords,
      isCheckBoxActive
    );

    return filteredMovies;
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


  
//  console.log(moviesToRender)

  return (
    <main className="page__content content">
      <SearchForm
       handleMoviesSearch={handleMoviesSearch}
        keyWords={keyWords}
        isCheckBoxActive={isCheckBoxActive}
        setKeyWords={setKeyWords}
        setIsCheckBoxActive={setIsCheckBoxActive}
      ></SearchForm>
      {IsPreloader ? (
        <Preloader />
      ) : (
        <MoviesCardList
        moviesToRender={moviesToRender}
          allMovies={allMovies}
        ></MoviesCardList>
      )}
    </main>
  );
}

export default Movies;
