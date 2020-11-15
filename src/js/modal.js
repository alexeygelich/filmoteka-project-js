import localStorage from "./localStorageForModal.js";
import modalTemplate from "./templates/modalTemplate-new.hbs"
import modalTemplateRu from "./templates/modalTemplate-new_rus.hbs"
//import localStorage from "./localStorage"
import refs from "./refs.js"
import trailer from "./trailers"
import onShareBtnClick from "./shareButtons.js"

export default function (ID) {
  let test = refs.ARR.find((el) => el.id === ID)

  const filmModal = document.querySelector(".modal-section")
  if (refs.langChoise.dataset.id === "en") {
    filmModal.innerHTML = modalTemplate(test)
  }
  if (refs.langChoise.dataset.id === "ru") {
    filmModal.innerHTML = modalTemplateRu(test)
  }
  const shareBtns = document.querySelector(".modal-share-btns")
  shareBtns.addEventListener("click", (e) => {
    // e.preventDefault()
    onShareBtnClick(e, test)
  })

  document.body.classList.add("stop-scroll")
  const modalOn = document.querySelector(".backdrop")
  modalOn.classList.remove("is-hidden")

  localStorage(test)

  const trailerRef = document.querySelector(".trailer-btn")

  trailerRef.addEventListener("click", () => {
    trailer(test.title, test.release_date)
  })

  const onEscapeClose = function (e) {
    if (e.key === "Escape") {
      modalOn.classList.add("is-hidden")
      document.body.classList.remove("stop-scroll")
      window.removeEventListener("keydown", onEscapeClose)
    }
  }
  window.addEventListener("keydown", onEscapeClose)
  modalOn.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      window.removeEventListener("keydown", onEscapeClose)
      document.body.classList.remove("stop-scroll")
      modalOn.classList.add("is-hidden")
    }
  })
  const closeBtn = document.querySelector(".close-modal-btn")
  closeBtn.addEventListener("click", (e) => {
    window.removeEventListener("keydown", onEscapeClose)
    document.body.classList.remove("stop-scroll")
    modalOn.classList.add("is-hidden")
  })
}
