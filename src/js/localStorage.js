import { error } from "../../node_modules/@pnotify/core";
import "../../node_modules/@pnotify/core/dist/BrightTheme.css";
import "../../node_modules/@pnotify/core/dist/PNotify.css";
export default function (data) {
  console.log(data);
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

  const addToLocalStorageWatched = function () {
    if (watched.includes(data)) {
      notificationFn();
      return;
    }
    watched.push(data);
    let watchedStr = JSON.stringify(watched);
    localStorage.setItem(`w`, watchedStr);
  };

  const addToLocalStorageQueue = function () {
    if (queue.includes(data)) {
      notificationFn();
      return;
    }
    queue.push(data);
    let queueStr = JSON.stringify(queue);
    localStorage.setItem(`q`, queueStr);
  };

  addToWatched.addEventListener(`click`, addToLocalStorageWatched);
  addToQueue.addEventListener("click", addToLocalStorageQueue);
}
