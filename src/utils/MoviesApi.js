class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getMovies = () => {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this._checkResponse)
      .then((movies) =>
        movies.map((movie) => {
          const url = this._baseUrl + movie.image.url;
          movie.thumbnail = url;
          movie.image = url;
          return movie;
        })
      );
  };

  _checkResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка ${response.status}`);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co",
});

export default moviesApi;
