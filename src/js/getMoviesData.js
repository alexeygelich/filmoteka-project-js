import refs from './refs.js';

const getMoviesData = async function (promis) {
  let array = [];
  const filmArr = [];
  await promis
    .then((data) => {
      array = [...data.results];
      let str = "";
      array.forEach((e) => {
        const obj = {};
        obj.id = e.id;
        obj.popularity = e.popularity;
        obj.poster_path = e.poster_path;
        obj.title = e.title;
        str = "";
        let arr = [];
        [...e.genre_ids].forEach((number) => {
          refs.genres.forEach((ref) => {
            if (number === ref.id) {
              
              arr.push(ref.name);
              // str += `${ref.name}, `;
            }
          });
        });
        str = arr.join(', ');
        obj.genre_ids = str;
        obj.overview = e.overview;
        obj.vote_average = e.vote_average;
        obj.vote_count = e.vote_count;
        obj.release_date = e.release_date.split('-')[0];
        filmArr.push(obj);
      });
    })
    .catch(er => console.log(er) );
  return filmArr;
};

export default getMoviesData;


