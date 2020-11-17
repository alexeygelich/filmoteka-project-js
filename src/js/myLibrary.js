
import libMark from "./templates/mainTemplateLib.hbs";
import refs from "./refs.js";
import pagination from "./pagination.js";
import modal from "./modal.js";
import arrForRender from "./arr-for-render.js";
import renderFilm from "./render-film-lib.js";


const myLibraryLink = document.querySelector(".lib-link");
const headerOfLib = document.querySelector(".header");

const watched = function () {
  pagination("w"); //передаємо в пагінатор ключ localstorag

  document.querySelector(".watched").classList.add("current-btn");
  document.querySelector(".queue").classList.remove("current-btn");
  let localStorageArrW = JSON.parse(localStorage.getItem(`w`)) || [];

  localStorageArrW = arrForRender(localStorageArrW);
  renderFilm(localStorageArrW);
  refs.ARR = [...localStorageArrW];

};
const queue = function () {
  pagination("q"); //передаємо в пагінатор ключ localstorag

  document.querySelector(".watched").classList.remove("current-btn");
  document.querySelector(".queue").classList.add("current-btn");
  let localStorageArrQ = JSON.parse(localStorage.getItem(`q`)) || [];

  // filmList.innerHTML = `${libMark(localStorageArrQ)}`;
  localStorageArrQ = arrForRender(localStorageArrQ);
  renderFilm(localStorageArrQ);
  refs.ARR = [...localStorageArrQ];

};

const libMarkup = function () {
  const btnContainer = document.querySelector(".btn-container");
  const inputWrap = document.querySelector(".input-wrap");
  const navContainer = document.querySelector(".nav-container");
  const libLink = document.querySelector(".lib-link");
  const homeRef = document.querySelector("#home");


  btnContainer.classList.remove("is-hidden");
  inputWrap.classList.add("is-hidden");
  navContainer.classList.add("lib-container");
  libLink.classList.add("current");
  homeRef.classList.remove("current");
  headerOfLib.classList.add('lib');

  if (refs.langChoise.dataset.id === 'ru') { 
    refs.addQ.classList.add('rus');
refs.addW.classList.add('rus');
  }

  if (refs.langChoise.dataset.id === 'en') { 
    refs.addQ.classList.remove('rus');
refs.addW.classList.remove('rus');
  }


  watched();
  document.querySelector(".watched").addEventListener("click", watched);
  document.querySelector(".queue").addEventListener("click", queue);
};

myLibraryLink.addEventListener("click", libMarkup);
