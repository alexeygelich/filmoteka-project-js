import mainTemplate from "./templates/mainTemplate.hbs";
import libraryTemplate from "./templates/libraryTemplate.hbs";
import refs from './refs.js';

export const renderMain = function (arr) {
    const film = mainTemplate(arr);
    refs.filmList.innerHTML = film;
}

export const renderLibrary = function (arr) {
    const film = libraryTemplate(arr);
    refs.filmList.innerHTML = film;
}

// export default { renderMain,renderLibrary };

