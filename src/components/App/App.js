import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import HeaderMovies from "../Header/HeaderMovies/HeaderMovies";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import HeaderRegister from "../Header/HeaderRegister/HeaderRegister";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../404/404"

function App() {
  return (
    <div className="app">
      <div className="app__page page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header></Header>
                <Main></Main>
                <Footer></Footer>
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <HeaderMovies></HeaderMovies>
                <Movies></Movies>
                <Footer></Footer>
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <HeaderMovies></HeaderMovies>
                <SavedMovies></SavedMovies>
                <Footer></Footer>
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <HeaderMovies></HeaderMovies>
                <Profile></Profile>
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <HeaderRegister></HeaderRegister>
                <Register></Register>
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <HeaderRegister></HeaderRegister>
                <Login></Login>
              </>
            }
          />
          <Route
            path="/404"
            element={
              <>
              <NotFound></NotFound>
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
