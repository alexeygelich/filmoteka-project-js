//! ВИПРАВИТИ ШАПБЛОН (КНОПКА close)
import modalTemplate from './templates/modalTemplate-new.hbs';
import localStorage from './localStorage';

import trailer from "./trailers";

export default function (arr) {
  const filmList = document.querySelector('.film-list');
  const searchPrediction = document.querySelector('.search-list');
  const onModalOpen = e => {
    let test;
    console.log(e.path);
    e.path.forEach(el => {
      if (
        el.className === 'film-list-item' ||
        el.className === 'search-list-item'
      ) {
        const elId = +el.dataset.id;
        test = arr.find(el => el.id === elId);
        document.body.classList.add('stop-scroll');
        const filmModal = document.querySelector('.modal-section');
        filmModal.innerHTML = modalTemplate(test);
      } 
    })
    const modalOn = document.querySelector('.backdrop')
      modalOn.classList.remove('is-hidden')
      
      localStorage(test);
    
    const trailerRef = document.querySelector('.trailer-btn');

    trailerRef.addEventListener('click', () => { 
      trailer(test.title,test.release_date);
    })
    
    const onEscapeClose = function (e) {
      console.log(e.key);
      if (e.key === 'Escape') {
        modalOn.classList.add('is-hidden');
        document.body.classList.remove('stop-scroll');
        window.removeEventListener('keydown', onEscapeClose);
      }
    };
    window.addEventListener('keydown', onEscapeClose);
    modalOn.addEventListener('click', e => {
      if (e.target === e.currentTarget) {
        window.removeEventListener('keydown', onEscapeClose);
        document.body.classList.remove('stop-scroll');
        modalOn.classList.add('is-hidden');
      }
    });
    const closeBtn = document.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', e => {
      window.removeEventListener('keydown', onEscapeClose);
      document.body.classList.remove('stop-scroll');
      modalOn.classList.add('is-hidden');
    });
  };
  filmList.addEventListener('click', onModalOpen);
  searchPrediction.addEventListener('click', onModalOpen);
}