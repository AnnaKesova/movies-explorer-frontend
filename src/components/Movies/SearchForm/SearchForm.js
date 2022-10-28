import { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({
  handleMoviesSearch,
  keyWords = "",
  isCheckBoxActive,
  setIsCheckBoxActive,
}) => {
  
  const [text, setText] = useState(keyWords);

  // Обработка сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    handleMoviesSearch(text, isCheckBoxActive);
  };

  const handleCheckBoxClick = () => {
    setIsCheckBoxActive(!isCheckBoxActive);
  };

  // Убирает текст ошибки как только в поле поиска что-то ввeли, обновляет стейт text
  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
  };

  const [isCheckbox, setCheckbox] = useState(true);
  const onCheckboxToggle = () => setCheckbox(!isCheckbox);

  return (
    <section className=" content__searchForm searchForm">
      <form className="searchForm__form" onSubmit={handleSubmit} noValidate>
        <input
          className="searchForm__linesearch"
          placeholder="Фильм"
          required
          type="search"
          onChange={handleChange}
          value={text}
        ></input>
        <button className="searchForm__search" id="searchBtn">
          Найти
        </button>
      </form>
      <div className="searhForm__radio filterCheckbox">
        <label className="filterCheckbox__radioButton">
          <input
            className="filterCheckbox__input"
            required
            checked={isCheckbox}
            type="checkbox"
            onChange={onCheckboxToggle}
            onClick={handleCheckBoxClick}
          ></input>
          <span className="filterCheckbox__slider"></span>{" "}
        </label>
        <p className="filterCheckbox__name">Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
