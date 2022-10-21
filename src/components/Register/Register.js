import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Register/Register.css";

function Register({ onRegister }) {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(data);
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
            <span className="form-registrer__name">Имя</span>
            <input
              className="form__input form-registrer__input"
              required
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              name="name"
              value={data.name}
              onChange={handleChange}
            ></input>
            <span className="form-registrer__name">E-mail</span>
            <input
              className="form-registrer__input form__input"
              type="text"
              name="email"
              placeholder="Email"
              value={data.email}
              minLength="2"
              maxLength="30"
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
            <span className="form-registrer__name form-registrer__name_color">
              Что-то пошло не так
            </span>
          </div>

          <button type="submit" className="form-registrer__button">
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
