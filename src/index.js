import './sass/main.scss';

import getMovies from './js/fetch.js';

const dom = {
  buttons: document.querySelector('.buttons'),
  span: document.querySelector('span'),
  outField: document.querySelector('#out-field')
}
const fgdsfg = '';
window.onload = function(event) {
  console.log(event.currentTarget.innerWidth);
  if (event.currentTarget.innerWidth > 1000) {
    const draftArray = getMovies(1, 'desktop');
    console.log(draftArray);
  }
  if (event.currentTarget.innerWidth > 700 && event.currentTarget.innerWidth < 1000) {
    const draftArray = getMovies(1, 'tablet');
    console.log(draftArray);
  }
  if (event.currentTarget.innerWidth < 700) {
    
      // const draftArray = async function() {
      //   const arr = await getMovies(1, 'mobile').then(data => console.dir(data))
        
      // }
      
    const testt = getMovies(1, 'mobile')
    console.log(testt);
      
      
     
         
         
            
  
    
    
  }
}

dom.buttons.addEventListener('click', changePage)

function changePage(event) {
 console.log(event);
}

