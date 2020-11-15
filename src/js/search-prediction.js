import fetchQuery from './fetch.js';
import getMoviesData from './getMoviesData.js';
import refs from './refs.js';
import debounce from '../../node_modules/lodash.debounce/';

const input = document.querySelector('.header-input');
const searchUl = document.querySelector('.search-list');

const inputSearch = function () {
  refs.genreWrapper.classList.add('is-hidden');
  refs.sortWrapper.classList.add('is-hidden');
  searchUl.classList.remove('is-hidden');
  searchUl.innerHTML = '';
  refs.errorNotification.classList.add('is-hidden');

  if (!input.value) {
    searchUl.classList.add('is-hidden');
    refs.genreWrapper.classList.remove('is-hidden');
  refs.sortWrapper.classList.remove('is-hidden');
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
        `<li class="search-list-item" data-id=${id}>${title} - <span class="vote-average">${vote_average}</span></li>`,
      );
    });
    refs.ARR = [...refs.ARR, ...data];
  });
};

input.addEventListener('input', debounce(inputSearch, 500));
