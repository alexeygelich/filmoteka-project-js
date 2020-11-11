//! ВИПРАВИТИ ШАПБЛОН (КНОПКА close)

import modalTemplate from './templates/modalTemplate-new.hbs';

export default function (arr) {
  const filmList = document.querySelector('.film-list');

  const onModalOpen = e => {
    e.path.forEach(el => {
      if (el.className === 'film-list-item') {
        const elId = +el.dataset.id;
        // arr.forEach(el => {
        // if (el.id === elId) {
        const test = arr.find(el => el.id === elId);
        document.body.classList.add('stop-scroll');
        const filmModal = document.querySelector('.modal-section');
        filmModal.innerHTML = modalTemplate(test);
      } 
    })
        
    const modalOn = document.querySelector('.backdrop')
    modalOn.classList.remove('is-hidden')
      
  

    const onEscapeClose = function (e) {
      console.log(e.key);
      if (e.key === "Escape") {
        modalOn.classList.add('is-hidden');
        document.body.classList.remove('stop-scroll');
        window.removeEventListener('keydown', onEscapeClose);
      }
    }
      
    window.addEventListener('keydown', onEscapeClose);

    modalOn.addEventListener('click', e => {
      if (e.target === e.currentTarget) {
        window.removeEventListener('keydown', onEscapeClose);
        document.body.classList.remove('stop-scroll');
        modalOn.classList.add('is-hidden');
      }
    }
    )

    const closeBtn = document.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', (e) => {
      window.removeEventListener('keydown', onEscapeClose);
      document.body.classList.remove('stop-scroll');
      modalOn.classList.add('is-hidden');
    })


    
  }

  
  filmList.addEventListener('click', onModalOpen);
}