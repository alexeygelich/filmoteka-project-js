import refs from './refs'

let currenYear = new Date().getFullYear();

for (let i = 1900; i <= currenYear; i++) { 
    refs.yearList.insertAdjacentHTML('afterbegin',`<li class="year-list-item" data-id="${i}">${i}</li>`)
}