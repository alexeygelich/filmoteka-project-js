import './sass/main.scss';

import getMovies from './js/fetch.js';



const dom = {
  buttons: document.querySelector('.buttons'),
  span: document.querySelector('span'),
  outField: document.querySelector('#out-field')
}
let screen = '';
window.onload = function(event) {
  console.log(event.currentTarget.innerWidth);
  if (event.currentTarget.innerWidth > 1000) {
    screen = 'desktop';
    console.log(getMovies(1, screen));
    getMovies(1, screen).then(data => console.log(data))
  }
  if (event.currentTarget.innerWidth > 700 && event.currentTarget.innerWidth < 1000) {
    screen = 'tablet';
    getMovies(1, screen).then(data => console.log(data))
  }
  if (event.currentTarget.innerWidth < 700) {
    screen = 'mobile';
    console.log(getMovies(1, screen));
    getMovies(1, screen).then(data => console.log(data))
  }
}

dom.buttons.addEventListener('click', changePage)

let currentPageOnUser = 1;
function changePage(event) {
  if(event.view.innerWidth> 1000){
    screen = 'desktop';
  } else if (event.view.innerWidth > 700 && event.view.innerWidth< 1000) {
    screen = 'tablet';
  } else {
    screen = 'mobile';
  }
  if (event.target.dataset.name == 'right') {
    currentPageOnUser+=1
    dom.span.innerText = currentPageOnUser;
    console.log(currentPageOnUser, screen);
    getMovies(currentPageOnUser, screen).then(data => console.log(data))
  }
  if (event.target.dataset.name == 'left') {
    currentPageOnUser-=1
    dom.span.innerText = currentPageOnUser;
    console.log(currentPageOnUser, screen);
    getMovies(currentPageOnUser, screen).then(data => console.log(data))
  }
}

