import mainTemplate from "./templates/mainTemplate.hbs";
import refs from './refs.js';

const mainDiv = document.querySelector('.main');

export default function (arr) {
    mainDiv.innerHTML = `
    <ul class="film-list">
    </ul>
    `;
    const filmList = document.querySelector('.film-list');

    const film = mainTemplate(arr);
    filmList.innerHTML = film;
}