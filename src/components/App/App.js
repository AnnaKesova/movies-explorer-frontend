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
import moviesApi from "../../utils/MoviesApi";

function App() {
  // получение API
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [IsPreloader, setIsPreloader] = useState(false);
  const [allMovies, setAllMovies] = useState([]); // состояние, которое использую потом для получения фильмов.
  const location = useLocation().pathname;
  const [savedMovies, setSavedMovies] = useState([]);

  //ошибки логина и регистрации
  //const [loginError, setLoginError] = useState("");
  // const [registerError, setRegisterError] = useState("");

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
          console.error(err);
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
      .catch((err) => {
        console.log(err);
      });
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
       // setTimeout(setIsPreloader(true), 500);
        
        moviesApi.getMovies().then((movies) => {
          localStorage.setItem("allMovies", JSON.stringify(movies));
          setAllMovies([]);
        });
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  function onEditProfile({ name, email }) {
    setCurrentUser({ name, email });
  }

  function handleOut() {
    localStorage.clear();
    localStorage.removeItem("jwt");
    localStorage.removeItem("allMovies");
    // localStorage.removeItem("words");
    setLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([]);
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
                      IsPreloader={IsPreloader}
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

            <Route
              path="/signup"
              element={
                <>
                  <HeaderRegister />
                  <Register
                    onRegister={handleRegister}
                    //registerError={registerError}
                  ></Register>
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <HeaderRegister />
                  <Login
                    onLogin={handleLogin} /*loginError={loginError}*/
                  ></Login>
                </>
              }
            />
            <Route
              path="#"
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
