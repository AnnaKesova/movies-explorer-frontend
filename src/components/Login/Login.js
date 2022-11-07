import { Link } from "react-router-dom";
import React, {useEffect} from "react";
import "./Login.css";
import { useFormWithValidation } from "../../utils/validate";

function Login({ onLogin}) {
  const { values, errors, handleChange, isValid } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }
  return (
    <section className="content__registrer registrer login">
      <div className="registrer__description">
        <h3 className="registrer__name">Рады видеть!</h3>
        <form
          className="registrer__form form-registrer"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className=" form-register__wrapper login__wrapper">
            <h2 className="form-registrer__name">E-mail</h2>
            <input
              className="form-registrer__input form__input"
              type="email"
              name="email"
              placeholder="Email"
              value={values.email || ""}
              minLength="2"
              maxLength="40"
              required
              id="email"
              pattern="^\w+([\.-]?\w+)*@\w*(\.\w{2,})+$"
              onChange={handleChange}
            ></input>
            <span className="form-registrer__error">{errors.email}</span>
            <h2 className="form-registrer__name">Пароль</h2>
            <input
              className="form__input form-registrer__input"
              type="password"
              name="password"
              placeholder="Пароль"
              value={values.password || ""}
              minLength="2"
              maxLength="200"
              required
              id="password"
              onChange={handleChange}
            ></input>
            <span className="form-registrer__error">{errors.password}</span>
          </div>
          <div className="form-register__navigation">
            <button
              type="submit"
              className={
                isValid
                  ? "form-registrer__button"
                  : "form-registrer__button_inactive"
              }
            >
              Войти
            </button>
          </div>
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
