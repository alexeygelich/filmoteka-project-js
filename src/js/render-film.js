import mainTemplate from "./templates/mainTemplate.hbs";

const filmList = document.querySelector('.film-list');

export default function (arr) {


    const film = mainTemplate(arr);
    filmList.innerHTML = film;
}