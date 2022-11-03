import "./Movies.css";
import { useState, useEffect } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { moviesLegth } from "../../utils/constants";
import Preloader from "../Movies/Preloader/Preloader";

function Movies({ allMovies, setAllMovies, getAllMovies, IsPreloader, handleSaveMovie }) {

  const changeCheckBox = () => {
    const checkBoxMovie = JSON.parse(localStorage.getItem("checkBox"));
    return checkBoxMovie ? false : checkBoxMovie;
  };

  const [isWords, setKeyWords] = useState('');
  const [isCheckBoxMovie, setIsCheckBoxMovie] = useState(changeCheckBox());
  const [message, setMessage] = useState('');
 


  useEffect(() => {
    setAllMovies([])
  }, [])

  // Обработка запроса на поиск фильма
  const handleMoviesSearch = (text) => {
    const movies = JSON.parse(localStorage.getItem('allMovies'));
    const moviesFiltered = filterMovies(movies, text, isCheckBoxMovie);
    setAllMovies(moviesFiltered);
    setKeyWords(text)
    localStorage.setItem("words", text);

    if (moviesFiltered.length === 0) {
      setMessage('Ничего не найдено...')
    } else {
      setMessage('')
    }
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

    return filteredMovies;
  };

  // Сохранение чекбокса фильтрации короткометражных фильмов
  useEffect(() => {
    localStorage.setItem("checkBox", isCheckBoxMovie);
  }, [isCheckBoxMovie]);

   useEffect(() => {
   const moviesFiltered = filterMovies(allMovies, isWords, isCheckBoxMovie);
   setAllMovies(moviesFiltered);
   }, [isCheckBoxMovie]);

  // Сохраняю слово при его изменении
  useEffect(() => {
    localStorage.setItem("words", isWords);
  }, [isWords]);

  // ОБработка  на иконку сохраниить фильм 
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
          message={message}
          isMoviesRender={allMovies}
          allMovies={allMovies}
          handleClick={handleClickSaveIcon}
        ></MoviesCardList>
      )}
    </main>
  );
}

export default Movies;
