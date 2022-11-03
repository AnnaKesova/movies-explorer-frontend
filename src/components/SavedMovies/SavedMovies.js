import "./SavedMovies.css";
import { useState, useEffect } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies, handleDeleteMovie }) {
  const [isWords, setKeyWords] = useState("");
  const [isMoviesRender, setisMoviesRend] = useState(savedMovies);
  const [isCheckBoxMovie, setIsCheckBoxMovie] = useState(false);

  const filterMovies = (movies, isWords, isCheckBoxMovie) => {
    let filteredMovies = movies; 

    if (isWords && movies) {
      filteredMovies = filteredMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(isWords.toLowerCase())
      );
    }

    if (isCheckBoxMovie) {
      filteredMovies = filteredMovies.filter((item) => item.duration <= 40);
    }
    return filteredMovies;
  };

  // Обработка запроса на поиск фильма
  const handleMoviesSearch = (data, isCheckBoxMovie) => {
    setKeyWords(data);
    const moviesFiltered = filterMovies(savedMovies, data, isCheckBoxMovie);
    setisMoviesRend(moviesFiltered);
  };

  useEffect(() => {
    const moviesFiltered = filterMovies(savedMovies, isWords, isCheckBoxMovie);
    setisMoviesRend(moviesFiltered);
  }, [savedMovies, isWords, isCheckBoxMovie]);

  useEffect(() => {
    setisMoviesRend(savedMovies);
  }, [savedMovies]);

  return (
    <main className="page__content content savedContent">
      <SearchForm
        isWords={isWords}
        setKeyWords={setKeyWords}
        handleMoviesSearch={handleMoviesSearch}
        setisMoviesRend={setisMoviesRend}
        isCheckBoxMovie={isCheckBoxMovie}
        setIsCheckBoxMovie={setIsCheckBoxMovie}
      ></SearchForm>

      {savedMovies.length === 0 ? (
        <p className="savedContent__text">
          Вы еще не сохранили не один фильм.
        </p>
      ) : (
        <MoviesCardList
          isMoviesRender={isMoviesRender}
          allMovies={["savedMovies"]}
          handleClick={handleDeleteMovie}
        ></MoviesCardList>
      )}
    </main>
  );
}

export default SavedMovies;
