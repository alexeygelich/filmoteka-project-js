import mainTemplate from "./templates/mainTemplateLib.hbs";
import btnsOfCards from "./btnsOfCards";
import refs from "./refs.js";
import btnsFromLocalStorage from "./localStorage";

const loaderDiv = document.querySelector(".loader");
const ulFilmList = document.querySelector(".main ul.film-list");
const filmList = document.querySelector(".film-list");

export default function (arr) {
  setTimeout(() => {
    loaderDiv.classList.add("is-hidden");
    ulFilmList.classList.add("show");
  }, 800);

  const film = mainTemplate(arr);
  filmList.innerHTML = film;
}
