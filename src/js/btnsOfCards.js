import btnsFromLocalStorage from "./localStorage";
import debounce from "../../node_modules/lodash.debounce/";
import refs from "./refs.js";

export default function () {
  let watched = JSON.parse(localStorage.getItem(`w`)) || [];
  let queue = JSON.parse(localStorage.getItem(`q`)) || [];
  const filmList = document.querySelector(".film-list");
  let idOfItems = [];

  const debounceForCards = function (event) {
    watched = JSON.parse(localStorage.getItem(`w`)) || [];
    queue = JSON.parse(localStorage.getItem(`q`)) || [];
    let targetForStorage = event.target;
    let idForStorage = targetForStorage.getAttribute("data-id");
    const wrapForBtns = document.querySelector(
      `[data-id="${idForStorage}"] .wrap-for-btns`
    );

    const watchedBtn = document.querySelector(
      `[data-id="${idForStorage}"] .first-backdrop`
    );

    const queueBtn = document.querySelector(
      `[data-id="${idForStorage}"] .second-backdrop`
    );
    let isActive = false;
    if (event.target === wrapForBtns) {
      if (watched.length === 0) {
        refs.langChoise.dataset.id==='en' ? watchedBtn.textContent = "ADD TO WATCHED" : watchedBtn.textContent = "ДОБАВИТЬ В ПРОСМОТРЕННЫЕ";
      }
      watched.forEach((element) => {
        if (element.id === +idForStorage) {
          refs.langChoise.dataset.id==='en' ? watchedBtn.textContent = "REMOVE FROM WATCHED" : watchedBtn.textContent = "УБРАТЬ ИЗ ПРОСМОТРЕННЫХ";
          isActive = true;
        }
        if (!isActive) {
          refs.langChoise.dataset.id==='en' ? watchedBtn.textContent = "ADD TO WATCHED" : watchedBtn.textContent = "ДОБАВИТЬ В ПРОСМОТРЕННЫЕ";
        }
      });
      if (queue.length === 0) {
        refs.langChoise.dataset.id==='en' ? queueBtn.textContent = "ADD TO QUEUE" :  queueBtn.textContent = "ДОБАВИТЬ В ОЧЕРЕДЬ";
      }
      queue.forEach((element) => {
        if (element.id === +idForStorage) {
          refs.langChoise.dataset.id==='en' ? queueBtn.textContent = "REMOVE FROM QUEUE" : queueBtn.textContent = "УБРАТЬ ИЗ ОЧЕРЕДИ";
          isActive = true;
        }
        if (!isActive) {
          refs.langChoise.dataset.id==='en' ? queueBtn.textContent = "ADD TO QUEUE" : queueBtn.textContent = "ДОБАВИТЬ В ОЧЕРЕДЬ";
        }
      });
    }

    if (event.target.className !== "wrap-for-btns") {
      return;
    }

    if (idOfItems.includes(event.target.getAttribute("data-id"))) {
      return;
    }

    idOfItems.push(event.target.getAttribute("data-id"));

    watchedBtn.addEventListener(`click`, () => {
      btnsFromLocalStorage(
        refs.ARR.find((el) => el.id === +idForStorage),
        watchedBtn,
        queueBtn,
        1
      );
    });

    queueBtn.addEventListener("click", () => {
      btnsFromLocalStorage(
        refs.ARR.find((el) => el.id === +idForStorage),
        watchedBtn,
        queueBtn,
        2
      );
    });
  };
  filmList.addEventListener("mouseover", debounce(debounceForCards, 10));
}
