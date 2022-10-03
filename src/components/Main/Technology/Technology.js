import "./Technology.css";

function Technology() {
  return (
    <section className="content__technology technology">
      <div className="technology__project">
        <h3 className="technology__title">Технологии</h3>
        <div className="technology__about">
          <h2 className="technology__subtitle">7 технологий</h2>
          <p className="technology__text">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className="technology__skills">
            <li className="technology__skill">
              <p className="technology__name">HTML</p>
            </li>
            <li className="technology__skill">
              <p className="technology__name">CSS</p>
            </li>
            <li className="technology__skill">
              <p className="technology__name">JS</p>
            </li>
            <li className="technology__skill">
              <p className="technology__name">React</p>
            </li>
            <li className="technology__skill">
              <p className="technology__name">Git</p>
            </li>
            <li className="technology__skill">
              <p className="technology__name">Express.js</p>
            </li>
            <li className="technology__skill">
              <p className="technology__name">MongoDB</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Technology;
