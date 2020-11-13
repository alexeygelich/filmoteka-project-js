import mainTemplate from "./templates/mainTemplate.hbs";


const mainDiv = document.querySelector('.main');
const loaderDiv = document.querySelector('.loader');

export default function (arr) {
    mainDiv.innerHTML = `
    <ul class="film-list">
    </ul>
    `;
    const ulFilmList = document.querySelector('.main ul.film-list');
    setTimeout(()=> {
        loaderDiv.classList.add('is-hidden');
        ulFilmList.classList.add('show');
    }, 800);
    const filmList = document.querySelector('.film-list');


    const film = mainTemplate(arr);
    filmList.innerHTML = film;
}