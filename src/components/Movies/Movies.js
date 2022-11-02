import "./Movies.css";
import { useState, useEffect } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { moviesLegth } from "../../utils/constants";
import Preloader from "../Movies/Preloader/Preloader";

function Movies({ allMovies, getAllMovies, IsPreloader, handleSaveMovie }) {
  const changeKeyWords = () => {
    const wordsMovie = localStorage.getItem("words");
    return wordsMovie ? "" : wordsMovie;
  };

  const changeCheckBox = () => {
    const checkBoxMovie = JSON.parse(localStorage.getItem("checkBox"));
    return checkBoxMovie ? false : checkBoxMovie;
  };

  const [isWords, setKeyWords] = useState(changeKeyWords());
  const [isCheckBoxMovie, setIsCheckBoxMovie] = useState(changeCheckBox());
  const [isMoviesRender, setisMoviesRender] = useState([]);

  // Обработка запроса на поиск фильма
  const handleMoviesSearch = (text) => {
    getAllMovies();
    setKeyWords(text);
  };

  const filterMovies = (movies, isWords, isCheckBoxMovie) => {
    let filteredMovies = movies;

    if (isWords !== "") {
      filteredMovies = filteredMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(isWords.toLowerCase())
      );
    }

    if (isCheckBoxMovie) {
      filteredMovies = filteredMovies.filter(
        (item) => item.duration <= moviesLegth
      );
    }
   /* console.log(
      "!",
      movies.length,
      filteredMovies.length,
      isWords,
     isCheckBoxMovie
    );*/

    return filteredMovies;
  };

  // Сохранение чекбокса фильтрации короткометражных фильмов
  useEffect(() => {
    localStorage.setItem("checkBox", isCheckBoxMovie);
  }, [isCheckBoxMovie]);

  useEffect(() => {
    const moviesFiltered = filterMovies(allMovies, isWords, isCheckBoxMovie);
    setisMoviesRender(moviesFiltered);
  }, [isCheckBoxMovie, isWords, allMovies]);

  // Сохраняю слово при его изменении
  useEffect(() => {
    localStorage.setItem("words", isWords);
  }, [isWords]);

  // ОБработка на жатися на иконку сохраниить фильм (в зависимости от статуса фильма происходит разные действия)
  const handleClickSaveIcon = (data) => {
    handleSaveMovie(data);
  };

  return (
    <main className="page__content content">
      <SearchForm
        handleMoviesSearch={handleMoviesSearch}
        isWords={isWords}
        isCheckBoxMovie={isCheckBoxMovie}
        setKeyWords={setKeyWords}
        setIsCheckBoxMovie={setIsCheckBoxMovie}
      ></SearchForm>
      {IsPreloader ? (
        <Preloader />
      ) : (
        <MoviesCardList
        isMoviesRender={isMoviesRender}
          allMovies={allMovies}
          handleClick={handleClickSaveIcon}
        ></MoviesCardList>
      )}
    </main>
  );
}

export default Movies;
