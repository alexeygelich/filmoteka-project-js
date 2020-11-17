import { search } from "./searchPrepare.js";
import refs from "./refs.js";
import arrRender from './arr-for-render';
import renderMain from './render-film';
import getMoviesData from './getMoviesData.js';
import pagination from './pagination.js';
import clearInput from './clearInput'


const error = document.querySelector(".search-error");
const input = document.querySelector(".header-input");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  refs.listPrediction.classList.add('is-hidden');
  refs.errorNotification.classList.add('is-hidden');
  const moviesData = search(input.value);

  getMoviesData(moviesData)
    .then(data => arrRender(data))
    .then(data => {
      renderMain(data);
      refs.ARR = [...data];
      pagination(input.value, moviesData.then(data => data.total_results));
      // clearInput();
    })
});