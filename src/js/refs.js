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
    API:'2d536748299a0654176fee96f4763797',
    defaultURL: 'https://api.themoviedb.org/3/movie/popular',
    defaultSearch: 'https://api.themoviedb.org/3/search/movie',
    genres:[
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ],
  }
