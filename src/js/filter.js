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


refs.genreChoise.addEventListener('click', () => {
    refs.genreChoise.classList.toggle('checked');
    refs.sortChoise.classList.remove('checked');
    refs.yearChoise.classList.remove('checked');

    refs.categoryGenreList.classList.toggle('is-hidden');
    refs.sortList.classList.add('is-hidden');
    refs.yearList.classList.add('is-hidden');
});

refs.sortChoise.addEventListener('click', () => {
    refs.sortChoise.classList.toggle('checked');
    refs.genreChoise.classList.remove('checked');
    refs.yearChoise.classList.remove('checked');

    refs.sortList.classList.toggle('is-hidden');
    refs.categoryGenreList.classList.add('is-hidden');
    refs.yearList.classList.add('is-hidden');
    
});

refs.yearChoise.addEventListener('click', () => {
    refs.yearChoise.classList.toggle('checked');
    refs.genreChoise.classList.remove('checked');
    refs.sortChoise.classList.remove('checked');

    refs.yearList.classList.toggle('is-hidden');
    refs.categoryGenreList.classList.add('is-hidden');
    refs.sortList.classList.add('is-hidden');
});

refs.categoryGenreList.addEventListener('click', e => {
    e.path.forEach(el => {
        if (el.className === 'category-list-item') {
            refs.genreChoise.textContent = el.textContent;
            refs.genreChoise.dataset.id = el.dataset.id;
            refs.categoryGenreList.classList.add('is-hidden');
            refs.genreChoise.classList.remove('checked');
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
            refs.sortChoise.classList.remove('checked');
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
            refs.yearChoise.classList.remove('checked');
        }
    })
    renderFn();
});

refs.clearBtn.addEventListener('click', e => {
    e.preventDefault();
    if (refs.langChoise.dataset.id === "en") {
        refs.yearChoise.textContent = 'Year';
        refs.sortChoise.textContent = 'Sort by';
        refs.genreChoise.textContent = 'Genre';
    } else { 
        refs.yearChoise.textContent = 'Год';
        refs.sortChoise.textContent = 'Сортировка';
        refs.genreChoise.textContent = 'Жанр';
    }
    refs.genreChoise.dataset.id = '';
    refs.yearChoise.dataset.id = '';
    refs.sortChoise.dataset.id = 'vote_average.desc';

    refs.yearList.classList.add('is-hidden');
    refs.categoryGenreList.classList.add('is-hidden');
    refs.sortList.classList.add('is-hidden');
    refs.genreChoise.classList.remove('checked');
    refs.sortChoise.classList.remove('checked');
    refs.yearChoise.classList.remove('checked');
    renderFn();
})