import { Link } from "react-router-dom";
import "../Register/Register.css";

function Register() {
  return (
    <section className="content__registrer registrer">
      <div className="registrer__description">
        <h3 className="registrer__name">Добро пожаловать!</h3>
        <form className="registrer__form form-registrer">
          <div className=" form-register__wrapper">
            <span className="form-registrer__name">Имя</span>
            <input
              className="form__input form-registrer__input"
              required=""
              placeholder="Василий"
              minlength="2"
              maxlength="24"
            ></input>
            <span className="form-registrer__name">E-mail</span>
            <input
              className="form-registrer__input form__input"
              required=""
              placeholder="pochta@yandex.ru"
              minlength="2"
              maxlength="24"
            ></input>
            <span className="form-registrer__name">Пароль</span>
            <input
              className="form__input form-registrer__input"
              required=""
              placeholder="••••••••••••••"
              minlength="2"
              maxlength="24"
            ></input>
            <span className="form-registrer__name form-registrer__name_color">
              Что-то пошло не так
            </span>
          </div>

          <button type="button" className="form-registrer__button">
            Зарегистрироваться
          </button>
        </form>
        <p className="registrer__question">
          Уже зарегистрированы?
          <span className="registrer__in">
            <Link
              className="registrer__profile profile__accaunt_color"
              to="/signin"
            >
              Войти
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
}

export default Register;
