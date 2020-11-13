import getMoviesData from './getMoviesData.js';
import getMovies from "./fetch.js";
import arrRender from './arr-for-render';
import renderMain from './render-film';
import refs from './refs.js';
import pagination from './pagination.js';



const firstFetch = async function() {
  return await getMovies(1);
}

getMoviesData(firstFetch())
.then(data => arrRender(data))
.then(data => {
  renderMain(data);
  // modalOpen(data);
  refs.ARR = [...refs.ARR,...data];
  pagination(false, firstFetch().then(data => data.total_results));
})
