import headingLogo from "../../../images/text__COLOR_landing-logo.svg";
import "./Heading.css";

function Heading () {
    return (
        <section className="content__heading heading">
        <div className="heading__description">
          <div className="heading__name">
            <h1 className="heading__title">
              Учебный проект студента факультета Веб-разработки.
            </h1>
            <p className="heading__subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его
              создателя.
            </p>
            <button
              className="heading__else"
              type="button"
              title="Узнать больше"
            >
              Узнать больше
            </button>
          </div>
          <img src={headingLogo} className="heading__logo" alt="headingLogo" />
        </div>
      </section>
    )
}

export default Heading;