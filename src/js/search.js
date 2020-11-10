const input = document.querySelector('input');
const form = document.querySelector('form');

const search = function(value) {

    if (value === "") {
        alert("Введите запрос!")
    }

};

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    search(input.value);
});