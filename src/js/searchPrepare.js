import getMovies from './fetch.js';

const error = document.querySelector('.search-error');
const input = document.querySelector('input');
const form = document.querySelector('form');

const search = function(value) {

    if (value === "") {
        alert("Введите запрос!")
    } else {
        getMovies(1, value);
        error.classList.add('is-hidden');
    }

};

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    search(input.value);
})

