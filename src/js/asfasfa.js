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

    if (event.target === wrapForBtns) {
      if (watched.length === 0) {
        watchedBtn.textContent = "ADD TO WATCHED";
      }
      watched.forEach((element) => {
        if (element.id === +idForStorage) {
          watchedBtn.textContent = "REMOVE FROM WATCHED";
        } else {
          watchedBtn.textContent = "ADD TO WATCHED";
        }
      });
      if (queue.length === 0) {
        queueBtn.textContent = "ADD TO QUEUE";
      }
      queue.forEach((element) => {
        if (element.id === +idForStorage) {
          queueBtn.textContent = "REMOVE FROM QUEUE";
        } else {
          queueBtn.textContent = "ADD TO QUEUE";
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
  filmList.addEventListener("mouseover", debounce(debounceForCards, 200));
}
