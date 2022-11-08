import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import HeaderRegister from "../Header/HeaderRegister/HeaderRegister";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../404/404";
import apiMain from "../../utils/MainApi";
import CloseRoutes from "../../utils/CloseRoutes";

function App() {
  // получение API
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [allMovies, setAllMovies] = useState([]); // состояние, которое использую потом для получения фильмов.
  const location = useLocation().pathname;
  const [savedMovies, setSavedMovies] = useState([]);

  // отрисовывание, сохранённых фильмов
  useEffect(() => {
    checkUserToken();
    if (loggedIn) {
      apiMain
        .fetchSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [loggedIn]);

  // сохранение фильма
  function handleSaveMovie(movie) {
    const isSaved = savedMovies.some((i) => i._id === currentUser._id);
    if (!isSaved) {
      apiMain
        .addMovie(movie)
        .then((savedMovie) => {
          const arr = (savedMovies) => [savedMovie, ...savedMovies];
          setSavedMovies(arr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleDeleteMovie(movie) {
    const savedMovie = savedMovies.find((item) => item.id === movie.id);
    apiMain
      .deleteMovie(savedMovie._id)
      .then((movies) => {
        const arr = savedMovies.filter((m) => m.id !== movies.movieId);
        setSavedMovies(arr);
      })
      .catch((err) => {});
  }

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
      .then((res) => {
        if (res.name || res.email) {
          handleLogin({ password, email });
        }
      })
      .catch((err) => {
        console("При авторизации пользователя произошла ошибка");
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
          logOutErrAuthorization("Неправильный логин или пароль");
        } else {
          console("При авторизации пользователя произошла ошибка");
        }
      });
  }

  function onEditProfile({ name, email }) {
    setCurrentUser({ name, email });
  }

  function handleOut() {
    localStorage.clear();
    localStorage.removeItem("jwt");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("words");
    setLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
    setAllMovies([]);
    navigate("/");
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

  // Функция делает полный лог-аут в случае, если любой запрос к серверу заканчивается ошибкой авторизации
  const logOutErrAuthorization = (err) => {
    setLoggedIn(false);
    localStorage.clear();
    localStorage.removeItem("jwt");
    setAllMovies([]);
    setSavedMovies([]);
    setCurrentUser({});
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__page page">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header loggedIn={loggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route path='/*' element={<NotFound />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <>
                    <Header loggedIn={loggedIn} />
                    <Movies
                      handleSaveMovie={handleSaveMovie}
                      allMovies={allMovies}
                      setAllMovies={setAllMovies}
                      savedMovies={savedMovies}
                      handleDeleteMovie={handleDeleteMovie}
                    ></Movies>
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <>
                    <Header loggedIn={loggedIn} />
                    <SavedMovies
                      savedMovies={savedMovies}
                      allMovies={allMovies}
                      handleSaveMovie={handleSaveMovie}
                      handleDeleteMovie={handleDeleteMovie}
                    ></SavedMovies>
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header loggedIn={loggedIn} />
                  <Profile
                    handleOut={handleOut}
                    onEditProfile={onEditProfile}
                  />
                </>
              }
            />
            <Route element={<CloseRoutes loggedIn={loggedIn} />}>
              <Route
                path="/signup"
                element={
                  <>
                    <HeaderRegister />
                    <Register onRegister={handleRegister}></Register>
                  </>
                }
              />
              <Route
                path="/signin"
                element={
                  <>
                    <HeaderRegister />
                    <Login onLogin={handleLogin}></Login>
                  </>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
