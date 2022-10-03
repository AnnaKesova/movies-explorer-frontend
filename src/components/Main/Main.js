import "./Main.css";
import About from "./About/About";
import Heading from "./Heading/Heading";
import Technology from "./Technology/Technology"
import Student from "./Student/Student"


function Main() {
  return (
    <main className="page__content content">
      <Heading></Heading>
      <About></About>
      <Technology></Technology>
      <Student></Student>
     
      
    </main>
  );
}

export default Main;
