import "./AboutMe.css";

import mypfoto from "../../../images/myphoto.jpg";
import arrow from "../../../images/стрелка.svg";


function AboutMe() {
  return (
    <section className="content__aboutMe aboutMe">
      <div className="aboutMe__project">
        <h3 className="aboutMe__title">Студент</h3>
        <div className="aboutMe__about">
          <div className="aboutMe__description">
            <h2 className="aboutMe__name">Анна</h2>
            <p className="aboutMe__job">Фронтенд-разработчик, 31 год</p>
            <p className="aboutMe__myself">
              Я родилась в Таганроге, живу в Ростове-на-Дону, закончила
              факультет иностранных языков РГЭУ. У меня есть муж и сын. Я люблю
              читать, а ещё мне нравиться бегать по вечерам. Недавно начала
              кодить и меня это очень увлекло, и теперь я заканчиваю курс по
              "Веб-разработке". Я надеюсь, что скоро найду вакансию по своей
              новой специальности.
            </p>
            <a
              className="aboutMe__git"
              target="blank"
              href="https://github.com/AnnaKesova"
            >
              Github
            </a>
            <a className="aboutMe__portfolio" target="blank" href="###">
              Портфолио
            </a>
          </div>
          <img src={mypfoto} className="aboutMe__photo" alt="myphoto"></img>
        </div>
        <ul className="aboutMe__links">
          <li className="aboutMe__link">
            <a
              className="aboutMe__site"
              target="blank"
              href="https://annakesova.github.io/russian-travel/"
            >
              Статичный сайт
            </a>
            <img src={arrow} className="aboutMe__arrow" alt="arrow"></img>
          </li>
          <li className="aboutMe__link">
            <a
              className="aboutMe__site"
              target="blank"
              href="https://annakesova.github.io/mesto/"
            >
              Адаптивный сайт
            </a>
            <img src={arrow} className="aboutMe__arrow" alt="arrow"></img>
          </li>
          <li className="aboutMe__link">
            <a
              className="aboutMe__site"
              target="blank"
              href="https://anna.mesto.students.nomoredomains.sbs/"
            >
              Одностраничное приложение
            </a>
            <img src={arrow} className="aboutMe__arrow" alt="arrow"></img>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;
