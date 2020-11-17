// Популярные фильмы
// https://api.themoviedb.org/3/movie/popular?api_key=2d536748299a0654176fee96f4763797&page=1
// Запрос на поиск фильмов
// https://api.themoviedb.org/3/search/movie?api_key=2d536748299a0654176fee96f4763797&query=zapros&page=1&include_adult=false
// Картинки
// https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg
// https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
// http://image.tmdb.org/t/p/w440_and_h660_face/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg
// http://image.tmdb.org/t/p/w220_and_h330_face/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg

export default {
  ARR: [],
  API: '2d536748299a0654176fee96f4763797',
  defaultURL: 'https://api.themoviedb.org/3/discover/movie',
  defaultSearch: 'https://api.themoviedb.org/3/search/movie',
  yearSearch: document.querySelector('.year-search'),
  searchBtn: document.querySelector('.search-btn'),
  searchInput: document.querySelector('.header-input'),
  listPrediction: document.querySelector('.search-list'),
  genreChoise: document.querySelector('.genre'),
  categoryGenreList:document.querySelector('.category-list'),
  sortChoise: document.querySelector('.sort'),
  sortList:document.querySelector('.sort-list'),
  yearChoise: document.querySelector('.year'),
  yearList:document.querySelector('.year-list'),
  clearBtn:document.querySelector('.clear-btn'),
  sortWrapper:document.querySelector('.sort-wrapper'),  
  genreWrapper:document.querySelector('.genre-wrapper'),
  langChoise: document.querySelector('.choose-language'),
  langList: document.querySelector('.languages-list'),
  home: document.querySelector('#home'),
  libLink: document.querySelector('.lib-link'),
  logoText: document.querySelector('.logo-text'),
  footerLogo: document.querySelector('.footer-logo'),
  sectionDesc: document.querySelector('.section-desc'),
  sectionDescJoin: document.querySelector('.socials .section-desc'),
  sectionDescSupport: document.querySelector('.support .section-desc'),
  copyrightDesc: document.querySelector('.copyright'),
  developer: document.querySelector('.developer'),
  students: document.querySelector('.students'),
  toTop: document.querySelector('#to-top'),
  addQ: document.querySelector('.lib-btn.queue'),
  addW: document.querySelector('.lib-btn.watched'),
  // btnWatch: document.querySelector('.lib-btn .watched'),
  // btnQueu:document.querySelector('.lib-btn .queue'),
  genres: [
    {
      "id": 28,
      "name": "Action",
      "name_ru": "Экшн"
    },
    {
      "id": 12,
      "name": "Adventure",
      "name_ru": "Приключения"
    },
    {
      "id": 16,
      "name": "Animation",
      "name_ru": "Анимационный"
    },
    {
      "id": 35,
      "name": "Comedy",
      "name_ru": "Комедии"
    },
    {
      "id": 80,
      "name": "Crime",
      "name_ru": "Криминал"
    },
    {
      "id": 99,
      "name": "Documentary",
      "name_ru": "Документальные"
    },
    {
      "id": 18,
      "name": "Drama",
      "name_ru": "Драма"
    },
    {
      "id": 10751,
      "name": "Family",
      "name_ru": "Семейные"
    },
    {
      "id": 14,
      "name": "Fantasy",
      "name_ru": "Фантасктика"
    },
    {
      "id": 36,
      "name": "History",
      "name_ru": "Исторические"
    },
    {
      "id": 27,
      "name": "Horror",
      "name_ru": "Хоррор"
    },
    {
      "id": 10402,
      "name": "Music",
      "name_ru": "Музыка"
    },
    {
      "id": 9648,
      "name": "Mystery",
      "name_ru": "Мистика"
    },
    {
      "id": 10749,
      "name": "Romance",
      "name_ru": "Мелодрама"
    },
    {
      "id": 878,
      "name": "Science Fiction",
      "name_ru": "Научная фантастика"
    },
    {
      "id": 10770,
      "name": "TV Movie",
      "name_ru": "Сериал"
    },
    {
      "id": 53,
      "name": "Thriller",
      "name_ru": "Триллер"
    },
    {
      "id": 10752,
      "name": "War",
      "name_ru": "Война"
    },
    {
      "id": 37,
      "name": "Western",
      "name_ru": "Вестерн"
    }
  ],
  filmList: document.querySelector('.film-list'),
  errorNotification: document.querySelector('.search-error'),
  modal: document.querySelector('.modal-section')
}