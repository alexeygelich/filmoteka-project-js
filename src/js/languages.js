import refs from './refs'

refs.langChoise.addEventListener('click', () => {
    refs.langList.classList.toggle('is-hidden');
});



refs.langList.addEventListener('click', e => {
    e.path.forEach(el => {
        if (el.className === 'languages-list-item') {
            refs.langChoise.innerHTML = el.innerHTML;
            refs.langChoise.dataset.id = el.dataset.id;
            refs.langList.classList.add('is-hidden');
        }
    })
    transleteFn();
});


// перевод сайта
function transleteFn() {
    console.dir(refs.categoryGenreList.children);
    // Перевод хедера
    refs.langChoise.dataset.id === 'rus' ? refs.home.textContent = 'ГЛАВНАЯ' : refs.home.textContent = 'HOME';
    refs.langChoise.dataset.id === 'rus' ? refs.libLink.textContent = 'БИБЛИОТЕКА' : refs.libLink.textContent = 'MY LIBRARY';
    refs.langChoise.dataset.id === 'rus' ? refs.logoText.textContent = 'Фильмотека' : refs.logoText.textContent = 'Filmoteka';
    // Перевод фильтра
    refs.langChoise.dataset.id === 'rus' ? refs.searchInput.placeholder = "Поиск фильмов" : refs.searchInput.placeholder = "Search films";
    refs.langChoise.dataset.id === 'rus' ? refs.sortChoise.textContent = 'Сортировка' : refs.sortChoise.textContent = 'Sort by';
    refs.langChoise.dataset.id === 'rus' ? refs.genreChoise.textContent = 'Категория' : refs.genreChoise.textContent = 'Category';
    refs.langChoise.dataset.id === 'rus' ? refs.yearChoise.textContent = 'Год' : refs.genreChoise.textContent = 'Year';
    refs.langChoise.dataset.id === 'rus' ? refs.clearBtn.textContent = 'Очистить' : refs.clearBtn.textContent = 'Clear';
    [...refs.sortList.children].forEach(el => {
        if (el.dataset.id === 'popularity.desc') {
            refs.langChoise.dataset.id === 'rus' ? el.textContent = 'По популярности(↓)' : el.textContent = 'popularity.desc';
        }
        if (el.dataset.id === 'popularity.asc') {
            refs.langChoise.dataset.id === 'rus' ? el.textContent = 'По популярности(↑)' : el.textContent = 'popularity.asc';
        }
        if (el.dataset.id === 'vote_average.desc') {
            refs.langChoise.dataset.id === 'rus' ? el.textContent = 'По рейтингу(↓)' : el.textContent = 'vote_average.desc';
        }
        if (el.dataset.id === 'vote_average.asc') {
            refs.langChoise.dataset.id === 'rus' ? el.textContent = `По рейтингу(↑)` : el.textContent = 'vote_average.asc';
        }
    });

    [...refs.categoryGenreList.children].forEach(el => { 
        if (el.dataset.id === '28') { 
               refs.langChoise.dataset.id === 'rus' ? el.textContent = 'Экшн' : el.textContent = 'Action'; 
        }
        if (el.dataset.id === '12') { 
               refs.langChoise.dataset.id === 'rus' ? el.textContent = 'Приключения' : el.textContent = 'Adventure'; 
        }
        if (el.dataset.id === '16') { 
               refs.langChoise.dataset.id === 'rus' ? el.textContent = 'Аниме' : el.textContent = 'Animation'; 
        }
        if (el.dataset.id === '35') { 
               refs.langChoise.dataset.id === 'rus' ? el.textContent = `Комедия` : el.textContent = 'Comedy'; 
        }
        if (el.dataset.id === '80') { 
               refs.langChoise.dataset.id === 'rus' ? el.textContent = `Криминал` : el.textContent = 'Crime'; 
        }
        if (el.dataset.id === '99') { 
               refs.langChoise.dataset.id === 'rus' ? el.textContent = `Документальный` : el.textContent = 'Documentary'; 
        }
        if (el.dataset.id === '18') { 
               refs.langChoise.dataset.id === 'rus' ? el.textContent = `Драма` : el.textContent = 'Drama'; 
        }
        if (el.dataset.id === '10751') { 
               refs.langChoise.dataset.id === 'rus' ? el.textContent = `Семейный` : el.textContent = 'Family'; 
        }
        if (el.dataset.id === '14') { 
               refs.langChoise.dataset.id === 'rus' ? el.textContent = `Фантастика` : el.textContent = 'Fantasy'; 
        }
        if (el.dataset.id === '36') { 
               refs.langChoise.dataset.id === 'rus' ? el.textContent = `Исторический` : el.textContent = 'History'; 
        }
    })


}