import "./SavedMovies.css";
import { useState, useEffect } from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Movie from "../Movies/Movie/Movie";

function SavedMovies({movie, allMovies}) {
  
  return (
    <main className="page__content content savedContent">
      <SearchForm></SearchForm>
      <section className="content__moviesCardList moviesCardList savedMovies">
        <ul className="moviesCardList__list">
        
        </ul>
      </section>
    </main>
  );
}

export default SavedMovies;
