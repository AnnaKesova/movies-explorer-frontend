const MOVIE_URL = 'https://api.nomoreparties.co';

export function checkResponse(response) {
    return response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)
  }
  
  export const getMovies = () => {
    return fetch (`${MOVIE_URL}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(checkResponse)
    .then(movies => movies.map(movie => {const url = MOVIE_URL + movie.image.url;
    movie.thumbnail = url;
    movie.image = url;
    return movie;}));
  }



  