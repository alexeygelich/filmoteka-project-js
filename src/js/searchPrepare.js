import getMovies from './fetch.js';

const error = document.querySelector('.search-error');
const input = document.querySelector('input');
const form = document.querySelector('form');

const search = function(value) {

    if (value === "") {
        alert("Введите запрос!")
    } else {
        console.log(getMovies(1, value));
        error.innerHTML = "";
    }

};

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    search(input.value);
})

