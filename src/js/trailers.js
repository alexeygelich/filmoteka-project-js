export default function (name, year) { 
    const KEY_YOUTUBE = 'AIzaSyC2bl8RG1baEBqc2I1X_QiZQWc1V6oCfTU'
    fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${name + ` ${year}` + ' trailer'}&key=${KEY_YOUTUBE}`)
        .then(data => data.json())
        .then(data => {
            const idYoutube = data.items[0].id.videoId;
            // const modalSection = document.querySelector('.modal-section');
            // const width = window.innerWidth * 0.8;
            // const height = width * 0.45;
            const backdropModal=document.querySelector('.backdrop-modal');
            backdropModal.innerHTML = `<div class='modal-trailer' style="width: 80vw; height: 36vw"></div>`;
            const modalTrailer = document.querySelector('.modal-trailer');
            
            
            // modalTrailer.style.width = `${width}`;
            // modalTrailer.style.height = `${height}`;
            modalTrailer.innerHTML=`<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${idYoutube}?controls=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            modalTrailer.insertAdjacentHTML('beforeend',`<button type="button" class="close-trailer">X</button>`)
            backdropModal.classList.remove('is-hidden');
            const onEscapeClose = function (e) {
      console.log(e.key);
      if (e.key === "Escape") {
        backdropModal.classList.add('is-hidden');
        // document.body.classList.remove('stop-scroll');
        window.removeEventListener('keydown', onEscapeClose);
      }
    }
    window.addEventListener('keydown', onEscapeClose);
    backdropModal.addEventListener('click', e => {
      if (e.target === e.currentTarget) {
        window.removeEventListener('keydown', onEscapeClose);
        // document.body.classList.remove('stop-scroll');
        backdropModal.classList.add('is-hidden');
      }
    }
    )
    const closeBtn = document.querySelector('.close-trailer');
    closeBtn.addEventListener('click', (e) => {
      window.removeEventListener('keydown', onEscapeClose);
    //   document.body.classList.remove('stop-scroll');
      backdropModal.classList.add('is-hidden');
    })
  }
)
}