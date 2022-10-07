import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import one from "../../images/onepicture.svg";
import two from "../../images/twopicture.svg";
import three from "../../images/treepicture.svg";
import like from "../../images/save9.svg";

function SavedMovies() {
  return (
    <main className="page__content content">
      <SearchForm></SearchForm>
      <section className="content__moviesCardList moviesCardList savedMovies">
        <ul className="moviesCardList__list">
          <li className="moviesCardList__film">
            <div className="moviesCardList__about">
              <div className="moviesCardList__description">
                <p className="moviesCardList__name">33 слова о дизайне</p>
                <p className="moviesCardList__time">1ч 47м</p>
              </div>
              <button className="moviesCardList__save" type="button">
                <img
                  src={like}
                  className="moviesCardList__like"
                  alt="сохранить"
                />
              </button>
            </div>
            <img src={one} className="moviesCardList__poster" alt="film" />
          </li>
          <li className="moviesCardList__film">
            <div className="moviesCardList__about">
              <div className="moviesCardList__description">
                <p className="moviesCardList__name">33 слова о дизайне</p>
                <p className="moviesCardList__time">1ч 47м</p>
              </div>
              <button className="moviesCardList__save" type="button">
                <img
                  src={like}
                  className="moviesCardList__like"
                  alt="сохранить"
                />
              </button>
            </div>
            <img src={two} className="moviesCardList__poster" alt="film" />
          </li>
          <li className="moviesCardList__film">
            <div className="moviesCardList__about">
              <div className="moviesCardList__description">
                <p className="moviesCardList__name">33 слова о дизайне</p>
                <p className="moviesCardList__time">1ч 47м</p>
              </div>
              <button className="moviesCardList__save" type="button">
                <img
                  src={like}
                  className="moviesCardList__like"
                  alt="сохранить"
                />
              </button>
            </div>
            <img src={three} className="moviesCardList__poster" alt="film" />
          </li>
        </ul>
      </section>
    </main>
  );
}

export default SavedMovies;
