import modal from './modal.js';
import getMoviesData from './getMoviesData.js';
import getMovies from "./fetch.js";
import arrRender from './arr-for-render';
import renderMain from './render-film';
import refs from './refs.js';
import pagination from './pagination.js';
import clearInput from './clearInput';

const filmList = document.querySelector('.film-list');
const searchPrediction = document.querySelector('.search-list');
const logoLink = document.querySelector('.logo-link');
const homeRef = document.querySelector('#home');
const logoFooterLink = document.querySelector('.footer-logo');

const onModalOpen = function (e) {
    e.path.forEach(el => {
        if (
            el.className === 'film-list-item' ||
            el.className === 'search-list-item'
        ) {
            const elId = +el.dataset.id;
            modal(elId);
        }
    })
    clearInput();
    

}

const homeFn = function (e) { 
    e.preventDefault();
    refs.genreWrapper.classList.remove('is-hidden');
    refs.sortWrapper.classList.remove('is-hidden');
        refs.yearChoise.textContent = 'Год';
      refs.yearChoise.dataset.id = '';
      refs.sortChoise.textContent = 'Сортировка';
      refs.sortChoise.dataset.id = 'vote_average.desc';
      refs.genreChoise.textContent = 'Категория';
      refs.genreChoise.dataset.id = '';
      const btnContainer = document.querySelector('.btn-container');
  const inputWrap = document.querySelector('.input-wrap');
  const navContainer = document.querySelector('.nav-container');
  const libLink = document.querySelector('.lib-link');
  const homeRef = document.querySelector('#home');

  btnContainer.classList.add('is-hidden');
  inputWrap.classList.remove('is-hidden');
  navContainer.classList.remove('lib-container');
  libLink.classList.remove('current');
  homeRef.classList.add('current');
    clearInput();
    const firstFetch = async function() {
  return await getMovies(1);
}

getMoviesData(firstFetch())
.then(data => arrRender(data))
.then(data => {
  renderMain(data);
  refs.ARR = [...data];
  pagination(false, firstFetch().then(data => data.total_results));
})

  //   refs.yearChoise.textContent = 'Год';
  //   refs.yearChoise.dataset.id = '';
  //   refs.sortChoise.textContent = 'Сортировка';
  //   refs.sortChoise.dataset.id = 'vote_average.desc';
  //   refs.genreChoise.textContent = 'Категория';
  // refs.genreChoise.dataset.id = '';
  // onModalOpen();
}

filmList.addEventListener('click', onModalOpen);
searchPrediction.addEventListener('click', e => { 
  refs.genreWrapper.classList.remove('is-hidden');
  refs.sortWrapper.classList.remove('is-hidden');
  onModalOpen(e);
});
logoLink.addEventListener('click', homeFn);
homeRef.addEventListener('click', homeFn);
logoFooterLink.addEventListener('click', homeFn);

export default homeFn;