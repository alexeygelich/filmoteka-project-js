import { search } from "./searchPrepare.js";
import refs from "./refs.js";
import arrRender from './arr-for-render';
import renderMain from './render-film';
import getMoviesData from './getMoviesData.js';
import pagination from './pagination.js';


const error = document.querySelector(".search-error");
const input = document.querySelector("input");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  
  refs.errorNotification.classList.add('is-hidden');
  const moviesData = search(input.value);


  getMoviesData(moviesData)
    .then(data => { 
console.log("123",data);
      return arrRender(data);
    })
    .then(data => {
      renderMain(data);
      // modalOpen(data);
      refs.ARR = [...data];
      pagination(input.value, moviesData.then(data => data.total_results))
    })
});