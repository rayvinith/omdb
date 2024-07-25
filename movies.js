const OMDB_API_URL = "https://www.omdbapi.com/";
const OMDB_API_KEY = "a6ad5a72";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const imdbID = params.get("imdbID");
  fetchMovieDetails(imdbID);
});

async function fetchMovieDetails(imdbID) {
  const response = await fetch(`${OMDB_API_URL}?i=${imdbID}&apikey=${OMDB_API_KEY}`);
  const movie = await response.json();

  document.getElementById("detailsTitle").innerText = movie.Title;
  document.getElementById("detailsPoster").src = movie.Poster;
  document.getElementById("detailsReleaseDate").innerText = movie.Released;
  document.getElementById("detailsImdbRating").innerText = movie.imdbRating;
  document.getElementById("detailsCast").innerText = movie.Actors;
  document.getElementById("detailsPlot").innerText = movie.Plot;
}
