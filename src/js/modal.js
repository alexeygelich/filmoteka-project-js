const filmArr = [{
    "popularity": 13.334,
    "vote_count": 1675,
    "video": false,
    "poster_path": "/esubm23z8N5JUA1wQ5yLSjLicDx.jpg",
    "id": 0,
    "adult": false,
    "backdrop_path": "/frjabej20ApHuEATv0IhZVKh433.jpg",
    "original_language": "en",
    "original_title": "The Invitation",
    "genre_ids": [
        53
    ],
    "title": "The Invitation",
    "vote_average": 6.5,
    "overview": "Will and his new girlfriend Kira are invited to a dinner with old friends at the house of Will’s ex Eden and her new partner David. Although the evening appears to be relaxed, Will soon gets a creeping suspicion that their charming host David is up to something.",
    "release_date": "2015-08-05"
},
{
    "popularity": 0.644,
    "id": 1,
    "video": false,
    "vote_count": 0,
    "vote_average": 0,
    "title": "Zaproszenie",
    "release_date": "1986-04-26",
    "original_language": "pl",
    "original_title": "Zaproszenie",
    "genre_ids": [
        18,
        36,
        10752
    ],
    "backdrop_path": null,
    "adult": false,
    "overview": "",
    "poster_path": "/zWOoJagc3FvGJZdXdzhQf56gFsv.jpg"
},
{
    "popularity": 6.603,
    "vote_count": 23,
    "video": false,
    "poster_path": "/1Au4jGHUKvckHAbuZd9bgchFetY.jpg",
    "id": 2,
    "adult": false,
    "backdrop_path": "/1o4I3HvpTIxh2ESXFCvhMIJY0aJ.jpg",
    "original_language": "en",
    "original_title": "Divorce Invitation",
    "genre_ids": [
        35,
        10749
    ],
    "title": "Divorce Invitation",
    "vote_average": 4.5,
    "overview": "'Divorce Invitation' centers on Mike Christian, a happily married man who runs into his high school sweetheart Alex, and after all these years, sparks still fly. When Mike is determined Alex is his true soul mate, he realizes he has a huge problem-he signed an iron-clad pre-nuptial agreement and his wife will not let him out of the marriage",
    "release_date": "2012-11-14"
},
{
    "popularity": 1.4,
    "id": 3,
    "video": false,
    "vote_count": 8,
    "vote_average": 6.9,
    "title": "Invitation to a Journey",
    "release_date": "1927-12-28",
    "original_language": "fr",
    "original_title": "L'invitation au voyage",
    "genre_ids": [
        18
    ],
    "backdrop_path": null,
    "adult": false,
    "overview": "A woman enters a nightclub and slowly begins to open herself up.",
    "poster_path": "/2UejGTMznpln98cZkU0OZScQ7sN.jpg"
},
{
    "popularity": 7.742,
    "id": 4,
    "video": false,
    "vote_count": 54,
    "vote_average": 6.7,
    "title": "A Muppet Family Christmas",
    "release_date": "1987-12-16",
    "original_language": "en",
    "original_title": "A Muppet Family Christmas",
    "genre_ids": [
        35,
        10751,
        10770,
        10402
    ],
    "backdrop_path": "/7KGwH0gn14RHZXSJSxRUQo2Y5F4.jpg",
    "adult": false,
    "overview": "In this one-hour Christmas special, Fozzie Bear surprises his mother Emily on Christmas Eve by bringing the entire Muppet gang to her farm to celebrate the holidays. Doc and his dog Sprocket, who had planned a quiet Christmas, end up joining the Muppets in their holiday activities and preparations.The Sesame Street regulars, including Big Bird, Bert, Ernie and others, join the festivities, but to Kermit's dismay, the only one missing is Miss Piggy, who has been caught in a snowstorm.",
    "poster_path": "/f31HlNI9e2y9tSvUPcvXZLptr1l.jpg"
},
{
    "popularity": 3.739,
    "vote_count": 30,
    "video": false,
    "poster_path": "/2UejGTMznpln98cZkU0OZScQ7sN.jpg",
    "id": 55150,
    "adult": false,
    "backdrop_path": "/a3nGvMXOv3XEhnkyRhQYZmH3YZm.jpg",
    "original_language": "en",
    "original_title": "Invitation to a Gunfighter",
    "genre_ids": [
        37,
        10749
    ],
    "title": "Invitation to a Gunfighter",
    "vote_average": 5.4,
    "overview": "When Confederate soldier Matt Weaver returns to town after the Civil War, he finds that his home has been sold by town boss Sam Brewster. Brewster hires gunfighter Jules Gaspard d'Estaing to deal with Weaver, but d'Estaing's independent approach settles the town's problems in a very unorthodox manner.",
    "release_date": "1964-10-14"
}
]

const filmListItem = document.querySelector('.film-list-item');
const filmList = document.querySelector('.film-list')

filmList.addEventListener('click', (e) => {
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

        const closeBtn = document.querySelector('.close-modal-btn');
        closeBtn.addEventListener('click', (e) => {
            modalOn.classList.add('is-hidden')
        })


    })
})

// const closeModal = () => {
//     modal.classList.remove('is-hidden');
//     window.removeEventListener('keydown', onBtnPress);
//     backdrop.removeEventListener('click', onBackdropClick);
// }
// const onBackdropClick = event =>
//     event.currentTarget === event.target ? closeModal() : '';



