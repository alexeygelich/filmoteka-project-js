import mainTemplate from "./templates/mainTemplate.hbs";
import mainTemplateRu from "./templates/mainTemplate_ru.hbs";

// import btnsOfCards from "./btnsOfCards";
import refs from "./refs.js";
// import btnsFromLocalStorage from "./localStorage";
import toTop from "./toTop.js";


const loaderDiv = document.querySelector(".loader");
const ulFilmList = document.querySelector(".main ul.film-list");
const filmList = document.querySelector(".film-list");

export default function (arr) {
  setTimeout(() => {
    loaderDiv.classList.add("is-hidden");
    ulFilmList.classList.add("show");
  }, 800);

  let film;
  refs.langChoise.dataset.id === 'ru' ? film = mainTemplateRu(arr) : film = mainTemplate(arr);

  filmList.innerHTML = film;

    setTimeout(()=> {
        loaderDiv.classList.add('is-hidden');
        ulFilmList.classList.add('show');
    }, 800);

    toTop();
}
