import "./Movies.css";
import { useState, useEffect } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { moviesLegth } from "../../utils/constants";
import Preloader from "../Movies/Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";

function Movies({
  allMovies,
  setAllMovies,
  handleSaveMovie,
  savedMovies,
  handleDeleteMovie
}) {
  const [isMoviesRender, setisMoviesRender] = useState([]);
  const changeCheckBox = () => {
    const checkBoxMovie = JSON.parse(localStorage.getItem("checkBox"));
    return checkBoxMovie ? false : checkBoxMovie;
  };

  const extraIsWords = () => {
    const searchIsWords = localStorage.getItem("words");
    return searchIsWords ? searchIsWords : "";
  };

  const [IsPreloader, setIsPreloader] = useState(false);
  const [isWords, setIsWords] = useState(extraIsWords());
  const [isCheckBoxMovie, setIsCheckBoxMovie] = useState(changeCheckBox());

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
    return filteredMovies;
  };

  // Обработка запроса на поиск фильма
  const handleMoviesSearch = (text) => {
    if (localStorage.getItem("allMovies") === null) {
      setIsPreloader(true);

      moviesApi.getMovies().then((movies) => {
        const moviesFiltered = filterMovies(movies, text, false);
        setAllMovies(moviesFiltered);
        setIsWords(text);
        localStorage.setItem("words", text);
        localStorage.setItem("allMovies", JSON.stringify(movies));
        localStorage.setItem("filter", JSON.stringify(moviesFiltered));
        setIsPreloader(false);
      });
    } else {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      const moviesFiltered = filterMovies(movies, text, false);
      setIsWords(text);
      localStorage.setItem("words", text);
      localStorage.setItem("filter", JSON.stringify(moviesFiltered));
      setAllMovies(moviesFiltered);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("filter") !== null) {
      const currentMovie = JSON.parse(localStorage.getItem("filter"));
      setAllMovies(currentMovie);
    } else {
      setAllMovies([]);
    }
  }, []);

  // Сохранение чекбокса фильтрации короткометражных фильмов
  useEffect(() => {
    localStorage.setItem("checkBox", isCheckBoxMovie);
  }, [isCheckBoxMovie]);

  useEffect(() => {
    const moviesFiltered = filterMovies(allMovies, isWords, isCheckBoxMovie);
    setisMoviesRender(moviesFiltered);
  }, [isCheckBoxMovie, isWords, allMovies]);

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
          handleSaveClick={handleClickSaveIcon}
          handleClick={handleDeleteMovie}
          savedMovies={savedMovies}
        ></MoviesCardList>
      )}
    </main>
  );
}

export default Movies;
