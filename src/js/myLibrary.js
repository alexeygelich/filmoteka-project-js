import libMark from "./templates/mainTemplate.hbs";
import refs from "./refs.js";
const myLibraryLink = document.querySelector(".lib-link");
const headerOfLib = document.querySelector(".header");

const localStorageArrW = JSON.parse(localStorage.getItem(`w`)) || [];
const localStorageArrQ = JSON.parse(localStorage.getItem(`q`)) || [];

const watched = function () {
  bodyOfLib.insertAdjacentHTML("beforeend", libMark(localStorageArrW));
};
const queue = function () {
  bodyOfLib.insertAdjacentHTML("beforeend", libMark(localStorageArrQ));
};

const libMarkup = function () {
  headerOfLib.insertAdjacentHTML(
    "afterbegin",
    `   <div class="container lib-container">

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
              <a href="./index.html" class="link current">HOME</a>
            </li>
            <li class="nav-item">
              <a href="./librar" class="link">MY LIBRARY</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="btn-container">
      <button class="lib-btn">Watched</button>
      <button class="lib-btn">Queue</button>
    </div>
  </div>`
  );
  document.querySelector(".watched").addEventListener("click", watched);
  document.querySelector(".queue").addEventListener("click", queue);
};

myLibraryLink.addEventListener("click", libMarkup);
