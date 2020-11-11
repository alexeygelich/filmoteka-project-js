import getMoviesData from './getMoviesData.js';
import getMovies from "./fetch.js";
import arrRender from './arr-for-render';
import renderMain from './render-film';
import modalOpen from './modal.js';


getMoviesData(getMovies(1))
.then(data => arrRender(data))
    .then(data => {
      renderMain(data);
      modalOpen(data);
    })