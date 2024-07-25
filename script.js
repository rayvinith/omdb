const OMDB_API_URL = "http://www.omdbapi.com/";
const OMDB_API_KEY = "a6ad5a72";
const initialMovies = ["Inception", "The Dark Knight", "Interstellar", "Parasite", "Avengers: Endgame", "The Matrix", "Pulp Fiction", "Forrest Gump", "The Shawshank Redemption"];

document.addEventListener("DOMContentLoaded", () => {
  fetchInitialMovies();
  document.getElementById("searchForm").addEventListener("submit", searchMovies);
});

async function fetchInitialMovies() {
  for (let title of initialMovies) {
    const response = await fetch(`${OMDB_API_URL}?t=${title}&apikey=${OMDB_API_KEY}`);
    const movie = await response.json();
    if (movie.Response === "True") {
      renderMovie(movie);
    }
  }
}

async function searchMovies(event) {
  event.preventDefault();
  const query = document.getElementById("searchInput").value;
  const response = await fetch(`${OMDB_API_URL}?s=${query}&apikey=${OMDB_API_KEY}`);
  const data = await response.json();
  
  document.getElementById("moviesList").innerHTML = ""; // Clear previous search results

  if (data.Response === "True") {
    data.Search.forEach(movie => fetchMovieDetails(movie.imdbID));
  } else {
    document.getElementById("moviesList").innerHTML = "<p>No movies found.</p>";
  }
}

async function fetchMovieDetails(imdbID) {
  const response = await fetch(`${OMDB_API_URL}?i=${imdbID}&apikey=${OMDB_API_KEY}`);
  const movie = await response.json();
  renderMovie(movie);
}

function renderMovie(movie) {
  const moviesList = document.getElementById("moviesList");
  const movieDiv = document.createElement("div");
  movieDiv.className = "col-md-4 mb-4";

  const movieDetails = `
    <div class="card movie-card" onclick="showMovieDetails('${movie.imdbID}')">
      <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title} poster">
      <div class="card-body">
        <h5 class="card-title">${movie.Title}</h5>
        <p class="card-text">Release Date: ${movie.Released}</p>
      </div>
    </div>
  `;

  movieDiv.innerHTML = movieDetails;
  moviesList.appendChild(movieDiv);
}

function showMovieDetails(imdbID) {
  window.location.href = `movie.html?imdbID=${imdbID}`;
}
