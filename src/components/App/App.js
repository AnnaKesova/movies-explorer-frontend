import React, { useState, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import { getMovies } from "../../utils/MoviesApi";

function App() {
  // получение API
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [IsPreloader, setIsPreloader] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const location = useLocation().pathname;

  //ошибки логина и регистрации
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  /*const extractAllMoviesLocal = () => {
    let allMoviesLocal = JSON.parse(localStorage.getItem("allMovies"));
    if (!allMoviesLocal) {
      return (allMoviesLocal = []);
    }
    return allMoviesLocal;
  };*/

  

  // список всех фильмов
  const getAllMovies = () => {
    setIsPreloader(true); 
    getMovies()
      .then((res) => {
        const allMovies = JSON.parse(localStorage.getItem("data"));
        localStorage.setItem("data", JSON.stringify(res));
        setAllMovies(allMovies);
        setIsPreloader(false); 
        console.log(allMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkUserToken();
  }, []);

  /*useEffect(() => {
    
    if (loggedIn) {
      setIsPreloader(true); // Включаем прелоадер
      setMovies([]);}
  
      /*if ()) {
      getMovies()
        .then((res) => {
        
          const allMovies = JSON.parse(localStorage.getItem("data"));
          localStorage.setItem("data", JSON.stringify(res));
          setMovies(allMovies);
          setIsPreloader(false); // Выключаем прелоадер
          console.log(allMovies)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);*/

  // хранилище, проверка токена

  function checkUserToken() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      apiMain
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({
              name: res.name,
              email: res.email,
            });
            setLoggedIn(true);
            navigate(location);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

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
        if (err === "Ошибка: 409") {
          setRegisterError("Пользователь с таким email уже существует");
        }
        if (err === "Ошибка: 500") {
          setRegisterError("Ошибка сервера");
        } else {
          setRegisterError("При регистрации пользователя произошла ошибка");
        }
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
        if (err === "Ошибка: 401") {
          setLoginError("Неправильный логин или пароль");
        }
        if (err === "Ошибка: 500") {
          setLoginError("Ошибка сервера");
        } else {
          setLoginError("При авторизации пользователя произошла ошибка");
        }
      });
  }

  /*  function removeToken() {
    localStorage.removeItem("jwt");
    navigate("/signin");
  }*/

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
                    <Movies
                      allMovies={allMovies}
                      getAllMovies={getAllMovies}
                      IsPreloader={IsPreloader}
                    ></Movies>
                    <Footer></Footer>
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <>
                    <HeaderMovies></HeaderMovies>
                    <SavedMovies></SavedMovies>
                    <Footer></Footer>
                  </>
                </ProtectedRoute>
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
                  <Register
                    onRegister={handleRegister}
                    registerError={registerError}
                  ></Register>
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <HeaderRegister></HeaderRegister>
                  <Login onLogin={handleLogin} loginError={loginError}></Login>
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
