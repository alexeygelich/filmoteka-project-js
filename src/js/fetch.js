import refs from './refs.js';

export default function(page = 1, screen = 'desktop', searchValue) {

  //максимальна кількість елементів на екрані 
  let countOfElements = 0;
  switch(screen) {
    case 'mobile': 
      countOfElements = 4;
      break;
    case 'tablet':
      countOfElements = 8;
      break;
    case 'desktop':
      countOfElements = 9;
  }
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
          } else {
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

  // console.dir(calculateURIparameters());


 
  const draftArray = [];
  const QUERY = function(obj) {
    if(!obj.isElementsOnPageBefore) {
      fetch(`${refs.defaultURL}?api_key=${refs.API}&page=${obj.currentPageOnServer}`)
        .then(data => data.json())
        .then(json => {
          draftArray.push(json.results.slice(obj.firstIndexOfElements, obj.lastIndexOfElements));
        })
    }
    const multipleFetch = function() {
      const pageBefore = fetch(`${refs.defaultURL}?api_key=${refs.API}&page=${obj.currentPageOnServer-1}`)
        .then(data => data.json())
        .then(json => json.results.slice(obj.firstIndexOfElements));

      const curentPage = fetch(`${refs.defaultURL}?api_key=${refs.API}&page=${obj.currentPageOnServer}`)
        .then(data => data.json())
        .then(json => json.results.slice(0, obj.lastIndexOfElements));
    
      return Promise.all([pageBefore, curentPage])
    }
    if(obj.isElementsOnPageBefore) {
      multipleFetch()
        .then(data => {
          data.forEach(el => draftArray.push(...el));
        })
        
        
    }

  }
  QUERY(calculateURIparameters())
  return draftArray 

 
}






