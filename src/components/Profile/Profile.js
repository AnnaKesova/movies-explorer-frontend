import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <section className="content__profile profile">
      <div className="profile__description">
        <h3 className="profile__name">Привет, Виталий!</h3>
        <form className="profile__form form">
          <span className="form__name form__name_margin">Василий</span>
          <input className="form__input" required="" placeholder="Имя"></input>
          <span className="form__name">pochta@yandex.ru</span>
          <input
            className="form__input"
            required=""
            placeholder="E-mail"
          ></input>
        </form>
        <div className="profile__instrument">
          <Link className="profile__accaunt" to="/profile">
            Редактировать
          </Link>
          <Link
            className="profile__accaunt profile__accaunt_color"
            to="/signin"
          >
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Profile;
