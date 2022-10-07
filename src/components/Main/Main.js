import "./Main.css";
import AboutProject from "./AboutProject/AboutProject";
import Promo from "./Promo/Promo";
import Technology from "./Technology/Technology";
import AboutMe from "./AboutMe/AboutMe";

function Main() {
  return (
    <main className="page__content content">
      <Promo></Promo>
      <AboutProject></AboutProject>
      <Technology></Technology>
      <AboutMe></AboutMe>
    </main>
  );
}

export default Main;
