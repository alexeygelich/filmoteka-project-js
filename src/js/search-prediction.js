import fetchQuery from './fetch.js';
import getMoviesData from './getMoviesData.js';
import modal from './modal.js';

const input = document.querySelector('input');
const inputWrap = document.querySelector('.input-wrap');

inputWrap.insertAdjacentHTML(
  'beforeend',
  `<div class="search-wrapper">
            </div>`,
);
const searchWrapper = document.querySelector('.search-wrapper');

const inputSearch = function () {
  searchWrapper.innerHTML = '';
  searchWrapper.insertAdjacentHTML(
    'beforeend',
    `<ul class="search-list">
            </ul>`,
  );
  const searchUl = document.querySelector('.search-list');

  getMoviesData(fetchQuery(1, input.value)).then(data => {
    console.log(data);
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
    modal(data);
  });
};

input.addEventListener('input', inputSearch);
