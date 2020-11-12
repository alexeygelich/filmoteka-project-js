import modal from './modal.js';

const filmList = document.querySelector('.film-list');
const searchPrediction = document.querySelector('.search-list');

const onModalOpen = function (e) {
    e.path.forEach(el => {
        if (
            el.className === 'film-list-item' ||
            el.className === 'search-list-item'
        ) {
            const elId = +el.dataset.id;
            console.log(elId);
            modal(elId);
        }
    })
}

  filmList.addEventListener('click', onModalOpen);
  searchPrediction.addEventListener('click', onModalOpen);