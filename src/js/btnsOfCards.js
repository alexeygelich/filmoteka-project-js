import btnsFromLocalStorage from "./localStorage";
import debounce from "../../node_modules/lodash.debounce/";
import refs from "./refs.js";

export default function () {
  let watched = JSON.parse(localStorage.getItem(`w`)) || [];
  let queue = JSON.parse(localStorage.getItem(`q`)) || [];
  const filmList = document.querySelector(".film-list");
  let idOfItems = [];
  const debounceForCards = function (event) {
    if (event.target.className !== "wrap-for-btns") {
      return;
    }
    if (idOfItems.includes(event.target.getAttribute("data-id"))) {
      return;
    }
    idOfItems.push(event.target.getAttribute("data-id"));

    let targetForStorage = event.target;
    let idForStorage = targetForStorage.getAttribute("data-id");

    const watchedBtn = document.querySelector(
      `[data-id="${idForStorage}"] .first-backdrop`
    );

    const queueBtn = document.querySelector(
      `[data-id="${idForStorage}"] .second-backdrop`
    );

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

    const wrapForBtns = document.querySelector(
      `[data-id="${idForStorage}"] .wrap-for-btns`
    );

    if (event.target === wrapForBtns) {
      watched.forEach((element) => {
        if (element.id === +idForStorage) {
          watchedBtn.textContent = "REMOVE FROM WATCHED";
        }
      });

      queue.forEach((element) => {
        if (element.id === +idForStorage) {
          queueBtn.textContent = "REMOVE FROM QUEUE";
        }
      });
    }
  };
  filmList.addEventListener("mouseover", debounce(debounceForCards, 200));
}
