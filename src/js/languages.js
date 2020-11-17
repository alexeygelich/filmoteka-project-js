import refs from './refs';
import getMoviesData from './getMoviesData.js';
import getMovies from "./fetch.js";
import arrRender from './arr-for-render';
import renderMain from './render-film';
import pagination from './pagination.js';

refs.langChoise.dataset.id = localStorage.getItem('lang') || 'en';
refs.langChoise.dataset.id === 'ru' ? refs.langChoise.innerHTML = `<svg class="theme-switch__icon" role="img" aria-label="Иконка солнца">
                <use href="./images/sprite.svg#icon-rus"></use>
              </svg>` : refs.langChoise.innerHTML = `<svg class="theme-switch__icon" role="img" aria-label="Иконка солнца">
                <use href="./images/sprite.svg#icon-en"></use>
              </svg>`;

transleteFn();

refs.langChoise.addEventListener('click', () => {
    refs.langList.classList.toggle('is-hidden');
});




refs.langList.addEventListener('click', e => {
    e.path.forEach(el => {
        if (el.className === 'languages-list-item') {
            refs.langChoise.innerHTML = el.innerHTML;
            refs.langChoise.dataset.id = el.dataset.id;
          refs.langList.classList.add('is-hidden');
          localStorage.setItem('lang', el.dataset.id);
        }
    })
    transleteFn();
});


// перевод сайта
function transleteFn() {
    // Перевод хедера
    refs.langChoise.dataset.id === 'ru' ? refs.home.textContent = 'ГЛАВНАЯ' : refs.home.textContent = 'HOME';
    refs.langChoise.dataset.id === 'ru' ? refs.libLink.textContent = 'БИБЛИОТЕКА' : refs.libLink.textContent = 'MY LIBRARY';
    // refs.langChoise.dataset.id === 'ru' ? refs.logoText.textContent = 'Фильмотека' : refs.logoText.textContent = 'Filmoteka';
  refs.langChoise.dataset.id === 'ru' ? refs.addW.textContent = 'Просмотренные' : refs.addW.textContent = 'Watched';
      refs.langChoise.dataset.id === 'ru' ? refs.addQ.textContent = 'Очередь' : refs.addQ.textContent = 'Queue';
    // Перевод фильтра
    refs.langChoise.dataset.id === 'ru' ? refs.searchInput.placeholder = "Поиск фильмов" : refs.searchInput.placeholder = "Search films";
    refs.langChoise.dataset.id === 'ru' ? refs.sortChoise.textContent = 'Сортировка' : refs.sortChoise.textContent = 'Sort by';
    refs.langChoise.dataset.id === 'ru' ? refs.genreChoise.textContent = 'Жанр' : refs.genreChoise.textContent = 'Genre';
    refs.langChoise.dataset.id === 'ru' ? refs.yearChoise.textContent = 'Год' : refs.yearChoise.textContent = 'Year';
    refs.langChoise.dataset.id === 'ru' ? refs.clearBtn.textContent = 'Очистить' : refs.clearBtn.textContent = 'Clear';
    [...refs.sortList.children].forEach(el => {
        if (el.dataset.id === 'popularity.desc') {
            refs.langChoise.dataset.id === 'ru' ? el.textContent = 'Популярность(↓)' : el.textContent = 'popularity(↓)';
        }
        if (el.dataset.id === 'popularity.asc') {
            refs.langChoise.dataset.id === 'ru' ? el.textContent = 'Популярность(↑)' : el.textContent = 'popularity(↑)';
        }
        if (el.dataset.id === 'vote_average.desc') {
            refs.langChoise.dataset.id === 'ru' ? el.textContent = 'Рейтинг(↓)' : el.textContent = 'vote_average(↓)';
        }
        if (el.dataset.id === 'vote_average.asc') {
            refs.langChoise.dataset.id === 'ru' ? el.textContent = `Рейтинг(↑)` : el.textContent = 'vote_average(↑)';
        }
    });

    [...refs.categoryGenreList.children].forEach(el => { 
        if (el.dataset.id === '28') { 
               refs.langChoise.dataset.id === 'ru' ? el.textContent = 'Экшн' : el.textContent = 'Action'; 
        }
        if (el.dataset.id === '12') { 
               refs.langChoise.dataset.id === 'ru' ? el.textContent = 'Приключения' : el.textContent = 'Adventure'; 
        }
        if (el.dataset.id === '16') { 
               refs.langChoise.dataset.id === 'ru' ? el.textContent = 'Аниме' : el.textContent = 'Animation'; 
        }
        if (el.dataset.id === '35') { 
               refs.langChoise.dataset.id === 'ru' ? el.textContent = `Комедия` : el.textContent = 'Comedy'; 
        }
        if (el.dataset.id === '80') { 
               refs.langChoise.dataset.id === 'ru' ? el.textContent = `Криминал` : el.textContent = 'Crime'; 
        }
        if (el.dataset.id === '99') { 
               refs.langChoise.dataset.id === 'ru' ? el.textContent = `Документальный` : el.textContent = 'Documentary'; 
        }
        if (el.dataset.id === '18') { 
               refs.langChoise.dataset.id === 'ru' ? el.textContent = `Драма` : el.textContent = 'Drama'; 
        }
        if (el.dataset.id === '10751') { 
               refs.langChoise.dataset.id === 'ru' ? el.textContent = `Семейный` : el.textContent = 'Family'; 
        }
        if (el.dataset.id === '14') { 
               refs.langChoise.dataset.id === 'ru' ? el.textContent = `Фантастика` : el.textContent = 'Fantasy'; 
        }
        if (el.dataset.id === '36') { 
               refs.langChoise.dataset.id === 'ru' ? el.textContent = `Исторический` : el.textContent = 'History'; 
        }
    })


    
// Footer
    // refs.langChoise.dataset.id === 'ru' ? refs.footerLogo.textContent = 'Фильмотека' : refs.footerLogo.textContent = 'Filmoteka';
    refs.langChoise.dataset.id === 'ru' ? refs.sectionDesc.textContent = 'НАШИ ПРИЛОЖЕНИЯ' : refs.sectionDesc.textContent = 'OUR APPLICATIONS';
    refs.langChoise.dataset.id === 'ru' ? refs.sectionDescJoin.textContent = 'ПРИСОЕДИНЯЙТЕСЬ К СОЦСЕТЯМ' : refs.sectionDescJoin.textContent = 'JOIN US ON OUR NETWORKS';
    refs.langChoise.dataset.id === 'ru' ? refs.sectionDescSupport.textContent = 'Поддержка' : refs.sectionDescSupport.textContent = 'Support';    
    refs.langChoise.dataset.id === 'ru' ? refs.copyrightDesc.innerHTML = `<p class="copyright-desc">&copy 2020 | Все права защищены | Разработано с</p>
          <p class="developer"> 
            <span>
              <svg class="footer-svg" width="14" height="13">
                <use href="./images/sprite.svg#icon-favorite"></use>
              </svg>
            </span>
            <a href="https://goit.ua/"
              ><span class="copyright-logo">Go</span>
              <span class="copyright-accent">IT </span>
            </a>
            <span class="students">&nbsp Студентами</span></p></div>` : refs.copyrightDesc.innerHTML = `<p class="copyright-desc">&copy 2020 | All Rights Reserved |</p>
          <p class="developer">&nbsp Developed with
            <span>
              <svg class="footer-svg" width="14" height="13">
                <use href="./images/sprite.svg#icon-favorite"></use>
              </svg>
            </span>
            by &nbsp
            <a href="https://goit.ua/"
              ><span class="copyright-logo">Go</span>
              <span class="copyright-accent">IT </span>
            </a>
            <span class="students">&nbsp Students</span></p></div>`;





getMoviesData(getMovies(1, refs.searchInput.value))
.then(data => arrRender(data))
.then(data => {
  renderMain(data);
  refs.ARR = [...data];
  pagination(refs.searchInput.value, getMovies(1, refs.searchInput.value).then(data => data.total_results));
})
};
