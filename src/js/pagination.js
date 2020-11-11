// import Paginator from "paginator"
// import Pagination from "tui-pagination"
import Pagination from "tui-pagination"
import "tui-pagination/dist/tui-pagination.css"
import refs from './refs.js';
import getFetch from './fetch.js';

import getMoviesData from './getMoviesData.js';
import {renderMain} from './render-film.js';


//! перший пагінатор генеруємо при рендері main.page
//! потрібна перевірка на ширину вікна, і передаємо ці данні в опції пагінатора
var pagination1 = new Pagination("pagination", {
  totalItems: 10000,
  itemsPerPage: 8,
  visiblePages: 7,
})

const ref = {
  pagination: document.querySelector('#pagination'),
}
ref.pagination.addEventListener('click', changePage);
let page = 1;

function changePage(event, searchValue=false) {
  // console.log(event.target);
//! не корректна робота погінатора, якщо клікаємо на стрілочку в середині спана
//! потрібно додати data атрибут
  const searchClassDisable = ([...arr]) => arr.includes('tui-is-disabled');
  // console.log(searchClassDisable(event.target.classList));
  if(!searchClassDisable(event.target.classList)){

  const screen  = event.view.innerWidth;
  let countOfElements = 4;
  if (screen > 768 && screen < 1200) {
    countOfElements = 8
  } else if (screen > 1200) {
    countOfElements = 9
  }
  // const searchClassDisable = ([...arr]) => arr.includes('tui-is-disabled');
  // if(!searchClassDisable(event.target.classList)){
    if(event.target.textContent === "next") {
      page+=1;
    } else if(event.target.textContent === "prev"){
      page-=1;
    } else if(event.target.textContent === "..."){
      let arrChildren = [...event.currentTarget.children];
      let activeChildren = arrChildren.find(el => el.className == "tui-page-btn tui-is-selected");
      page = Number(activeChildren.textContent);
    } else if(event.target.textContent === "last"){
      page = 10000/countOfElements;
    } else if(event.target.textContent === "first"){
      page = 1;
    } 
    else {
      page = Number(event.target.textContent) || page;
    }
  // } 
  const calculateURIparameters = function() {
    const URIparameters = {
      currentPageOnServer: 1,
      ElementsOnCurrentPage: 0,
      isElementsOnPageBefore: false,
      ElementsOnPageBefore: 0,
      firstIndexOfElements: 0,
      lastIndexOfElements: 0,
      };
      function go(obj) {
        if (page*countOfElements > 20) {
          this.currentPageOnServer = Math.ceil(page*countOfElements/20); 
          this.ElementsOnCurrentPage = page*countOfElements%20; 
          if (this.ElementsOnCurrentPage>=countOfElements) {
            this.firstIndexOfElements = this.ElementsOnCurrentPage-countOfElements; 
            this.lastIndexOfElements = this.ElementsOnCurrentPage;
          } else if (this.ElementsOnCurrentPage === 0){
            this.firstIndexOfElements = 20-countOfElements;
            this.lastIndexOfElements = 20;
          }
            else {
            this.isElementsOnPageBefore = true;
            this.ElementsOnPageBefore = countOfElements-this.ElementsOnCurrentPage;
            this.firstIndexOfElements = 20-this.ElementsOnPageBefore;
            this.lastIndexOfElements = this.ElementsOnCurrentPage;
          }
        } else {
          this.lastIndexOfElements = page*countOfElements;
          this.lastIndexOfElements-countOfElements<0 ? this.firstIndexOfElements = 0 : this.firstIndexOfElements = this.lastIndexOfElements-countOfElements;
        }
        return obj
      }
    return go.call(URIparameters, URIparameters)
  }
  //---обчислений об'єкт з параметрами URI---
  //console.dir(calculateURIparameters());
    const QUERY = async function(obj) {
      let draftArray = [];
  //! елементи на 2(двох) сторінка на сервері --->  [FALSE]
      if(!obj.isElementsOnPageBefore) {
          await getMoviesData(getFetch(`${obj.currentPageOnServer}`))
            .then(data => {
            return draftArray = [...data.slice(obj.firstIndexOfElements, obj.lastIndexOfElements)]
          })
      }
      const multipleFetch = async function() {
        const pageBefore = await getMoviesData(getFetch(`${obj.currentPageOnServer-1}`))
          .then(data => data.slice(obj.firstIndexOfElements))
        const curentPage = await getMoviesData(getFetch(`${obj.currentPageOnServer}`))
          .then(data => data.slice(0, obj.lastIndexOfElements))
        return [pageBefore, curentPage]
      }
  //! елементи на 2(двох) сторінка на сервері --->  [TRUE]
      if(obj.isElementsOnPageBefore) {
         await multipleFetch()
          .then(data => {
            data.forEach(el => draftArray.push(...el));
          })
      }
      renderMain(draftArray)
    }
    QUERY(calculateURIparameters())
  }
}
