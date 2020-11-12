import { error, success } from "../../node_modules/@pnotify/core";
import "../../node_modules/@pnotify/core/dist/BrightTheme.css";
import "../../node_modules/@pnotify/core/dist/PNotify.css";
export default function (data) {
  const addToWatched = document.querySelector(".first");
  const addToQueue = document.querySelector(".second");

  const watched = JSON.parse(localStorage.getItem(`w`)) || [];
  const queue = JSON.parse(localStorage.getItem(`q`)) || [];

  const notificationFn = () => {
    const myNotice = error({
      title: "You already added this movie !",
      text: "Please choose another one !",
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

  const addToLocalStorageWatched = function () {
    let isUniq = true;
    watched.forEach((element) => {
      if (element.id === data.id) {
        isUniq = false;
      }
    });
    if (isUniq) {
      watched.push(data);
      let watchedStr = JSON.stringify(watched);
      localStorage.setItem(`w`, watchedStr);
      notificationGood();
    } else {
      notificationFn();
    }
  };

  const addToLocalStorageQueue = function () {
    let isUniq = true;
    queue.forEach((element) => {
      if (element.id === data.id) {
        isUniq = false;
      }
    });
    if (isUniq) {
      queue.push(data);
      let queueStr = JSON.stringify(queue);
      localStorage.setItem(`q`, queueStr);
      notificationGood();
    } else {
      notificationFn();
    }
  };

  addToWatched.addEventListener(`click`, addToLocalStorageWatched);
  addToQueue.addEventListener("click", addToLocalStorageQueue);
}
