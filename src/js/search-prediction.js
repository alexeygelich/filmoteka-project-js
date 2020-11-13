import fetchQuery from './fetch.js';
import getMoviesData from './getMoviesData.js';
import refs from './refs.js';
import debounce from '../../node_modules/lodash.debounce/'

const input = document.querySelector('.header-input');
const searchUl = document.querySelector('.search-list');
// const inputWrap = document.querySelector('.input-wrap');

// inputWrap.insertAdjacentHTML(
//   'beforeend',
//   `<div class="search-wrapper">
//             </div>`,
// );
// const searchWrapper = document.querySelector('.search-wrapper');

const inputSearch = function () {
  searchUl.innerHTML = '';
  refs.errorNotification.classList.add('is-hidden');

  if (!input.value) { 
    return;
  }

  getMoviesData(fetchQuery(1, input.value)).then(data => {
   
    if (!data.length) { 
      refs.errorNotification.classList.remove('is-hidden');
      return;
    }
    let i = 0;
    data.forEach(({ title, id, vote_average }) => {
      if (i > 4) {
        return;
      }
      i++;
      searchUl.insertAdjacentHTML(
        'beforeend',
        `<li class="search-list-item" data-id=${id}>${title} - ${vote_average}</li>`,
      );
    });
    // modal(data);
    refs.ARR = [...refs.ARR,...data];
  })
};

input.addEventListener('input', debounce(inputSearch,500));
