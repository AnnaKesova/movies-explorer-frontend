import "./Student.css";

import mypfoto from "../../../images/myphoto.jpg";
import arrow from "../../../images/стрелка.svg";


function Student() {
  return (
    <section className="content__student student">
      <div className="student__project">
        <h3 className="student__title">Студент</h3>
        <div className="student__about">
          <div className="student__description">
            <h2 className="student__name">Анна</h2>
            <p className="student__job">Фронтенд-разработчик, 31 год</p>
            <p className="student__myself">
              Я родилась в Таганроге, живу в Ростове-на-Дону, закончила
              факультет иностранных языков РГЭУ. У меня есть муж и сын. Я люблю
              читать, а ещё мне нравиться бегать по вечерам. Недавно начала
              кодить и меня это очень увлекло, и теперь я заканчиваю курс по
              "Веб-разработке". Я надеюсь, что скоро найду вакансию по своей
              новой специальности.
            </p>
            <a
              className="student__git"
              target="blank"
              href="https://github.com/AnnaKesova"
            >
              Github
            </a>
            <a className="student__portfolio" target="blank" href="###">
              Портфолио
            </a>
          </div>
          <img src={mypfoto} className="student__photo" alt="myphoto"></img>
        </div>
        <ul className="student__links">
          <li className="student__link">
            <a
              className="student__site"
              target="blank"
              href="https://annakesova.github.io/russian-travel/"
            >
              Статичный сайт
            </a>
            <img src={arrow} className="student__arrow" alt="arrow"></img>
          </li>
          <li className="student__link">
            <a
              className="student__site"
              target="blank"
              href="https://annakesova.github.io/mesto/"
            >
              Адаптивный сайт
            </a>
            <img src={arrow} className="student__arrow" alt="arrow"></img>
          </li>
          <li className="student__link">
            <a
              className="student__site"
              target="blank"
              href="https://anna.mesto.students.nomoredomains.sbs/"
            >
              Одностраничное приложение
            </a>
            <img src={arrow} className="student__arrow" alt="arrow"></img>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Student;
