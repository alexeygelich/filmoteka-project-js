import fetchData from "./fetch.js";


const error = document.querySelector(".search-error");

export const search = function (value) {

    return fetchData(1, value);
    
};
