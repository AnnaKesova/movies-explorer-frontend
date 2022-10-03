import "./Movies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import Preloader from "../Movies/Preloader/Preloader"

function Movies() {
  return (
    <main className="page__content content">
      <SearchForm></SearchForm>
      <MoviesCardList></MoviesCardList>
      <Preloader></Preloader>
    </main>
  );
}

export default Movies;
