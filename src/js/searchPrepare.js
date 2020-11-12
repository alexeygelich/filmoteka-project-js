import getMovies from "./fetch.js";


const error = document.querySelector(".search-error");

export const search = function (value) {
    return getMovies(1, value);
};
