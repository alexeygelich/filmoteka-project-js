import { search } from "./searchPrepare.js";
import refs from "./refs.js";
import arrRender from './arr-for-render';
import renderMain from './render-film';
import getMoviesData from './getMoviesData.js';
import modalOpen from './modal.js';
import pagination from './pagination.js';


const error = document.querySelector(".search-error");
const input = document.querySelector("input");
const form = document.querySelector("form");
let promisData;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  
  refs.errorNotification.classList.add('is-hidden');
  const moviesData = search(input.value);
  // console.log(moviesData);

  // const firstFetch = async function() {
  //   return await getMovies(moviesData);
  // }

  getMoviesData(moviesData)
    .then(data => arrRender(data))
    .then(data => {
      renderMain(data);
      modalOpen(data);
      pagination(input.value, moviesData.then(data => data.total_results))
    })
});