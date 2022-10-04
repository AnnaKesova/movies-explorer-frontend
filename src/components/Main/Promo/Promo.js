import headingLogo from "../../../images/text__COLOR_landing-logo.svg";
import "./Promo.css";

function Promo () {
    return (
        <section className="content__promo promo">
        <div className="promo__description">
          <div className="promo__name">
            <h1 className="promo__title">
              Учебный проект студента факультета Веб-разработки.
            </h1>
            <p className="promo__subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его
              создателя.
            </p>
            <button
              className="promo__else"
              type="button"
              title="Узнать больше"
            >
              Узнать больше
            </button>
          </div>
          <img src={headingLogo} className="promo__logo" alt="promoLogo" />
        </div>
      </section>
    )
}

export default Promo;