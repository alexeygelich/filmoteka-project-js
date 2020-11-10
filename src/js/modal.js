import modalTemplate from './templates/modalTemplate.hbs'
import refs from './refs.js';


const renderModal = function (arr) {
    const modalItem = modalTemplate(filmArr);
    refs.modal.insertAdjacentHTML('beforeend', modalItem);
}

renderModal(filmArr)