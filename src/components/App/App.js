import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import HeaderMovies from "../Header/HeaderMovies/HeaderMovies";
import Movies from "../Movies/Movies"

function App() {
  const navigate = useNavigate();

  const tokenCheck = () => {
    navigate("/movies-explorer-frontend");
  };

  return (
    <div className="app">
      <div className="app__page page">
        <Routes>
          <Route
            path="/movies-explorer-frontend"
            element={
              <>
                <Header></Header>
                <Main></Main>
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <HeaderMovies></HeaderMovies>
                <Movies></Movies>
              </>
            }
          />
        </Routes>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
