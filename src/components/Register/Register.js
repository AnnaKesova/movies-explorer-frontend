import React from "react";
import { Link } from "react-router-dom";
import "../Register/Register.css";
import { useFormWithValidation } from "../../utils/validate";
import { useEffect } from "react";

function Register({ onRegister, registerError, setRegisterError }) {
  const { values, errors, handleChange, isValid } = useFormWithValidation();

  useEffect(() => {
    setRegisterError("")
}, []);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
    
  }

  return (
    <section className="content__registrer registrer">
      <div className="registrer__description">
        <h3 className="registrer__name">Добро пожаловать!</h3>
        <form
          className="registrer__form form-registrer"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className=" form-register__wrapper">
            <h2 className="form-registrer__name">Имя</h2>
            <input
              className="form__input form-registrer__input"
              required
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              type="name"
              name="name"
              value={values.name || ""}
              onChange={handleChange}
            ></input>
            <span className="form-registrer__error">{errors.name}</span>
            <h2 className="form-registrer__name">E-mail</h2>
            <input
              className="form-registrer__input form__input"
              type="email"
              name="email"
              placeholder="Email"
              value={values.email || ""}
              minLength="2"
              maxLength="30"
              required
              id="email"
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
          <span className="form-registrer__error">{registerError ? registerError : ""}</span>
            <button
              type="submit"
              className={
                isValid
                  ? "form-registrer__button"
                  : "form-registrer__button_inactive"
              }
            >
              Зарегистрироваться
            </button>
          </div>
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