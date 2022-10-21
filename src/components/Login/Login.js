import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import "./Login.css";

function Login({onLogin}) {
  const [data, setData] = useState({ email: "", password: "" });
  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(data);
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
            <span className="form-registrer__name">E-mail</span>
            <input
              className="form-registrer__input form__input"
              type="text"
              name="email"
              placeholder="Email"
              value={data.email}
              minLength="2"
              maxLength="40"
              required
              id="email"
              onChange={handleChange}
            ></input>
            <span className="form-registrer__name">Пароль</span>
            <input
              className="form__input form-registrer__input"
              type="text"
              name="password"
              placeholder="Пароль"
              value={data.password}
              minLength="2"
              maxLength="200"
              required
              id="password"
              onChange={handleChange}
            ></input>
          </div>
          <button type="submit" className="form-registrer__button">
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
