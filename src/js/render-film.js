import mainTemplate from "./templates/mainTemplate.hbs";
import libraryTemplate from "./templates/libraryTemplate.hbs";
import refs from './refs.js';


const filmArr = [{
    id: 0,
    popularity: 13.334,
    poster_path: "/esubm23z8N5JUA1wQ5yLSjLicDx.jpg",
    title: "The Invitation",
    genre_ids: "Drama, Action",
    overview: "Will and his new girlfriend Kira are invited to a dinner with old friends at the house of Will’s ex Eden and her new partner David. Although the evening appears to be relaxed, Will soon gets a creeping suspicion that their charming host David is up to something.",
    release_date: "2015-08-05",
    vote_average: 6.5,
    vote_count: 1675,
},
{
    id: 1,
    popularity: 7.742,
    vote_count: 54,
    vote_average: 6.7,
    title: "A Muppet Family Christmas",
    release_date: "1987-12-16",
    genre_ids: "Comedy",
    overview: "In this one-hour Christmas special, Fozzie Bear surprises his mother Emily on Christmas Eve by bringing the entire Muppet gang to her farm to celebrate the holidays. Doc and his dog Sprocket, who had planned a quiet Christmas, end up joining the Muppets in their holiday activities and preparations.The Sesame Street regulars, including Big Bird, Bert, Ernie and others, join the festivities, but to Kermit's dismay, the only one missing is Miss Piggy, who has been caught in a snowstorm.",
    poster_path: "/f31HlNI9e2y9tSvUPcvXZLptr1l.jpg"
},
{
    id: 2,
    popularity: 13.334,
    poster_path: "/esubm23z8N5JUA1wQ5yLSjLicDx.jpg",
    title: "The Invitation",
    overview: "Will and his new girlfriend Kira are invited to a dinner with old friends at the house of Will’s ex Eden and her new partner David. Although the evening appears to be relaxed, Will soon gets a creeping suspicion that their charming host David is up to something.",
    release_date: "2015-08-05",
    vote_average: 6.5,
    vote_count: 1675,
},
{
    id: 3,
    popularity: 7.742,
    vote_count: 54,
    vote_average: 6.7,
    title: "A Muppet Family Christmas",
    release_date: "1987-12-16",
    genre_ids: "Comedy",
    overview: "In this one-hour Christmas special, Fozzie Bear surprises his mother Emily on Christmas Eve by bringing the entire Muppet gang to her farm to celebrate the holidays. Doc and his dog Sprocket, who had planned a quiet Christmas, end up joining the Muppets in their holiday activities and preparations.The Sesame Street regulars, including Big Bird, Bert, Ernie and others, join the festivities, but to Kermit's dismay, the only one missing is Miss Piggy, who has been caught in a snowstorm.",
    poster_path: "/f31HlNI9e2y9tSvUPcvXZLptr1l.jpg"
}
]

const renderMain = function (arr) {
    const film = mainTemplate(filmArr);
    console.log(film);
    refs.filmList.insertAdjacentHTML('beforeend', film);
}

const renderLibrary = function (arr) {
    const film = libraryTemplate(filmArr);
    console.log(film);
    refs.filmList.insertAdjacentHTML('beforeend', film);
}

export { renderMain };
export { renderLibrary };

