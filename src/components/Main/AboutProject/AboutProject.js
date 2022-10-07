import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="content__about about">
      <div className="about__project">
        <h2 className="about__title">О проекте</h2>
        <div className="about__description">
          <div className="about__fiveweeks">
            <h3 className="about__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about__plan">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about__fiveweeks">
            <h3 className="about__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about__plan">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about__calendar">
          <div className="about__calendar-week about__calendar-week_blue">
            <p className="about__one">1 неделя</p>
          </div>
          <div className="about__calendar-week">
            <p className="about__one">4 недели</p>
          </div>
          <div className="about__calendar-form">
            <p className="about__backend">Back-end</p>
          </div>
          <div className="about__calendar-form">
            <p className="about__backend">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
