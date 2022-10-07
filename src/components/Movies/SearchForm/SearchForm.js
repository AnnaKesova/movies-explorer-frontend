import { useState } from "react";
import "./SearchForm.css";

function SearchForm() {
    const [isCheckbox, setCheckbox] = useState(true);
    const onCheckboxToggle = () => setCheckbox(!isCheckbox);


  return (
    <section className=" content__searchForm searchForm">
      <form className="searchForm__form">
        <input
          className="searchForm__linesearch"
          placeholder="Фильм"
          required
        ></input>
        <button className="searchForm__search">Найти</button>
      </form>
      <div className="searhForm__radio filterCheckbox">
        <label className="filterCheckbox__radioButton">
            <input className="filterCheckbox__input" required checked={isCheckbox} type="checkbox"
        onChange={onCheckboxToggle}>
            </input>
            <span className="filterCheckbox__slider"></span> </label>
        <p className="filterCheckbox__name">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
