const arrRender = function (arrFilmList) {
  let newArrList = [];

  document.documentElement.clientWidth < 767
    ? (newArrList = arrFilmList.slice(0, 4))
    : '';
  document.documentElement.clientWidth >= 768 &&
  document.documentElement.clientWidth < 1024
    ? (newArrList = arrFilmList.slice(0, 8))
    : '';
  document.documentElement.clientWidth >= 1024
    ? (newArrList = arrFilmList.slice(0, 9))
    : '';

  return newArrList;
};



export default arrRender;
