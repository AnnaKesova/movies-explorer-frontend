import "./Footer.css";

function Footer() {
  return (
    <footer className="page__footer footer">
      <div className="footer__content">
        <p className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__description">
          <p className="footer__data">&copy; 2022</p>
          <nav className="footer__menu">
            <ul className="footer__links">
              <li className="footer__link">
                <a
                  className="footer__site"
                  target="blank"
                  href="https://practicum.yandex.ru/"
                >
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__link">
                <a
                  className="footer__site"
                  target="blank"
                  href="https://github.com/AnnaKesova"
                >
                  Github
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
