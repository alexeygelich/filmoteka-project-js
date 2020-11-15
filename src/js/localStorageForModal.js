import { error, success } from "../../node_modules/@pnotify/core";
import "../../node_modules/@pnotify/core/dist/BrightTheme.css";
import "../../node_modules/@pnotify/core/dist/PNotify.css";
import renderFilm from "./render-film.js";
import arrForRender from "./arr-for-render.js";
import refs from './refs';

export default function (data) {
  const addToWatched = document.querySelector(".first");
  const addToQueue = document.querySelector(".second");
  const myLibraryLink = document.querySelector(".lib-link");

  let watched = JSON.parse(localStorage.getItem(`w`)) || [];

  let queue = JSON.parse(localStorage.getItem(`q`)) || [];

  const notificationFn = () => {
    const myNotice = error({
      title: refs.langChoise.dataset.id==='en' ? "You successfully removed movie !" : "Вы успешно удалили фильм !",
      text: "",
      delay: 1200,
    });
  };
  const notificationGood = () => {
    const myNoticeGood = success({
      title: refs.langChoise.dataset.id==='en' ? "You added this movie !" : "Вы успешно добавили фильм !",
      text: refs.langChoise.dataset.id==='en' ? "Enjoy watching the movie !" : "Хорошего просмотра !" ,
      delay: 1200,
    });
  };
  let indexOfElW = 0;
  let indexOfElQ = 0;
  const checkForBtn = function () {
    watched.forEach((element, i) => {
      if (element.id === data.id) {
        refs.langChoise.dataset.id==='en' ? addToWatched.textContent = "REMOVE FROM WATCHED" :addToWatched.textContent = "УБРАТЬ ИЗ ПРОСМОТРЕННЫХ";
        indexOfElW = i;
      }
    });

    queue.forEach((element, i) => {
      if (element.id === data.id) {
        refs.langChoise.dataset.id==='en' ? addToQueue.textContent = "REMOVE FROM QUEUE" : addToQueue.textContent = "УБРАТЬ ИЗ ОЧЕРЕДИ";
        indexOfElQ = i;
      }
    });
  };
  checkForBtn();

  const addToLocalStorageWatched = function () {
    if (addToWatched.textContent === "REMOVE FROM WATCHED" || addToWatched.textContent === "УБРАТЬ ИЗ ПРОСМОТРЕННЫХ") {
      watched.splice(indexOfElW, 1);
      localStorage.setItem(`w`, JSON.stringify(watched));
      refs.langChoise.dataset.id==='en' ? addToWatched.textContent = "ADD TO WATCHED" : addToWatched.textContent = "ДОБАВИТЬ В ПРОСМОТРЕННЫЕ";
      checkForBtn();
      notificationFn();
      if (myLibraryLink.classList.contains("current")) {
        renderFilm(arrForRender(watched));
      }
    } else {
      watched.push(data);
      let watchedStr = JSON.stringify(watched);
      localStorage.setItem(`w`, watchedStr);
      notificationGood();
      checkForBtn();
      if (myLibraryLink.classList.contains("current")) {
        renderFilm(arrForRender(watched));
      }
    }
  };
  const addToLocalStorageQueue = function () {
    if (addToQueue.textContent === "REMOVE FROM QUEUE" || addToQueue.textContent === "УБРАТЬ ИЗ ОЧЕРЕДИ") {
      queue.splice(indexOfElQ, 1);
      localStorage.setItem(`q`, JSON.stringify(queue));
      refs.langChoise.dataset.id==='en' ? addToQueue.textContent = "ADD TO QUEUE" : addToQueue.textContent = "ДОБАВИТЬ В ОЧЕРЕДЬ";
      checkForBtn();
      notificationFn();
      if (myLibraryLink.classList.contains("current")) {
        renderFilm(arrForRender(queue));
      }
    } else {
      queue.push(data);
      let queueStr = JSON.stringify(queue);
      localStorage.setItem(`q`, queueStr);
      notificationGood();
      checkForBtn();
      if (myLibraryLink.classList.contains("current")) {
        renderFilm(arrForRender(queue));
      }
    }
  };

  addToWatched.addEventListener(`click`, addToLocalStorageWatched);
  addToQueue.addEventListener("click", addToLocalStorageQueue);
}