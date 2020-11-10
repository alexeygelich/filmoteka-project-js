import './sass/main.scss';
import './js/searchPrepare.js';
import modalTemplate from './js/templates/modalTemplate.hbs'
import refs from './js/refs.js';


const renderModal = function (arr) {
    const modalItem = modalTemplate(filmArr);
    refs.modal.insertAdjacentHTML('beforeend', modalItem);
}

renderModal(filmArr)

