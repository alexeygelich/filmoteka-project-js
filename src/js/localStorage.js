import { error, success } from "../../node_modules/@pnotify/core";
import "../../node_modules/@pnotify/core/dist/BrightTheme.css";
import "../../node_modules/@pnotify/core/dist/PNotify.css";
import renderFilm from "./render-film.js";

export default function (data, watchedBtn, queueBtn) {
  console.log(data);
  console.log(watchedBtn);
  console.log(queueBtn);
  const myLibraryLink = document.querySelector(".lib-link");

  let watched = JSON.parse(localStorage.getItem(`w`)) || [];

  let queue = JSON.parse(localStorage.getItem(`q`)) || [];

  const notificationFn = () => {
    const myNotice = error({
      title: "You successfully removed movie !",
      text: "",
      delay: 1200,
    });
  };
  const notificationGood = () => {
    const myNoticeGood = success({
      title: "You added this movie !",
      text: "Enjoy watching the movie !",
      delay: 1200,
    });
  };
  let indexOfElW = 0;
  let indexOfElQ = 0;
  const checkForBtn = function () {
    watched.forEach((element, i) => {
      if (element.id === data.id) {
        watchedBtn.textContent = "REMOVE FROM WATCHED";
        indexOfElW = i;
      }
    });

    queue.forEach((element, i) => {
      if (element.id === data.id) {
        queueBtn.textContent = "REMOVE FROM QUEUE";
        indexOfElQ = i;
      }
    });
  };
  checkForBtn();

  const addToLocalStorageWatched = function () {
    if (watchedBtn.textContent === "REMOVE FROM WATCHED") {
      watched.splice(indexOfElW, 1);
      localStorage.setItem(`w`, JSON.stringify(watched));
      watchedBtn.textContent = "ADD TO WATCHED";
      checkForBtn();
      notificationFn();
      if (myLibraryLink.classList.contains("current")) {
        renderFilm(watched);
      }
    } else {
      watched.push(data);
      let watchedStr = JSON.stringify(watched);
      localStorage.setItem(`w`, watchedStr);
      notificationGood();
      checkForBtn();
      if (myLibraryLink.classList.contains("current")) {
        renderFilm(watched);
      }
    }
  };
  const addToLocalStorageQueue = function () {
    if (queueBtn.textContent === "REMOVE FROM QUEUE") {
      queue.splice(indexOfElQ, 1);
      localStorage.setItem(`q`, JSON.stringify(queue));
      queueBtn.textContent = "ADD TO QUEUE";
      checkForBtn();
      notificationFn();
      if (myLibraryLink.classList.contains("current")) {
        renderFilm(queue);
      }
    } else {
      queue.push(data);
      let queueStr = JSON.stringify(queue);
      localStorage.setItem(`q`, queueStr);
      notificationGood();
      checkForBtn();
      if (myLibraryLink.classList.contains("current")) {
        renderFilm(queue);
      }
    }
  };

  watchedBtn.addEventListener(`click`, addToLocalStorageWatched);
  queueBtn.addEventListener("click", addToLocalStorageQueue);
}
