import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <section className="content__registrer registrer login">
      <div className="registrer__description">
        <h3 className="registrer__name">Рады видеть!</h3>
        <form className="registrer__form form-registrer">
          <div className=" form-register__wrapper login__wrapper">
            <span className="form-registrer__name">E-mail</span>
            <input
              className="form-registrer__input form__input"
              required=""
              placeholder="pochta@yandex.ru"
            ></input>
            <span className="form-registrer__name">Пароль</span>
            <input
              className="form__input form-registrer__input"
              required=""
              placeholder=""
            ></input>
          </div>
          <button type="button" className="form-registrer__button">
            Войти
          </button>
        </form>
        <p className="registrer__question">
          Ещё не зарегистрированы?
          <span className="registrer__in">
            <Link
              className="registrer__profile profile__accaunt_color"
              to="/signup"
            >
              Регистрация
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
}
export default Login;
