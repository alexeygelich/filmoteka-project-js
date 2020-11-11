const filmListItem = document.querySelector('.film-list-item');
const filmList = document.querySelector('.film-list')

const onModalOpen = e => {
    e.path.forEach(el => {
        if (el.className === 'film-list-item') {
            const elId = +el.dataset.id;
            filmArr.forEach(el => {
                if (el.id === elId) {
                    const filmModal = document.querySelector('.modal-section');
                    filmModal.innerHTML = `
    <button class="close-modal-btn" type="button">X</button>
      <img class="film-image" src="http://image.tmdb.org/t/p/w440_and_h660_face${el.poster_path}" alt="${el.title}" />
      <div class="info-section">
        <h2 class="title">${el.title}</h2>
        <div class="modal-info">
          <ul class="list-info">
            <li>
              <p class="about-film">Vote / Votes</p>
            </li>
            <li>
              <p class="about-film">Popularity</p>
            </li>
            <li>
              <p class="about-film">Original Title</p>
            </li>
            <li>
              <p class="about-film genre">Genre</p>
            </li>
          </ul>
          <ul class="list-info">
            <li>
              <p class="about-film-info">
                <span class="about-film-vote">${el.vote_average}</span> / ${el.vote_count}
              </p>
            </li>
            <li>
              <p class="about-film-info">${el.popularity}</p>
            </li>
            <li>
              <p class="about-film-info">${el.title}</p>
            </li>
            <li>
              <p class="about-film-info">${el.genre_ids}</p>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="subtitle">ABOUT</h3>
          <p class="description">
            ${el.overview}
          </p>
        </div>
        <button class="first add-btn" type="button">ADD TO WATCHED</button>
        <button class="second add-btn" type="button">ADD TO QUEUE</button>
    </div>`
                }
            })
        }

        const modalOn = document.querySelector('.backdrop')
      modalOn.classList.remove('is-hidden')

      const onEscapeClose = function () { 
        // modalOn.classList.add('is-hidden')
      }
      
      window.addEventListener('keydown', onEscapeClose);

        const closeBtn = document.querySelector('.close-modal-btn');
        closeBtn.addEventListener('click', (e) => {
            modalOn.classList.add('is-hidden')
        })


    })
}

filmList.addEventListener('click', onModalOpen )