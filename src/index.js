import './sass/main.scss';

import getMovies from './js/fetch.js';

// getMovies()
//   .then(data => console.log(data))
//   .catch(data => console.log(data))

getMovies(1, 'avatar')
.then(data => console.log(data))
  .catch(data => console.log(data))