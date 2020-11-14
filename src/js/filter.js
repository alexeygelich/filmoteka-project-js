import refs from './refs';
import getMoviesData from './getMoviesData.js';
import getMovies from "./fetch.js";
import arrRender from './arr-for-render';
import renderMain from './render-film';
import pagination from './pagination.js';

const renderFn = function() {
    getMoviesData(getMovies(1, refs.searchInput.value))
  .then(data => arrRender(data))
.then(data => {
  renderMain(data);
  refs.ARR = [...data];
  pagination(refs.searchInput.value, getMovies(1, refs.searchInput.value).then(data => data.total_results));
})
}

// refs.searchBtn.addEventListener('click', (e) => { 
  
//   if (!refs.searchInput.value) { 
//       homeFn(e);
//       return;
//   }
//   e.preventDefault();
//     renderFn();
// });


refs.genreChoise.addEventListener('click', () => {
    refs.categoryGenreList.classList.toggle('is-hidden');
});

refs.sortChoise.addEventListener('click', () => {
    refs.sortList.classList.toggle('is-hidden');
});

refs.yearChoise.addEventListener('click', () => {
    refs.yearList.classList.toggle('is-hidden');
});

refs.categoryGenreList.addEventListener('click', e => {
    e.path.forEach(el => {
        if (el.className === 'category-list-item') {
            refs.genreChoise.textContent = el.textContent;
            refs.genreChoise.dataset.id = el.dataset.id;
            refs.categoryGenreList.classList.add('is-hidden');
        }
    })
    renderFn();
});

refs.sortList.addEventListener('click', e => {
    e.path.forEach(el => {
        if (el.className === 'sort-list-item') {
            refs.sortChoise.textContent = el.textContent;
            refs.sortChoise.dataset.id = el.dataset.id;
            refs.sortList.classList.add('is-hidden');
        }
    })
renderFn();
});

refs.yearList.addEventListener('click', e => {
    e.path.forEach(el => {
        if (el.className === 'year-list-item') {
            refs.yearChoise.textContent = el.textContent;
            refs.yearChoise.dataset.id = el.dataset.id;
            refs.yearList.classList.add('is-hidden');
        }
    })
    renderFn();
});

refs.clearBtn.addEventListener('click', e => {
    e.preventDefault();
    refs.yearChoise.textContent = 'Год';
    refs.yearChoise.dataset.id = '';
    refs.sortChoise.textContent = 'Сортировка';
    refs.sortChoise.dataset.id = 'vote_average.desc';
    refs.genreChoise.textContent = 'Категория';
    refs.genreChoise.dataset.id = '';
    renderFn();
})