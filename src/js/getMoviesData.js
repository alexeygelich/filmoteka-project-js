import { search } from "./searchPrepare.js";
import refs from "./refs.js";
const error = document.querySelector(".search-error");

const input = document.querySelector("input");
const form = document.querySelector("form");

const getMoviesData = function (promis) {
  let array = [];
  const filmArr = [];
  promis
    .then((data) => {
      array = [...data.results];
      let str = "";
      array.forEach((e) => {
        const obj = {};
        obj.id = e.id;
        obj.popularity = e.popularity;
        obj.poster_path = e.poster_path;
        obj.title = e.title;
        [...e.genre_ids].forEach((number) => {
          refs.genres.forEach((ref) => {
            if (number === ref.id) {
              str += `${ref.name}, `;
            }
          });
        });
        obj.genre_ids = str;
        obj.overview = e.overview;
        obj.vote_average = e.vote_average;
        obj.vote_count = e.vote_count;
        filmArr.push(obj);
      });
    })
    .catch((er) => (error.innerHTML = er));
  return filmArr;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const moviesData = search(input.value);
  console.log(getMoviesData(moviesData));
});
