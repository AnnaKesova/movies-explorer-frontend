import "./Movies.css";
import { useState, useEffect } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { moviesLegth } from "../../utils/constants";
import Preloader from "../Movies/Preloader/Preloader";

function Movies({
  allMovies,
  setAllMovies,
 // IsPreloader,
  handleSaveMovie,
  savedMovies,
}) {
  const [isMoviesRender, setisMoviesRender] = useState([]);
  const changeCheckBox = () => {
    const checkBoxMovie = JSON.parse(localStorage.getItem("checkBox"));
    return checkBoxMovie ? false : checkBoxMovie;
  };
  const [IsPreloader, setIsPreloader] = useState(false);
  const [isWords, setIsWords] = useState("");
  const [isCheckBoxMovie, setIsCheckBoxMovie] = useState(changeCheckBox());

  useEffect(() => {
    setAllMovies([]);
  }, []);

  // Обработка запроса на поиск фильма
  const handleMoviesSearch = (text) => {
    setTimeout(setIsPreloader(true), 1000);
    const movies = JSON.parse(localStorage.getItem("allMovies"));
    const moviesFiltered = filterMovies(movies, text, isCheckBoxMovie);
    setAllMovies(moviesFiltered);
    setIsPreloader(false)
    setIsWords(text);
    localStorage.setItem("words", text); 
   // localStorage.setItem("filter", moviesFiltered);
  };

  const filterMovies = (movies, isWords, isCheckBoxMovie) => {
    let filteredMovies = movies;
    if (isWords && movies) {
      filteredMovies = filteredMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(isWords.toLowerCase())
      );
    }

    if (isCheckBoxMovie) {
      filteredMovies = filteredMovies.filter(
        (item) => item.duration <= moviesLegth
      );
    }

    //localStorage.setItem("filter", filteredMovies);

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
  /*useEffect(() => {
    localStorage.setItem("words", isWords);
  }, [isWords]);*/

  // ОБработка сохранить фильм 
  const handleClickSaveIcon = (data) => {
    handleSaveMovie(data);
  };

  return (
    <main className="page__content content">
      <SearchForm
        handleMoviesSearch={handleMoviesSearch}
        isWords={isWords}
        isCheckBoxMovie={isCheckBoxMovie}
        setIsWords={setIsWords}
        setIsCheckBoxMovie={setIsCheckBoxMovie}
      ></SearchForm>
      {IsPreloader ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isMoviesRender={isMoviesRender}
          allMovies={allMovies}
          handleClick={handleClickSaveIcon}
          savedMovies={savedMovies}
        ></MoviesCardList>
      )}
    </main>
  );
}

export default Movies;
