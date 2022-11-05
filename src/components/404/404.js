import { Link } from "react-router-dom";
import "./404.css";

function NotFound() {
  return (
    <section className="content__notFound notFound">
      <div className="notFound__wrapper">
        <h2 className="notFound__numder">404</h2>
        <p className="notFound__page">Страница не найдена</p>
      </div>
      <Link className="notFound__link" to="/">
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
