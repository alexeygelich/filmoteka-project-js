import refs from './refs.js';

export default function(page = 1, screen = 'desktop', searchValue) {


// export default function(page = 1, searchValue = false) {

  return new Promise((resolve, reject)=>{
    
    // if(!searchValue) {
    //   resolve(
    //     fetch(`${refs.defaultURL}?api_key=${refs.API}&page=${page}`)
    //     .then(data => data.json())
        //! .then(json => {console.log(json.results); return json})
    //     .then(json => {
    //       if (json.results.length){
    //         return json.results
    //       } 
    //       return "errrr"
    //     })
    //     .catch('error')
    //   )
    // }
    // if(searchValue) {
    //   fetch(`${refs.defaultSearch}?api_key=${refs.API}&page=${page}&query=zapros&page=1&include_adult=false`)
    // }
  // })

  if(!searchValue) {
 
      fetch(`${refs.defaultURL}?api_key=${refs.API}&page=${page}`)
        .then(data => data.json())
        .then(json => {console.log(json.results); return json})
  //     .then(json => {
  //       if (json.results.length){
  //         return json.results
  //       } 
  //       return "errrr"
  //     })
  //     .catch('error')

  }
  // if(searchValue) {
  //   fetch(`${refs.defaultSearch}?api_key=${refs.API}&page=${page}&query=zapros&page=1&include_adult=false`)

  // }

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

  console.dir(calculateURIparameters());


 
  const QUERY = async function(obj) {
    const draftArray = [];
    
    
    if(!obj.isElementsOnPageBefore) {
      await fetch(`${refs.defaultURL}?api_key=${refs.API}&page=${obj.currentPageOnServer}`)
        .then(data => data.json())
        .then(json => {
          draftArray.push(json.results.slice(obj.firstIndexOfElements, obj.lastIndexOfElements));
        })
    }

    const multipleFetch = async function() {
      const pageBefore = await fetch(`${refs.defaultURL}?api_key=${refs.API}&page=${obj.currentPageOnServer-1}`)
        .then(data => data.json())
        .then(json => json.results.slice(obj.firstIndexOfElements));

      const curentPage = await fetch(`${refs.defaultURL}?api_key=${refs.API}&page=${obj.currentPageOnServer}`)
        .then(data => data.json())
        .then(json => json.results.slice(0, obj.lastIndexOfElements));
    
      return Promise.all([pageBefore, curentPage])
    }
    if(obj.isElementsOnPageBefore) {
      await multipleFetch()
        .then(data => {
          data.forEach(el => draftArray.push(...el));
        })

    }
    return draftArray;
  }
  resolve(QUERY(calculateURIparameters()))


  })
}






