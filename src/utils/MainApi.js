class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  //Регистрация
  register({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then(this._handlePromiseErr);
  }

  //Вход
  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(this._handlePromiseErr);
  }

  //Проверка валидности токена и получения email для хедера
  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handlePromiseErr);
  }

  getUserInfoFromApi() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._handlePromiseErr);
  }

  updateUserInfo({ name, email }) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._handlePromiseErr);
  }

  fetchSavedMovies() {
    return fetch(this._baseUrl + "/movies", {
      method: "GET",
      headers: this._getHeaders(),
    })
      .then(this._handlePromiseErr)
      .then((movies) => movies.map((movie) => this._convertMovie(movie)));
  }

  // запрос на сохранение фильма
  addMovie(movie) {
    return fetch(this._baseUrl + "/movies", {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.thumbnail || movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail || movie.image.url,
        owner: movie.owner,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    })
      .then(this._handlePromiseErr)
      .then(this._convertMovie);
  }

  // запрос на удаление фильма
  deleteMovie(movieId) {
    return fetch(this._baseUrl + `/movies/${movieId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    })
      .then(this._handlePromiseErr)
      .then(this._convertMovie);
  }

  _getToken() {
    return `Bearer ${localStorage.getItem("jwt")}`;
  }

  _getHeaders() {
    return {
      Authorization: this._getToken(),
      "Content-Type": "application/json",
    };
  }

  _convertMovie(movie) {
    movie.id = movie.movieId;
    return movie;
  }

  _handlePromiseErr(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
}

const apiMain = new MainApi({
  baseUrl: "https://api.anna.moviesdb.nomoredomains.sbs",
});

export default apiMain;
