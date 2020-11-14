import refs from "./refs.js"

export default function (event, movie) {
  const url = `http://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`
  const telegramBtn = document.getElementById("#telegram")
  const twitterBtn = document.getElementById("#twitter")
  const facebookmBtn = document.getElementById("#facebook")
  let text

  event.path.forEach((el) => {
    if (el.nodeName === "A") {
      switch (el.id) {
        case "#telegram":
          if (refs.langChoise.dataset.id === "en") {
            text = `Hey, friend! Check this movie: 🎬 ${movie.title} 🎬 || Summary: ${movie.overview} || Rating - ${movie.vote_average} ⭐️ || For more info visit: ${document.URL}`
          } else {
            text = `Зацени фильм: 🎬 ${movie.title} 🎬 || ${movie.vote_average} ⭐️ Описание: ${
              movie.overview.split(". ")[0]
            }... Больше информации тут: ${document.URL}`
          }
          telegramBtn.href = `https://t.me/share/url?url=${url}&text=${text}`
          break
        case "#twitter":
          if (refs.langChoise.dataset.id === "en") {
            text = `Hey, friends! You must see this: ${movie.title} 🎬. More info: ${document.URL}`
          } else {
            text = `Советую посмотреть: ${movie.title}🎬. Больше инфы тут: ${document.URL}`
          }
          twitterBtn.href = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
          break
        case "#facebook":
          facebookmBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${document.URL}`
          break
      }
    }
  })
}
