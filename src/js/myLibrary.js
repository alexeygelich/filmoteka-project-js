import libMark from "./templates/mainTemplate.hbs";
import refs from "./refs.js";
import pagination from './pagination.js';
import modal from "./modal.js";
import arrForRender from './arr-for-render.js';
import renderFilm from './render-film.js'; 


const myLibraryLink = document.querySelector(".lib-link");
const headerOfLib = document.querySelector(".header");

const watched = function () {
  pagination("w"); //передаємо в пагінатор ключ localstorag

  document.querySelector(".watched").classList.add("current-btn");
  document.querySelector(".queue").classList.remove("current-btn");
  let localStorageArrW = JSON.parse(localStorage.getItem(`w`)) || [];
  // filmList.innerHTML = `${libMark(localStorageArrW)}`;
  localStorageArrW=arrForRender(localStorageArrW);
  renderFilm(localStorageArrW);
  modal(localStorageArrW);
};
const queue = function () {
  pagination("q"); //передаємо в пагінатор ключ localstorag

  document.querySelector(".watched").classList.remove("current-btn");
  document.querySelector(".queue").classList.add("current-btn");
  let localStorageArrQ = JSON.parse(localStorage.getItem(`q`)) || [];
  // filmList.innerHTML = `${libMark(localStorageArrQ)}`;
  localStorageArrQ=arrForRender(localStorageArrQ);
  renderFilm(localStorageArrQ);
  modal(localStorageArrQ);
};

const libMarkup = function () {
  
  headerOfLib.innerHTML = `   <div class="container lib-container">

    <div class="header-container">
      <div class="header-logo-container">
        <a href="./index.html" class="logo-link">
          <svg width="24" height="24">
            <use href="./images/sprite.svg#icon-film"></use>
          </svg>
        </a>
        <p class="logo-text">Filmoteka</p>
      </div>
      <div class="header-nav-container">
        <nav class="header-nav">
          <ul class="nav-list">
            <li class="nav-item">
              <a href="./index.html" class="link ">HOME</a>
            </li>
            <li class="nav-item">
               <button class="lib-link current" type="button">MY LIBRARY</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="btn-container">
      <button class="lib-btn watched">Watched</button>
      <button class="lib-btn queue">Queue</button>
    </div>
  </div>`;

  watched();
  document.querySelector(".watched").addEventListener("click", watched);
  document.querySelector(".queue").addEventListener("click", queue);
};

myLibraryLink.addEventListener("click", libMarkup);
