import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/validate";
import apiMain from "../../utils/MainApi";

function Profile({ handleOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } =
    useFormWithValidation();

  const [classesListEditProfile, setClassesListEditProfile] = useState(
    "form__instrument_visible"
  );
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [classesListSubmitProfile, setClassesListSubmitProfile] = useState("");
  const [editProfileStatus, setEditProfileStatus] = useState("");
  const [editProfileError, setEditProfileError] = useState("");
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [classesListFinilProfile, setclassesListFinilProfile] = useState("");

  const submitButtonClass = !isSaveEnabled
    ? "form__profile-change form__profile-change_inactive"
    : "form__profile-change";

  useEffect(() => {
    if (
      isValid &&
      (values.name !== currentUser.name || values.email !== currentUser.email)
    )
      setIsSaveEnabled(true);
    else setIsSaveEnabled(false);
  }, [values, isValid, currentUser.email, currentUser.name]);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile({ name: values.name, email: values.email });
  }

  function onEditProfile({ name, email }) {
    apiMain
      .updateUserInfo({ name: name, email: email })
      .then(() => {
        setClassesListSubmitProfile("");
        setclassesListFinilProfile("profile__finil_visible");
        setEditProfileStatus("Сохранено");
        setIsFormDisabled(true);
      })
      .catch(() => {
        setEditProfileError("Произошла ошибка, попробуйте снова");
      });
  }

  function handleEditProfile() {
    setClassesListSubmitProfile("profile__submit_visible");
    setClassesListEditProfile("");
    setIsFormDisabled(false);
    setEditProfileStatus("");
    setEditProfileError("");
  }

  return (
    <section className="content__profile profile">
      <div className="profile__description">
        <h3 className="profile__name">Привет, {currentUser.name}!</h3>
        <form className="profile__form form" onSubmit={handleSubmit}>
          <span className="form__name form__name_margin"></span>
          <label className="form__label">
            <h2 className="form__label-name">Имя</h2>
            <input
              className="form__input profile__input"
              type="name"
              name="name"
              id="profile-name-input"
              required
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              value={values.name || ""}
              onChange={handleChange}
              disabled={isFormDisabled}
            ></input>
          </label>
          <span className="profile__form-error">{errors.name || ""}</span>

          <label className="form__label">
            <h2 className="form__label-name">Почта</h2>
            <input
              className="form__input profile__input"
              type="email"
              required
              name="email"
              id="profile-email-input"
              placeholder="Почта"
              minLength="2"
              maxLength="30"
              value={values.email || ""}
              onChange={handleChange}
              disabled={isFormDisabled}
            ></input>
          </label>
          <span className="profile__form-error">{errors.email || ""}</span>

          <div className={`form__instrument ${classesListEditProfile}`}>
            <span className="profile__error-text">{editProfileError}</span>
            <span className="profile__submit_type-success">
              {editProfileStatus}
            </span>
            <button
              type="button"
              className="form__accaunt"
              onClick={handleEditProfile}
            >
              Редактировать
            </button>
            <Link className="form__color" onClick={handleOut} to="/signin">
              Выйти из аккаунта
            </Link>
          </div>
          <div className={`profile__submit ${classesListSubmitProfile}`}>
            <span className="profile__error-text">{editProfileError}</span>
            <span className="profile__submit_type-success">
              {editProfileStatus}
            </span>
            <button
              type="submit"
              className={submitButtonClass}
              disabled={!isSaveEnabled}
            >
              Сохранить
            </button>
          </div>
          <div className={`profile__finil ${classesListFinilProfile}`}>
            <span className="profile__error-text">{editProfileError}</span>
            <span className="profile__submit_type-success">
              {editProfileStatus}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
