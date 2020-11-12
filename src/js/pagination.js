import Pagination from "tui-pagination"
import "tui-pagination/dist/tui-pagination.css"
import refs from './refs.js';
import getFetch from './fetch.js';
import getMoviesData from './getMoviesData.js';
import renderMain from './render-film.js';
import modalOpen from './modal.js';



export default async function(value=false, promisTotalItems) {
  const paginationKiller = document.querySelector('#pagination-wrapper');
  paginationKiller.innerHTML = '';
  paginationKiller.innerHTML = '<div id="pagination" class="tui-pagination"></div>';
  
  let page = 1;
  const screen  = document.documentElement.clientWidth;
  let buttonsOnPage = 5;
  let countOfElements = 4;
  if (screen >= 768 && screen < 1024) {
    countOfElements = 8;
    buttonsOnPage = 7;
  } else if (screen >= 1024) {
    countOfElements = 9;
    buttonsOnPage = 7;
  }

  const ref = {
    pagination: document.querySelector('#pagination'),
  }
  if (typeof(promisTotalItems) === 'object') {

    const totalItems = await promisTotalItems;
    var pagination1 = new Pagination("pagination", {
      totalItems: totalItems,
      itemsPerPage: countOfElements,
      visiblePages: buttonsOnPage,
    })
    //! перший пагінатор генеруємо при рендері main.page
    //! потрібна перевірка на ширину вікна, і передаємо ці данні в опції пагінатора
    ref.pagination.addEventListener('click', changePage);
    function changePage(event) {
    //! не корректна робота погінатора, якщо клікаємо на стрілочку в середині спана
    //! потрібно додати data атрибут
      const searchClassDisable = ([...arr]) => arr.includes('tui-is-disabled');

      console.dir(event.target);

      if(!searchClassDisable(event.target.classList)){
        if(event.target.textContent === "next") {
          page+=1;
        } else if(event.target.textContent === "prev"){
          page-=1;
        } else if(event.target.textContent === "..."){
          let arrChildren = [...event.currentTarget.children];
          let activeChildren = arrChildren.find(el => el.className == "tui-page-btn tui-is-selected");
          page = Number(activeChildren.textContent);
        } else if(event.target.textContent === "last"){
          page = Math.ceil(totalItems/countOfElements);
        } else if(event.target.textContent === "first"){
          page = 1;
        } 
        else {
          page = Number(event.target.textContent) || page;
        }
//!спостерігається проблема коли на оствнній сторінці натискаєш [>]
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
      // console.dir(calculateURIparameters());
        const QUERY = async function(obj) {
          let draftArray = [];
      //! елементи на 2(двох) сторінка на сервері --->  [FALSE]
          if(!obj.isElementsOnPageBefore) {
              await getMoviesData(getFetch(`${obj.currentPageOnServer}`, value))
                .then(data => {
                return draftArray = [...data.slice(obj.firstIndexOfElements, obj.lastIndexOfElements)]
              })
          }
          const multipleFetch = async function() {
            const pageBefore = await getMoviesData(getFetch(`${obj.currentPageOnServer-1}`, value))
              .then(data => data.slice(obj.firstIndexOfElements))
            const curentPage = await getMoviesData(getFetch(`${obj.currentPageOnServer}`, value))
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
          renderMain(draftArray);
          refs.ARR = [...draftArray];
          // modalOpen(draftArray);
        }
        QUERY(calculateURIparameters())
      }
    }
  } // закриваємо [promisTotalItems is TRUE ]
  else {
    const w_FullArray = JSON.parse(localStorage.getItem(value));
    const totalItems = w_FullArray.length;
    var pagination1 = new Pagination("pagination", {
      totalItems: totalItems,
      itemsPerPage: countOfElements,
      visiblePages: buttonsOnPage,
    })
    ref.pagination.addEventListener('click', changePageMyLibrary);
    function changePageMyLibrary(event) {
      const searchClassDisable = ([...arr]) => arr.includes('tui-is-disabled');
      if(!searchClassDisable(event.target.classList)){
        if(event.target.textContent === "next") {
          page+=1;
        } else if(event.target.textContent === "prev"){
          page-=1;
        } else if(event.target.textContent === "..."){
          let arrChildren = [...event.currentTarget.children];
          let activeChildren = arrChildren.find(el => el.className == "tui-page-btn tui-is-selected");
          page = Number(activeChildren.textContent);
        } else if(event.target.textContent === "last"){
          page = Math.ceil(totalItems/countOfElements);
        } else if(event.target.textContent === "first"){
          page = 1;
        } 
        else {
          page = Number(event.target.textContent) || page;
        }
      }
      let draftArray = [];
      let lastIndexOfElements = page*countOfElements;
      let firstIndexOfElements = lastIndexOfElements-countOfElements;
      draftArray = [...w_FullArray.slice(firstIndexOfElements, lastIndexOfElements)]

      renderMain(draftArray);
      refs.ARR = [...draftArray];
      // modalOpen(draftArray);
    } // закриваємо [promisTotalItems is FALSE ]
  }
}

