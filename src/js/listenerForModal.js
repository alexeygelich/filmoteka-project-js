import modal from "./modal.js";
import getMoviesData from "./getMoviesData.js";
import getMovies from "./fetch.js";
import arrRender from "./arr-for-render";
import renderMain from "./render-film";
import refs from "./refs.js";
import pagination from "./pagination.js";
import clearInput from "./clearInput";
import btnsOfCards from "./btnsOfCards";
import btnsFromLocalStorage from "./localStorage";

const filmList = document.querySelector(".film-list");

const searchPrediction = document.querySelector(".search-list");
const logoLink = document.querySelector(".logo-link");
const homeRef = document.querySelector("#home");
const logoFooterLink = document.querySelector(".footer-logo");
btnsOfCards();
const onModalOpen = function (e) {
  let isBtn = false;

  e.path.forEach((el) => {
    if (el.nodeName === "BUTTON") {
      isBtn = true;
      return;
    }
  });
  if (isBtn) {
    return;
  }
  e.path.forEach((el) => {
    if (
      el.className === "film-list-item" ||
      el.className === "search-list-item"
    ) {
      const elId = +el.dataset.id;
      modal(elId);
    }
  });
  clearInput();
};

const homeFn = function (e) {
  e.preventDefault();
  const btnContainer = document.querySelector(".btn-container");
  const inputWrap = document.querySelector(".input-wrap");
  const navContainer = document.querySelector(".nav-container");
  const libLink = document.querySelector(".lib-link");
  const homeRef = document.querySelector("#home");

  btnContainer.classList.add("is-hidden");
  inputWrap.classList.remove("is-hidden");
  navContainer.classList.remove("lib-container");
  libLink.classList.remove("current");
  homeRef.classList.add("current");
  clearInput();
  const firstFetch = async function () {
    return await getMovies(1);
  };

  getMoviesData(firstFetch())
    .then((data) => arrRender(data))
    .then((data) => {
      renderMain(data);
      refs.ARR = [...data];
      pagination(
        false,
        firstFetch().then((data) => data.total_results)
      );
    });
  btnsOfCards();
};

filmList.addEventListener("click", onModalOpen);
searchPrediction.addEventListener("click", onModalOpen);
logoLink.addEventListener("click", homeFn);
homeRef.addEventListener("click", homeFn);
logoFooterLink.addEventListener("click", homeFn);
