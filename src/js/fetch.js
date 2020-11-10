import refs from './refs.js';

export default function(page = 1, searchValue = false) {

  return new Promise((resolve, reject)=>{

    if(!searchValue) {
      fetch(`${refs.defaultURL}?api_key=${refs.API}&page=${page}`)
      .then(data => {
        if(!data.ok) {
          reject(new Error(`Помилка в запиті до сервера  [error code - ${data.status}]`))
        }
        return data
      })
      .then(data => data.json())
      .then(json => {
        if (json.results.length>0){
          return json.results
        } 
        throw 'Масив з данними пустий [запит виконано]';
      })
      .then(json => resolve(json))
      .catch(data => reject(data))
    }
    if(searchValue) {
      fetch(`${refs.defaultSearch}?api_key=${refs.API}&page=${page}&query=zapros&page=1&include_adult=false`)
      
    
    
    
    
    
    }
  })

  
}






