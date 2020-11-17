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
            backdropModal.innerHTML = `
            <div style='position:relative;' id='modal-trailer-wrapper'>
              <!-- =================spinner=============== -->
              <div class="loader" title="2" id='modal-trailer-spinner' style='position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);'>
                <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  width="100px" height="100px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                  <animateTransform attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.5s"
                    repeatCount="indefinite"/>
                  </path>
                </svg>
                </div>
                
                <!-- ================= END spinner============ --> 
              <div class='modal-trailer' style="width: 80vw; height: 36vw"></div>
              </div>`;
            const modalTrailer = document.querySelector('.modal-trailer');
            const spinner = document.querySelector('#modal-trailer-spinner');
            const wrapper = document.querySelector('#modal-trailer-wrapper');   
            modalTrailer.innerHTML=`<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${idYoutube}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            modalTrailer.insertAdjacentHTML('beforeend',`<button type="button" class="close-trailer">X</button>`)
            setTimeout(()=>{
              wrapper.removeChild(spinner); //!видаляємо спіннер через 2s
            }, 2000);
            setTimeout(()=>{
              backdropModal.classList.remove('is-hidden');
            }, 500);
            const onEscapeClose = function (e) {
        
        if (e.key === "Escape") {
          backdropModal.classList.add('is-hidden');
          modalTrailer.innerHTML = '';
          // document.body.classList.remove('stop-scroll');
          window.removeEventListener('keydown', onEscapeClose);
        }
      }
      window.addEventListener('keydown', onEscapeClose);
      backdropModal.addEventListener('click', e => {
        if (e.target === e.currentTarget) {
          window.removeEventListener('keydown', onEscapeClose);
          modalTrailer.innerHTML = '';
          // document.body.classList.remove('stop-scroll');
          backdropModal.classList.add('is-hidden');
        }
      }
      )
      const closeBtn = document.querySelector('.close-trailer');
      closeBtn.addEventListener('click', (e) => {
        window.removeEventListener('keydown', onEscapeClose);
        modalTrailer.innerHTML = '';
      //   document.body.classList.remove('stop-scroll');
        backdropModal.classList.add('is-hidden');
      })
    }
  )
}