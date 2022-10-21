import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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
import NotFound from "../404/404";
import apiMain from "../../utils/MainApi";

function App() {
  // получение API
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
  });

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEmail, setIsEmail] = useState("");

  // хранилище, проверка токена

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      apiMain
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setIsEmail(res.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  // регистрация
  function handleRegister({ name, password, email }) {
    apiMain
      .register({
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // вход, логин
  function handleLogin({ password, email }) {
    apiMain
      .authorize({ email: email, password: password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeToken() {
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  useEffect(() => {
    if (loggedIn) {
      apiMain
        .getUserInfoFromApi()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  /*function onEditProfileChange({name, email}) {
    apiMain.updateUserInfo({ name, email })
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(err)
    });
  }*/

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                <ProtectedRoute loggedIn={loggedIn}>
                  <>
                    <HeaderMovies></HeaderMovies>
                    <Movies></Movies>
                    <Footer></Footer>
                  </>
                </ProtectedRoute>
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
                  <Profile /*onProfileChange={onEditProfileChange}*/></Profile>
                </>
              }
            />

            <Route
              path="/signup"
              element={
                <>
                  <HeaderRegister></HeaderRegister>
                  <Register onRegister={handleRegister}></Register>
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <HeaderRegister></HeaderRegister>
                  <Login onLogin={handleLogin}></Login>
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
            <Route
              path="#"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
              }
            />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
