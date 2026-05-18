// Data requests: http://www.omdbapi.com/?apikey=46f9dc4d&
// Poster API requests: http://img.omdbapi.com/?apikey=46f9dc4d&

// console.log(fetch('http://www.omdbapi.com/?apikey=46f9dc4d&'));

let currentMovies = [];

function searchMovies(event) {
  event.preventDefault();
  const input = event.target[0];
  const searchTerm = input.value;
  if (searchTerm.length > 2) {
    queryMovies(searchTerm);
  }
}

async function queryMovies(searchTerm) {
  const moviesWrapper = document.querySelector('.movie__list');

  moviesWrapper.classList += ' movies__loading';

  const res = await fetch(`http://www.omdbapi.com/?apikey=46f9dc4d&s=${searchTerm}`);
  const data = await res.json();

  moviesWrapper.classList.remove('movies__loading');

  currentMovies = data.Search || [];

  renderMoviesList(currentMovies);
}

function renderMoviesList(movies) {
  const moviesListEl = document.querySelector(".movie__list");

  moviesListEl.innerHTML = movies
    .map(movie => renderMovies(movie))
    .join("");
}

function renderMovies(movie) {
  return `<div class="movie">
    <div class="movie__container">
      <img class="movie__img" src="${movie.Poster}" alt="${movie.Title} poster" />
      <div class="movie__details">
        <h3>
          <a href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank" class="movie__link">${movie.Title}</a>
        </h3>
        <p><b>Year:</b> ${movie.Year}</p>
      </div>
    </div>
  </div>`
}

function sortMovies(event) {
  let sortedMovies = [...currentMovies];
  const filterValue = event.target.value;

  if (filterValue === 'A_TO_Z') {
    sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  }
  else if (filterValue === 'Z_TO_A') {
    sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  }
  else if (filterValue === 'NEWEST_TO_OLDEST') {
    sortedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  }
  else if (filterValue === 'OLDEST_TO_NEWEST') {
    sortedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }

  renderMoviesList(sortedMovies);
}