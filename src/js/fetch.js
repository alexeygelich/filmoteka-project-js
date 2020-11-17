import refs from './refs.js';

export default function (page = 1, searchValue = false) {
// console.log('searchValue',searchValue);
  return new Promise((resolve, reject) => {
    let year = '&primary_release_year=' + refs.yearChoise.dataset.id;
    let genres = '&with_genres=' + refs.genreChoise.dataset.id;
    let sort_by = refs.sortChoise.dataset.id;
    let lang = refs.langChoise.dataset.id;
    
    if (!searchValue) {
      fetch(`${refs.defaultURL}?api_key=${refs.API}&sort_by=${sort_by}&include_adult=false&include_video=false&page=${page}&vote_count.gte=1000${genres}${year}&language=${lang}`)
        .then(data => {
          if (!data.ok) {
            reject(new Error(`Помилка в запиті до сервера  [error code - ${data.status}]`))
          }
          return data
        })
        .then(data => data.json())
        .then(json => {
          if (json.results.length > 0) {
            return json
          }
          throw 'Масив з данними пустий [запит виконано]';
        })
        .then(json => resolve(json))
        .catch(data => console.log('ошибка'))
    }
    if (searchValue) {
      year = '&primary_release_year=' + refs.yearChoise.dataset.id;
      lang = refs.langChoise.dataset.id;
      fetch(`${refs.defaultSearch}?api_key=${refs.API}&page=${page}&query=${searchValue}&include_adult=false${year}&language=${lang}`)
        .then(data => {
          if (!data.ok) {
            reject(new Error(`Помилка в запиті до сервера  [error code - ${data.status}]`))
          }
          return data
        })
        .then(data => data.json())
        .then(json => {
          if (json.results.length > 0) {
          
            return json
          }
          throw 'Масив з данними пустий [запит виконано]';
        })
        .then(json => resolve(json))
        .catch(data => { 
          refs.errorNotification.classList.remove('is-hidden')
        })
    }
  })
}