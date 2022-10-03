import { Link } from "react-router-dom";
import "./HeaderMovies.css";
import logo from "../../../images/logo.svg";
import people from "../../../images/people.svg";

function HeaderMovies() {
  return (
    <header className="page__header headerm">
      <div className="headerm__content">
        <Link class="headerm__link" href="/movies-explorer-frontend">
          <img src={logo} className="headerm__logo" alt="logo" />
        </Link>
        <nav className="headerm__movies movies">
          <ul className="movies__list">
            <li className="movies__navigate">
              <Link className="movies__dif" to="/movies">
                Фильмы
              </Link>
            </li>
            <li className="movies__navigate">
              <Link className="movies__dif movies__dif_normal" to="/saved-movies">
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <button className="movies__profile" type="button" to="/profile">
            <span className="movies__name">Аккаунт</span>
            <div className="movies__radius">
            <img src={people} className="movies__my" alt="people" />
            </div>
            
          </button>
        </nav>
      </div>
    </header>
  );
}

export default HeaderMovies;
