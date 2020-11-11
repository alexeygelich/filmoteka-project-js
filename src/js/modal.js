import localStorage from "./localStorage";
export default function (arr) {
  const filmList = document.querySelector(".film-list");
  let elId;
  const onModalOpen = (e) => {
    e.path.forEach((el) => {
      if (el.className === "film-list-item") {
        elId = +el.dataset.id;

        // arr.forEach(el => {
        // if (el.id === elId) {
        document.body.classList.add("stop-scroll");
        const filmModal = document.querySelector(".modal-section");
        filmModal.innerHTML = `
    <button class="close-modal-btn" type="button">X</button>
      <img class="film-image" src="http://image.tmdb.org/t/p/w440_and_h660_face${arr[elId].poster_path}" alt="${arr[elId].title}" />
      <div class="info-section">
        <h2 class="title">${arr[elId].title}</h2>
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
                <span class="about-film-vote">${arr[elId].vote_average}</span> / ${arr[elId].vote_count}
              </p>
            </li>
            <li>
              <p class="about-film-info">${arr[elId].popularity}</p>
            </li>
            <li>
              <p class="about-film-info">${arr[elId].title}</p>
            </li>
            <li>
              <p class="about-film-info">${arr[elId].genre_ids}</p>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="subtitle">ABOUT</h3>
          <p class="description">
            ${arr[elId].overview}
          </p>
        </div>
        <button class="first add-btn" type="button">ADD TO WATCHED</button>
        <button class="second add-btn" type="button">ADD TO QUEUE</button>
    </div>`;
      }
    });

    localStorage(arr[elId]);

    const modalOn = document.querySelector(".backdrop");
    modalOn.classList.remove("is-hidden");

    const onEscapeClose = function (e) {
      console.log(e.key);
      if (e.key === "Escape") {
        modalOn.classList.add("is-hidden");
        document.body.classList.remove("stop-scroll");
        window.removeEventListener("keydown", onEscapeClose);
      }
    };

    window.addEventListener("keydown", onEscapeClose);

    modalOn.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        window.removeEventListener("keydown", onEscapeClose);
        document.body.classList.remove("stop-scroll");
        modalOn.classList.add("is-hidden");
      }
    });

    const closeBtn = document.querySelector(".close-modal-btn");
    closeBtn.addEventListener("click", (e) => {
      window.removeEventListener("keydown", onEscapeClose);
      document.body.classList.remove("stop-scroll");
      modalOn.classList.add("is-hidden");
    });
  };

  filmList.addEventListener("click", onModalOpen);
}
