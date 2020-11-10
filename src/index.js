import './sass/main.scss';
import './js/searchPrepare.js';
import modalTemplate from './js/templates/modalTemplate.hbs'
import refs from './js/refs.js';


const filmArr = [{
    id: 0,
    popularity: 13.334,
    poster_path: "/esubm23z8N5JUA1wQ5yLSjLicDx.jpg",
    title: "The Invitation",
    genre_ids: "Drama, Action",
    overview: "Will and his new girlfriend Kira are invited to a dinner with old friends at the house of Will’s ex Eden and her new partner David. Although the evening appears to be relaxed, Will soon gets a creeping suspicion that their charming host David is up to something.",
    release_date: "2015-08-05",
    vote_average: 6.5,
    vote_count: 1675,
}
]

const renderModal = function (arr) {
    const modalItem = modalTemplate(filmArr);
    refs.modal.insertAdjacentHTML('beforeend', modalItem);
}

renderModal(filmArr)

