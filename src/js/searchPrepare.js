import getMovies from "./fetch.js";

const error = document.querySelector(".search-error");

export const search = function (value) {
  if (value === "") {
    alert("Введите запрос!");
  } else {
    // error.innerHTML = "";
    return getMovies(1, value);
  }
};
