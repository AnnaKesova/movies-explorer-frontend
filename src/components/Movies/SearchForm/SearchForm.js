import { useState } from "react";
import "./SearchForm.css";

const SearchForm = ({
  handleMoviesSearch,
  isCheckBoxMovie,
  setIsCheckBoxMovie,
  isWords,
  setKeyWords
}) => {

  const [isCheckbox, setCheckbox] = useState(false);
  const onCheckboxToggle = () => setCheckbox(!isCheckbox);

  // Обработка сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    handleMoviesSearch(isWords, isCheckBoxMovie);
  };

  const handleCheckBoxClick = () => {
    setIsCheckBoxMovie(!isCheckBoxMovie);
  };

  //  обновляет  isText
  const handleChange = ({ target: { value } }) => {
    setKeyWords(value);
  };


  return (
    <section className=" content__searchForm searchForm">
      <form className="searchForm__form" onSubmit={handleSubmit} noValidate>
        <input
          className="searchForm__linesearch"
          placeholder="Фильм"
          required
          type="search"
          onChange={handleChange}
          value={isWords ?? ""}
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
