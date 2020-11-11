import mainTemplate from "./templates/mainTemplate.hbs";
import refs from './refs.js';

export default function (arr) {
    const film = mainTemplate(arr);
    refs.filmList.innerHTML = film;
}



// export default { renderMain,renderLibrary };

