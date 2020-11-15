import refs from "./refs.js";
import pagination from './pagination.js';
import arrForRender from './arr-for-render.js';
import renderFilm from './render-film.js'; 


const myLibraryLink = document.querySelector(".lib-link");
const headerOfLib = document.querySelector(".header");

const watched = function () {
  pagination("w"); //передаємо в пагінатор ключ localstorag

  document.querySelector(".watched").classList.add("current-btn");
  document.querySelector(".queue").classList.remove("current-btn");
  let localStorageArrW = JSON.parse(localStorage.getItem(`w`)) || [];
  localStorageArrW=arrForRender(localStorageArrW);
  renderFilm(localStorageArrW);
  refs.ARR = [...localStorageArrW]
};
const queue = function () {
  pagination("q"); //передаємо в пагінатор ключ localstorag

  document.querySelector(".watched").classList.remove("current-btn");
  document.querySelector(".queue").classList.add("current-btn");
  let localStorageArrQ = JSON.parse(localStorage.getItem(`q`)) || [];
  localStorageArrQ=arrForRender(localStorageArrQ);
  renderFilm(localStorageArrQ);
  refs.ARR = [...localStorageArrQ]
};

const libMarkup = function () {
  const btnContainer = document.querySelector('.btn-container');
  const inputWrap = document.querySelector('.input-wrap');
  const navContainer = document.querySelector('.nav-container');
  const libLink = document.querySelector('.lib-link');
  const homeRef = document.querySelector('#home');

  btnContainer.classList.remove('is-hidden');
  inputWrap.classList.add('is-hidden');
  headerOfLib.classList.add('lib');
  libLink.classList.add('current');
  homeRef.classList.remove('current');

  watched();
  document.querySelector(".watched").addEventListener("click", watched);
  document.querySelector(".queue").addEventListener("click", queue);
};

myLibraryLink.addEventListener("click", libMarkup);
