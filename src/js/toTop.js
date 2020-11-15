import refs from './refs.js';

window.addEventListener('scroll', scroll);
function scroll(event) {
  const targetClassList = [...refs.toTop.classList];
  if(event.currentTarget.scrollY>400 && targetClassList.includes("hide")) {
    refs.toTop.classList.remove('hide');
  }
  if(event.currentTarget.scrollY<=400 && !targetClassList.includes("hide")){
    refs.toTop.classList.add('hide');
  }
  // console.log(event.currentTarget.scrollY);
}
refs.toTop.addEventListener('click', toTop);
function toTop(event) {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
});
}

