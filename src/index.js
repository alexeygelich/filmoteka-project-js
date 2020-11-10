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
    const draftArray = getMovies(1, screen);
    console.log(draftArray);
  }
  if (event.currentTarget.innerWidth > 700 && event.currentTarget.innerWidth < 1000) {
    screen = 'tablet';
    const draftArray = getMovies(1, screen);
    console.log(draftArray);
  }
  if (event.currentTarget.innerWidth < 700) {
    // const draftArray = async function() {
    //   const arr = await getMovies(1, 'mobile').then(data => console.dir(data))
    // }
    screen = 'mobile';
    const draftArray = getMovies(1, screen);
    console.log(draftArray);
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
    const draftArray = getMovies(currentPageOnUser, screen);
    console.log(draftArray);
  }
  if (event.target.dataset.name == 'left') {
    currentPageOnUser-=1
    dom.span.innerText = currentPageOnUser;

    console.log(currentPageOnUser, screen);
    const draftArray = getMovies(currentPageOnUser, screen);
    console.log(draftArray);
  }
}

