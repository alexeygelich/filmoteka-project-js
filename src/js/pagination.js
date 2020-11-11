// import Paginator from "paginator"
// import Pagination from "tui-pagination"
import Pagination from "tui-pagination"
import "tui-pagination/dist/tui-pagination.css"
import refs from './refs.js';
import objRender from './render-film-copy.js';

// console.log(objRender.renderMain());



//! перший пагінатор генеруємо при рендері main.page
//! потрібна перевірка на ширину вікна, і передаємо ці данні в опції пагінатора
var pagination1 = new Pagination("pagination", {
  totalItems: 10000,
  itemsPerPage: 8,
  visiblePages: 7,
})

const ref = {
  pagination: document.querySelector('#pagination'),
}
ref.pagination.addEventListener('click', someFunc);
let page = 1;
function someFunc(event, searchValue=false) {
  const screen  = event.view.innerWidth;
  let countOfElements = 4;
  if (screen > 768 && screen < 1200) {
    countOfElements = 8
  } else if (screen > 1200) {
    countOfElements = 9
  }

  if(event.target.textContent === "next") {
    page+=1;
  } else if(event.target.textContent === "prev"){
    page-=1;
  } else if(event.target.textContent === "..."){
    let arrChildren = [...event.currentTarget.children];
    let activeChildren = arrChildren.find(el => el.className == "tui-page-btn tui-is-selected");
    page = Number(activeChildren.textContent);
  } else if(event.target.textContent === "last"){
    page = 10000/countOfElements;
  } else if(event.target.textContent === "first"){
    page = 1;
  } else {
    page = Number(event.target.textContent);
  }

  const calculateURIparameters = function() {
    const URIparameters = {
      currentPageOnServer: 1,
      ElementsOnCurrentPage: 0,
      isElementsOnPageBefore: false,
      ElementsOnPageBefore: 0,
      firstIndexOfElements: 0,
      lastIndexOfElements: 0,
      };
      function go(obj) {
        if (page*countOfElements > 20) {
          this.currentPageOnServer = Math.ceil(page*countOfElements/20); 
          this.ElementsOnCurrentPage = page*countOfElements%20; 
          if (this.ElementsOnCurrentPage>=countOfElements) {
            this.firstIndexOfElements = this.ElementsOnCurrentPage-countOfElements; 
            this.lastIndexOfElements = this.ElementsOnCurrentPage;
          } else if (this.ElementsOnCurrentPage === 0){
            this.firstIndexOfElements = 20-countOfElements;
            this.lastIndexOfElements = 20;
          }
            else {
            this.isElementsOnPageBefore = true;
            this.ElementsOnPageBefore = countOfElements-this.ElementsOnCurrentPage;
            this.firstIndexOfElements = 20-this.ElementsOnPageBefore;
            this.lastIndexOfElements = this.ElementsOnCurrentPage;
          }
        } else {
          this.lastIndexOfElements = page*countOfElements;
          this.lastIndexOfElements-countOfElements<0 ? this.firstIndexOfElements = 0 : this.firstIndexOfElements = this.lastIndexOfElements-countOfElements;
        }
        return obj
      }
    return go.call(URIparameters, URIparameters)
  }
  //обчислений об'єкт з параметрами URI
  // console.dir(calculateURIparameters());

    const QUERY = async function(obj) {
      let draftArray = [];

  //! елементи на 2(двох) сторінка на сервері --->  [FALSE]
      if(!obj.isElementsOnPageBefore) {
        await fetch(`${refs.defaultURL}?api_key=${refs.API}&page=${obj.currentPageOnServer}`)
          .then(data => data.json())
          .then(json => {
            draftArray = [...json.results.slice(obj.firstIndexOfElements, obj.lastIndexOfElements)];
          })
      }
      const multipleFetch = async function() {
        const pageBefore = await fetch(`${refs.defaultURL}?api_key=${refs.API}&page=${obj.currentPageOnServer-1}`)
          .then(data => data.json())
          .then(json => json.results.slice(obj.firstIndexOfElements));
        const curentPage = await fetch(`${refs.defaultURL}?api_key=${refs.API}&page=${obj.currentPageOnServer}`)
          .then(data => data.json())
          .then(json => json.results.slice(0, obj.lastIndexOfElements));
        return Promise.all([pageBefore, curentPage])
      }
  //! елементи на 2(двох) сторінка на сервері --->  [TRUE]
      if(obj.isElementsOnPageBefore) {
        await multipleFetch()
          .then(data => {
            data.forEach(el => draftArray.push(...el));
          })
      }
      return draftArray;
    }
    QUERY(calculateURIparameters()).then(data => objRender.renderMain(data));
    // console.log(QUERY(calculateURIparameters()));

}

// возможность переключатся по страницам как вперед так и в противоположном направлении ( при клике на вкладку  HOME или MY LIBRARY   возвращает на первую страницу )

// Найти подходящий плагин для пагинации, разобраться с документацией. Дальше нужно принять решение использовать ли плагин исходя из наших фетчей или делать пагинацию самостоятельно

// const arr = [
//   {
//     popularity: 3778.011,
//     vote_count: 60,
//     video: false,
//     poster_path: "/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg",
//     id: 635302,
//     adult: false,
//     backdrop_path: "/xoqr4dMbRJnzuhsWDF3XNHQwJ9x.jpg",
//     original_language: "ja",
//     original_title: "劇場版「鬼滅の刃」無限列車編",
//     genre_ids: [16, 28, 36, 12, 14, 18],
//     title: "Demon Slayer: Kimetsu no Yaiba - The Movie: Mugen Train",
//     vote_average: 6.3,
//     overview:
//       "Tanjirō Kamado, joined with Inosuke Hashibira, a boy raised by boars who wears a boar's head, and Zenitsu Agatsuma, a scared boy who reveals his true power when he sleeps, boards the Infinity Train on a new mission with the Fire Hashira, Kyōjurō Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!",
//     release_date: "2020-10-16",
//   },
//   {
//     popularity: 2403.297,
//     vote_count: 569,
//     video: false,
//     poster_path: "/betExZlgK0l7CZ9CsCBVcwO1OjL.jpg",
//     id: 531219,
//     adult: false,
//     backdrop_path: "/8rIoyM6zYXJNjzGseT3MRusMPWl.jpg",
//     original_language: "en",
//     original_title: "Roald Dahl's The Witches",
//     genre_ids: [14, 10751, 12, 35, 27],
//     title: "Roald Dahl's The Witches",
//     vote_average: 7.1,
//     overview:
//       "In late 1967, a young orphaned boy goes to live with his loving grandma in the rural Alabama town of Demopolis. As the boy and his grandmother encounter some deceptively glamorous but thoroughly diabolical witches, she wisely whisks him away to a seaside resort. Regrettably, they arrive at precisely the same time that the world's Grand High Witch has gathered.",
//     release_date: "2020-10-26",
//   },
//   {
//     popularity: 2303.555,
//     vote_count: 105,
//     video: false,
//     poster_path: "/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg",
//     id: 724989,
//     adult: false,
//     backdrop_path: "/86L8wqGMDbwURPni2t7FQ0nDjsH.jpg",
//     original_language: "en",
//     original_title: "Hard Kill",
//     genre_ids: [28, 53],
//     title: "Hard Kill",
//     vote_average: 4.8,
//     overview:
//       "The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.",
//     release_date: "2020-10-23",
//   },
//   {
//     popularity: 1832.827,
//     vote_count: 280,
//     video: false,
//     poster_path: "/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg",
//     id: 528085,
//     adult: false,
//     backdrop_path: "/5UkzNSOK561c2QRy2Zr4AkADzLT.jpg",
//     original_language: "en",
//     original_title: "2067",
//     genre_ids: [878, 53, 18],
//     title: "2067",
//     vote_average: 5,
//     overview:
//       "A lowly utility worker is called to the future by a mysterious radio signal, he must leave his dying wife to embark on a journey that will force him to face his deepest fears in an attempt to change the fabric of reality and save humankind from its greatest environmental crisis yet.",
//     release_date: "2020-10-01",
//   },
//   {
//     popularity: 1414.57,
//     vote_count: 112,
//     video: false,
//     poster_path: "/zfdhsR3Y3xw42OHrMpi0oBw0Uk8.jpg",
//     id: 741074,
//     adult: false,
//     backdrop_path: "/DA7gzvlBoxMNL0XmGgTZOyv67P.jpg",
//     original_language: "en",
//     original_title: "Once Upon a Snowman",
//     genre_ids: [16, 10751, 35, 14],
//     title: "Once Upon a Snowman",
//     vote_average: 7.5,
//     overview:
//       "The previously untold origins of Olaf, the innocent and insightful, summer-loving snowman are revealed as we follow Olaf’s first steps as he comes to life and searches for his identity in the snowy mountains outside Arendelle.",
//     release_date: "2020-10-23",
//   },
//   {
//     popularity: 1163.879,
//     vote_count: 332,
//     video: false,
//     poster_path: "/lQfdytwN7eh0tXWjIiMceFdBBvD.jpg",
//     id: 560050,
//     adult: false,
//     backdrop_path: "/htBUhLSS7FfHtydgYxUWjL3J1Q1.jpg",
//     original_language: "en",
//     original_title: "Over the Moon",
//     genre_ids: [16, 12, 10751, 14],
//     title: "Over the Moon",
//     vote_average: 7.7,
//     overview: "A girl builds a rocket to travel to the moon in hopes of meeting the legendary Moon Goddess.",
//     release_date: "2020-10-16",
//   },
//   {
//     popularity: 609.644,
//     vote_count: 32,
//     video: false,
//     poster_path: "/oAuBztpKuTIHb8nLl6miXIy0Sj9.jpg",
//     id: 499338,
//     adult: false,
//     backdrop_path: "/AuZgtWv4ZRhqD8u9JJMxTQbhz9q.jpg",
//     original_language: "en",
//     original_title: "I Believe",
//     genre_ids: [10751],
//     title: "I Believe",
//     vote_average: 6.5,
//     overview: "A 9 year old boy experiences God's power in a supernatural way.",
//     release_date: "2017-11-07",
//   },
//   {
//     popularity: 1168.976,
//     vote_count: 150,
//     video: false,
//     poster_path: "/elZ6JCzSEvFOq4gNjNeZsnRFsvj.jpg",
//     id: 741067,
//     adult: false,
//     backdrop_path: "/aO5ILS7qnqtFIprbJ40zla0jhpu.jpg",
//     original_language: "en",
//     original_title: "Welcome to Sudden Death",
//     genre_ids: [28, 53, 12, 18],
//     title: "Welcome to Sudden Death",
//     vote_average: 6.3,
//     overview:
//       "Jesse Freeman is a former special forces officer and explosives expert now working a regular job as a security guard in a state-of-the-art basketball arena. Trouble erupts when a tech-savvy cadre of terrorists kidnap the team's owner and Jesse's daughter during opening night. Facing a ticking clock and impossible odds, it's up to Jesse to not only save them but also a full house of fans in this highly charged action thriller.",
//     release_date: "2020-09-29",
//   },
//   {
//     popularity: 795.78,
//     vote_count: 481,
//     video: false,
//     poster_path: "/kPzcvxBwt7kEISB9O4jJEuBn72t.jpg",
//     id: 677638,
//     adult: false,
//     backdrop_path: "/pO1SnM5a1fEsYrFaVZW78Wb0zRJ.jpg",
//     original_language: "en",
//     original_title: "We Bare Bears: The Movie",
//     genre_ids: [10751, 16, 12, 35],
//     title: "We Bare Bears: The Movie",
//     vote_average: 7.7,
//     overview:
//       "When Grizz, Panda, and Ice Bear's love of food trucks and viral videos get out of hand, the brothers are chased away from their home and embark on a trip to Canada, where they can live in peace.",
//     release_date: "2020-06-30",
//   },
//   {
//     popularity: 982.221,
//     vote_count: 2485,
//     video: false,
//     poster_path: "/riYInlsq2kf1AWoGm80JQW5dLKp.jpg",
//     id: 497582,
//     adult: false,
//     backdrop_path: "/kMe4TKMDNXTKptQPAdOF0oZHq3V.jpg",
//     original_language: "en",
//     original_title: "Enola Holmes",
//     genre_ids: [80, 18, 9648],
//     title: "Enola Holmes",
//     vote_average: 7.5,
//     overview:
//       "While searching for her missing mother, intrepid teen Enola Holmes uses her sleuthing skills to outsmart big brother Sherlock and help a runaway lord.",
//     release_date: "2020-09-23",
//   },
//   {
//     popularity: 966.45,
//     vote_count: 772,
//     video: false,
//     poster_path: "/6agKYU5IQFpuDyUYPu39w7UCRrJ.jpg",
//     id: 740985,
//     adult: false,
//     backdrop_path: "/hbrXbVoE0NuA1ORoSGGYNASagrl.jpg",
//     original_language: "en",
//     original_title: "Borat Subsequent Moviefilm",
//     genre_ids: [35],
//     title: "Borat Subsequent Moviefilm",
//     vote_average: 6.7,
//     overview:
//       "14 years after making a film about his journey across the USA, Borat risks life and limb when he returns to the United States with his young daughter, and reveals more about the culture, the COVID-19 pandemic, and the political elections.",
//     release_date: "2020-10-23",
//   },
//   {
//     popularity: 920.299,
//     vote_count: 2795,
//     video: false,
//     poster_path: "/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
//     id: 337401,
//     adult: false,
//     backdrop_path: "/zzWGRw277MNoCs3zhyG3YmYQsXv.jpg",
//     original_language: "en",
//     original_title: "Mulan",
//     genre_ids: [28, 12, 18, 14],
//     title: "Mulan",
//     vote_average: 7.2,
//     overview:
//       "When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.",
//     release_date: "2020-09-04",
//   },
//   {
//     popularity: 921.649,
//     vote_count: 723,
//     video: false,
//     poster_path: "/sy6DvAu72kjoseZEjocnm2ZZ09i.jpg",
//     id: 581392,
//     adult: false,
//     backdrop_path: "/2nFzxaAK7JIsk6l7qZ8rFBsa3yW.jpg",
//     original_language: "ko",
//     original_title: "반도",
//     genre_ids: [28, 27, 53],
//     title: "Peninsula",
//     vote_average: 7,
//     overview:
//       "A soldier and his team battle hordes of post-apocalyptic zombies in the wastelands of the Korean Peninsula.",
//     release_date: "2020-07-15",
//   },
//   {
//     popularity: 848.009,
//     vote_count: 173,
//     video: false,
//     poster_path: "/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
//     id: 694919,
//     adult: false,
//     backdrop_path: "/pq0JSpwyT2URytdFG0euztQPAyR.jpg",
//     original_language: "en",
//     original_title: "Money Plane",
//     genre_ids: [28],
//     title: "Money Plane",
//     vote_average: 5.9,
//     overview:
//       "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
//     release_date: "2020-09-29",
//   },
//   {
//     popularity: 811.516,
//     vote_count: 591,
//     video: false,
//     poster_path: "/qzA87Wf4jo1h8JMk9GilyIYvwsA.jpg",
//     id: 539885,
//     adult: false,
//     backdrop_path: "/54yOImQgj8i85u9hxxnaIQBRUuo.jpg",
//     original_language: "en",
//     original_title: "Ava",
//     genre_ids: [28, 80, 18, 53],
//     title: "Ava",
//     vote_average: 5.7,
//     overview: "A black ops assassin is forced to fight for her own survival after a job goes dangerously wrong.",
//     release_date: "2020-07-02",
//   },
//   {
//     popularity: 718.983,
//     vote_count: 95,
//     video: false,
//     poster_path: "/xqbQtMffXwa3oprse4jiHBMBvdW.jpg",
//     id: 601844,
//     adult: false,
//     backdrop_path: "/qTrpw2ZUvN7ywUu1kieEsvNDrgQ.jpg",
//     original_language: "en",
//     original_title: "Becky",
//     genre_ids: [53, 28, 27],
//     title: "Becky",
//     vote_average: 6.1,
//     overview:
//       "A teenager's weekend at a lake house with her father takes a turn for the worse when a group of convicts wreaks havoc on their lives.",
//     release_date: "2020-07-23",
//   },
//   {
//     popularity: 636.759,
//     vote_count: 94,
//     video: false,
//     poster_path: "/bkld8Me0WiLWipLORRNfF1yIPHu.jpg",
//     id: 624963,
//     adult: false,
//     backdrop_path: "/ezLKohe4HKsHQbwQwhv0ARo83NC.jpg",
//     original_language: "en",
//     original_title: "A Babysitter's Guide to Monster Hunting",
//     genre_ids: [12, 35, 14, 10751],
//     title: "A Babysitter's Guide to Monster Hunting",
//     vote_average: 6.2,
//     overview:
//       "Recruited by a secret society of babysitters, a high schooler battles the Boogeyman and his monsters when they nab the boy she's watching on Halloween.",
//     release_date: "2020-10-14",
//   },
//   {
//     popularity: 796.344,
//     vote_count: 955,
//     video: false,
//     poster_path: "/jlJ8nDhMhCYJuzOw3f52CP1W8MW.jpg",
//     id: 400160,
//     adult: false,
//     backdrop_path: "/wu1uilmhM4TdluKi2ytfz8gidHf.jpg",
//     original_language: "en",
//     original_title: "The SpongeBob Movie: Sponge on the Run",
//     genre_ids: [14, 16, 12, 35, 10751],
//     title: "The SpongeBob Movie: Sponge on the Run",
//     vote_average: 8.3,
//     overview:
//       "When his best friend Gary is suddenly snatched away, SpongeBob takes Patrick on a madcap mission far beyond Bikini Bottom to save their pink-shelled pal.",
//     release_date: "2020-08-14",
//   },
//   {
//     popularity: 587.276,
//     vote_count: 304,
//     video: false,
//     poster_path: "/r4Lm1XKP0VsTgHX4LG4syAwYA2I.jpg",
//     id: 590223,
//     adult: false,
//     backdrop_path: "/lA5fOBqTOQBQ1s9lEYYPmNXoYLi.jpg",
//     original_language: "en",
//     original_title: "Love and Monsters",
//     genre_ids: [28, 12, 35, 878],
//     title: "Love and Monsters",
//     vote_average: 7.7,
//     overview:
//       "Seven years after the Monsterpocalypse, Joel Dawson, along with the rest of humanity, has been living underground ever since giant creatures took control of the land. After reconnecting over radio with his high school girlfriend Aimee, who is now 80 miles away at a coastal colony, Joel begins to fall for her again. As Joel realizes that there’s nothing left for him underground, he decides against all logic to venture out to Aimee, despite all the dangerous monsters that stand in his way.",
//     release_date: "2020-10-16",
//   },
//   {
//     popularity: 537.113,
//     vote_count: 71,
//     video: false,
//     poster_path: "/5aL71e0XBgHZ6zdWcWeuEhwD2Gw.jpg",
//     id: 721656,
//     adult: false,
//     backdrop_path: "/5gTQmnGYKxDfmUWJ9GUWqrszRxN.jpg",
//     original_language: "en",
//     original_title: "Happy Halloween Scooby-Doo!",
//     genre_ids: [16, 10751, 9648, 35, 80],
//     title: "Happy Halloween Scooby-Doo!",
//     vote_average: 8,
//     overview:
//       "Scooby-Doo and the gang team up with their pals, Bill Nye The Science Guy and Elvira Mistress of the Dark, to solve this mystery of gigantic proportions and save Crystal Cove!",
//     release_date: "2020-10-06",
//   },
// ]

// const arr2 = [
//   {
//     popularity: 602.826,
//     vote_count: 154,
//     video: false,
//     poster_path: "/9Rj8l6gElLpRL7Kj17iZhrT5Zuw.jpg",
//     id: 734309,
//     adult: false,
//     backdrop_path: "/7fvdg211A2L0mHddvzyArRuRalp.jpg",
//     original_language: "en",
//     original_title: "Santana",
//     genre_ids: [28],
//     title: "Santana",
//     vote_average: 5.5,
//     overview:
//       "Two brothers — one a narcotics agent and the other a general — finally discover the identity of the drug lord who murdered their parents decades ago. They may kill each other before capturing the bad guys.",
//     release_date: "2020-08-28",
//   },
//   {
//     popularity: 608.727,
//     vote_count: 136,
//     video: false,
//     poster_path: "/xqvX5A24dbIWaeYsMTxxKX5qOfz.jpg",
//     id: 660982,
//     adult: false,
//     backdrop_path: "/75ooojtgiKYm5LcCczbCexioZze.jpg",
//     original_language: "en",
//     original_title: "American Pie Presents: Girls' Rules",
//     genre_ids: [35],
//     title: "American Pie Presents: Girls Rules",
//     vote_average: 6.2,
//     overview:
//       "It's Senior year at East Great Falls. Annie, Kayla, Michelle, and Stephanie decide to harness their girl power and band together to get what they want their last year of high school.",
//     release_date: "2020-10-06",
//   },
//   {
//     popularity: 626.221,
//     vote_count: 343,
//     video: false,
//     poster_path: "/uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
//     id: 718444,
//     adult: false,
//     backdrop_path: "/x4UkhIQuHIJyeeOTdcbZ3t3gBSa.jpg",
//     original_language: "en",
//     original_title: "Rogue",
//     genre_ids: [28, 12, 18, 53],
//     title: "Rogue",
//     vote_average: 5.8,
//     overview:
//       "Battle-hardened O’Hara leads a lively mercenary team of soldiers on a daring mission: rescue hostages from their captors in remote Africa. But as the mission goes awry and the team is stranded, O’Hara’s squad must face a bloody, brutal encounter with a gang of rebels.",
//     release_date: "2020-08-20",
//   },
//   {
//     popularity: 615.982,
//     vote_count: 23,
//     video: false,
//     poster_path: "/z0r3YjyJSLqf6Hz0rbBAnEhNXQ7.jpg",
//     id: 697064,
//     adult: false,
//     backdrop_path: "/7WKIOXJa2JjHygE8Yta3uaCv6GC.jpg",
//     original_language: "en",
//     original_title: "Beckman",
//     genre_ids: [28],
//     title: "Beckman",
//     vote_average: 5.5,
//     overview:
//       "A contract killer, becomes the reverend of a LA church, until a cult leader and his minions kidnap his daughter. Blinded by vengeance, he cuts a bloody path across the city. The only thing that can stop him is his newfound faith.",
//     release_date: "2020-09-10",
//   },
//   {
//     popularity: 581.144,
//     vote_count: 920,
//     video: false,
//     poster_path: "/tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
//     id: 475430,
//     adult: false,
//     backdrop_path: "/o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
//     original_language: "en",
//     original_title: "Artemis Fowl",
//     genre_ids: [12, 14, 878, 10751, 28],
//     title: "Artemis Fowl",
//     vote_average: 5.8,
//     overview:
//       "Artemis Fowl is a 12-year-old genius and descendant of a long line of criminal masterminds. He soon finds himself in an epic battle against a race of powerful underground fairies who may be behind his father's disappearance.",
//     release_date: "2020-06-12",
//   },
//   {
//     popularity: 590.317,
//     vote_count: 22,
//     video: false,
//     poster_path: "/cLDPLia17AwMqSaRHccyAlInkch.jpg",
//     id: 634244,
//     adult: false,
//     backdrop_path: "/cw8A0SprTxr7uSfcH7lwSRRhezJ.jpg",
//     original_language: "en",
//     original_title: "Heavenquest: A Pilgrim's Progress",
//     genre_ids: [12, 14, 28],
//     title: "Heavenquest: A Pilgrim's Progress",
//     vote_average: 6.8,
//     overview:
//       "Inspired by the 1678 novel The Pilgrim's Progress and an imagined prequel to Bunyan's original writings.  A regal man named Vangel is thrust on a journey against his will when he is suddenly and mysteriously arrested.  Injured and lost after escaping the dark king’s men, Vangel begins to have strange dreams and visions of a mysterious woman in white calling him from the unknown territory of the North.  Armed with a book called “The Record of the Ancients” that he receives from a wise sage named Elder, Vangel embarks on an adventure that takes him through treacherous mountain range, unending deserts, the Lake of Doubts, and the Forest of No Return.  Along the way, travel companions share about a fabled good king and his son in the North if he can make it there alive.",
//     release_date: "2020-07-13",
//   },
//   {
//     popularity: 480.108,
//     vote_count: 1579,
//     video: false,
//     poster_path: "/kiX7UYfOpYrMFSAGbI6j1pFkLzQ.jpg",
//     id: 613504,
//     adult: false,
//     backdrop_path: "/6hgItrYQEG33y0I7yP2SRl2ei4w.jpg",
//     original_language: "en",
//     original_title: "After We Collided",
//     genre_ids: [10749, 18],
//     title: "After We Collided",
//     vote_average: 7.4,
//     overview:
//       "Tessa finds herself struggling with her complicated relationship with Hardin; she faces a dilemma that could change their lives forever.",
//     release_date: "2020-09-02",
//   },
//   {
//     popularity: 501.752,
//     vote_count: 516,
//     video: false,
//     poster_path: "/lAaJc9842RDVrjvR3OLPMTeHkiA.jpg",
//     id: 615665,
//     adult: false,
//     backdrop_path: "/dUN960snyYJv3UfCOUEW071Ww7w.jpg",
//     original_language: "en",
//     original_title: "Holidate",
//     genre_ids: [35, 10749],
//     title: "Holidate",
//     vote_average: 7.3,
//     overview:
//       "Fed up with being single on holidays, two strangers agree to be each other's platonic plus-ones all year long, only to catch real feelings along the way.",
//     release_date: "2020-10-28",
//   },
//   {
//     popularity: 484.404,
//     vote_count: 204,
//     video: false,
//     poster_path: "/xOmGTJtBgRVSAF4S5dZEUqHqyy5.jpg",
//     id: 621870,
//     adult: false,
//     backdrop_path: "/oSSEcPDfwgZSv2i01Oqxdb9t8fI.jpg",
//     original_language: "en",
//     original_title: "Secret Society of Second Born Royals",
//     genre_ids: [28, 12, 35, 14],
//     title: "Secret Society of Second Born Royals",
//     vote_average: 7.1,
//     overview:
//       "Sam is a teenage royal rebel, second in line to the throne of the kingdom of Illyria. Just as her disinterest in the royal way of life is at an all-time high, she discovers she has super-human abilities and is invited to join a secret society of similar extraordinary second-born royals charged with keeping the world safe.",
//     release_date: "2020-09-25",
//   },
//   {
//     popularity: 467.305,
//     vote_count: 117,
//     video: false,
//     poster_path: "/i4kPwXPlM1iy8Jf3S1uuLuwqQAV.jpg",
//     id: 721452,
//     adult: false,
//     backdrop_path: "/riDrpqQtZpXGeiJdlmfcwwPH7nN.jpg",
//     original_language: "en",
//     original_title: "One Night in Bangkok",
//     genre_ids: [28, 53],
//     title: "One Night in Bangkok",
//     vote_average: 7.2,
//     overview:
//       "A hit man named Kai flies into Bangkok, gets a gun, and orders a cab. He offers a professional female driver big money to be his all-night driver. But when she realizes Kai is committing brutal murders at each stop, it's too late to walk away. Meanwhile, an offbeat police detective races to decode the string of slayings before more blood is spilled.",
//     release_date: "2020-08-25",
//   },
//   {
//     popularity: 595.895,
//     vote_count: 159,
//     video: false,
//     poster_path: "/eDnHgozW8vfOaLHzfpHluf1GZCW.jpg",
//     id: 606234,
//     adult: false,
//     backdrop_path: "/u9YEh2xVAPVTKoaMNlB5tH6pXkm.jpg",
//     original_language: "en",
//     original_title: "Archive",
//     genre_ids: [878, 18, 14, 53],
//     title: "Archive",
//     vote_average: 5.8,
//     overview:
//       "2038: George Almore is working on a true human-equivalent AI, and his latest prototype is almost ready. This sensitive phase is also the riskiest as he has a goal that must be hidden at all costs—being reunited with his dead wife.",
//     release_date: "2020-08-13",
//   },
//   {
//     popularity: 524.606,
//     vote_count: 1552,
//     video: false,
//     poster_path: "/TnOeov4w0sTtV2gqICqIxVi74V.jpg",
//     id: 605116,
//     adult: false,
//     backdrop_path: "/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg",
//     original_language: "en",
//     original_title: "Project Power",
//     genre_ids: [28, 80, 878],
//     title: "Project Power",
//     vote_average: 6.6,
//     overview:
//       "An ex-soldier, a teen and a cop collide in New Orleans as they hunt for the source behind a dangerous new pill that grants users temporary superpowers.",
//     release_date: "2020-08-14",
//   },
//   {
//     popularity: 529.669,
//     vote_count: 40,
//     video: false,
//     poster_path: "/chGTXsvn53XvEnvsJ9ZD9eiYKx9.jpg",
//     id: 635237,
//     adult: false,
//     backdrop_path: "/sFLgXQGrSWxnjmPOpGKPApWNOUH.jpg",
//     original_language: "en",
//     original_title: "Arthur & Merlin: Knights of Camelot",
//     genre_ids: [28, 12],
//     title: "Arthur & Merlin: Knights of Camelot",
//     vote_average: 6.2,
//     overview:
//       "King Arthur returns home after fighting the Roman Empire. His illegitimate son has corrupted the throne of Camelot and King Arthur must reunite with the wizard Merlin and the Knights of the Round Table to fight to get back his crown.",
//     release_date: "2020-05-28",
//   },
//   {
//     popularity: 457.281,
//     vote_count: 137,
//     video: false,
//     poster_path: "/n6hptKS7Y0ZjkYwbqKOK3jz9XAC.jpg",
//     id: 594328,
//     adult: false,
//     backdrop_path: "/lkeBhXGJFRlhI7cBWn8LQQAdZqK.jpg",
//     original_language: "en",
//     original_title: "Phineas and Ferb The Movie: Candace Against the Universe",
//     genre_ids: [16, 878, 35, 10402, 10751, 12],
//     title: "Phineas and Ferb The Movie: Candace Against the Universe",
//     vote_average: 7.4,
//     overview:
//       "Phineas and Ferb travel across the galaxy to rescue their older sister Candace, who has been abducted by aliens and taken to a utopia in a far-off planet, free of her pesky little brothers.",
//     release_date: "2020-08-28",
//   },
//   {
//     popularity: 591.147,
//     vote_count: 126,
//     video: false,
//     poster_path: "/9HT9982bzgN5on1sLRmc1GMn6ZC.jpg",
//     id: 671039,
//     adult: false,
//     backdrop_path: "/gnf4Cb2rms69QbCnGFJyqwBWsxv.jpg",
//     original_language: "fr",
//     original_title: "Bronx",
//     genre_ids: [53, 28, 18, 80],
//     title: "Rogue City",
//     vote_average: 6.4,
//     overview:
//       "Caught in the crosshairs of police corruption and Marseille’s warring gangs, a loyal cop must protect his squad by taking matters into his own hands.",
//     release_date: "2020-10-30",
//   },
//   {
//     popularity: 492.074,
//     vote_count: 227,
//     video: false,
//     poster_path: "/vJHSParlylICnI7DuuI54nfTPRR.jpg",
//     id: 438396,
//     adult: false,
//     backdrop_path: "/qGZe9qTuydxyJYQ60XDtEckzLR8.jpg",
//     original_language: "es",
//     original_title: "Orígenes secretos",
//     genre_ids: [18, 53],
//     title: "Unknown Origins",
//     vote_average: 6.2,
//     overview:
//       "In Madrid, Spain, a mysterious serial killer ruthlessly murders his victims by recreating the first appearance of several comic book superheroes. Cosme, a veteran police inspector who is about to retire, works on the case along with the tormented inspector David Valentín and his own son Jorge Elías, a nerdy young man who owns a comic book store.",
//     release_date: "2020-08-28",
//   },
//   {
//     popularity: 492.096,
//     vote_count: 169,
//     video: false,
//     poster_path: "/3eg0kGC2Xh0vhydJHO37Sp4cmMt.jpg",
//     id: 531499,
//     adult: false,
//     backdrop_path: "/zogWnCSztU8xvabaepQnAwsOtOt.jpg",
//     original_language: "en",
//     original_title: "The Tax Collector",
//     genre_ids: [28, 80, 18],
//     title: "The Tax Collector",
//     vote_average: 6.1,
//     overview:
//       "David Cuevas is a family man who works as a gangland tax collector for high ranking Los Angeles gang members. He makes collections across the city with his partner Creeper making sure people pay up or will see retaliation. An old threat returns to Los Angeles that puts everything David loves in harm’s way.",
//     release_date: "2020-08-07",
//   },
//   {
//     popularity: 405.629,
//     vote_count: 94,
//     video: false,
//     poster_path: "/4BgSWFMW2MJ0dT5metLzsRWO7IJ.jpg",
//     id: 726739,
//     adult: false,
//     backdrop_path: "/t22fWbzdnThPseipsdpwgdPOPCR.jpg",
//     original_language: "en",
//     original_title: "Cats & Dogs 3: Paws Unite",
//     genre_ids: [35, 28],
//     title: "Cats & Dogs 3: Paws Unite",
//     vote_average: 6.5,
//     overview:
//       "It's been ten years since the creation of the Great Truce, an elaborate joint-species surveillance system designed and monitored by cats and dogs to keep the peace when conflicts arise. But when a tech-savvy villain hacks into wireless networks to use frequencies only heard by cats and dogs, he manipulates them into conflict and the worldwide battle between cats and dogs is BACK ON. Now, a team of inexperienced and untested agents will have to use their old-school animal instincts to restore order and peace between cats and dogs everywhere.",
//     release_date: "2020-10-02",
//   },
//   {
//     popularity: 520.764,
//     vote_count: 191,
//     video: false,
//     poster_path: "/2YvT3pdGngzpbAuxamTz4ZlabnT.jpg",
//     id: 630566,
//     adult: false,
//     backdrop_path: "/bx326cwBtDsfDcnTgFlK5dXkyaC.jpg",
//     original_language: "en",
//     original_title: "Clouds",
//     genre_ids: [10402, 18, 10749],
//     title: "Clouds",
//     vote_average: 8.4,
//     overview:
//       "Young musician Zach Sobiech discovers his cancer has spread, leaving him just a few months to live. With limited time, he follows his dream and makes an album, unaware that it will soon be a viral music phenomenon.",
//     release_date: "2020-10-09",
//   },
//   {
//     popularity: 433.517,
//     vote_count: 7522,
//     video: false,
//     poster_path: "/tzYkC0vqX8Dokuwynhz1lnWWgWT.jpg",
//     id: 283366,
//     adult: false,
//     backdrop_path: "/ld7V9BjMk2xtiBNcR8savyyk5ca.jpg",
//     original_language: "en",
//     original_title: "Miss Peregrine's Home for Peculiar Children",
//     genre_ids: [18, 14, 12, 10751],
//     title: "Miss Peregrine's Home for Peculiar Children",
//     vote_average: 6.7,
//     overview:
//       "A teenager finds himself transported to an island where he must help protect a group of orphans with special powers from creatures intent on destroying them.",
//     release_date: "2016-09-28",
//   },
// ]

// let fetchFn = function () {}
// let arrToRender = []
// let paginator
// let pagination_info
// let totalResults = 10000 // получаем с фетча
// const pagination = document.querySelectorAll("[data-action=page]")
// console.log(pagination)
// // const prevPage = ""
// // const nextPage = ""
// let page = 1
// // fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2d536748299a0654176fee96f4763797&page=501`)
// //   .then((data) => data.json())
// //   .then((result) => console.log(result))

// const createArr = function (page = 1) {
//   let elPerPage = 4
//   // приходит с проверки на вьюпорт. 9-ка взята для десктоп версии
//   if (screen.width > 320 && screen.width < 768) {
//     elPerPage = 8
//   } else if (screen.width > 768) {
//     elPerPage = 9
//   }

//   console.log(elPerPage)
//   let allPages = Math.ceil(totalResults / elPerPage)
//   paginator = new Paginator(elPerPage, allPages)
//   pagination_info = paginator.build(totalResults, page)
//   console.log(pagination_info)

//   let firstIndex = pagination_info.first_result % 20 // 18
//   let firstFetchPage = Math.ceil(pagination_info.first_result / 20) // 1
//   let lastIndex = pagination_info.last_result % 20 // 26
//   let lastFetchPage = Math.ceil(pagination_info.last_result / 20)
//   console.log(firstIndex, lastIndex)
//   console.log(firstFetchPage, lastFetchPage)

//   //   отрисовка ленты пагинатора на странице
//   let btnText = pagination_info.first_page
//   pagination.forEach((el, index) => {
//     console.log(el.classList)
//     el.textContent = btnText
//     btnText++
//   })

//   if (firstFetchPage === lastFetchPage || firstFetchPage === 0) {
//     // fetch(firstFetchPage)
//     for (let i = firstIndex; i <= lastIndex; i++) {
//       arrToRender.push(arr[i])
//     }
//     return console.log(arrToRender)
//   } else {
//     // fetch(firstFetchPage)
//     // fetch(lastFetchPage)
//     for (let i = firstIndex; i < 20; i++) {
//       arrToRender.push(arr[i])
//     }
//     for (let i = 0; i < lastIndex + 1; i++) {
//       arrToRender.push(arr2[i])
//     }
//     return console.log(arrToRender)
//   }
// }

// createArr(3)

// paginator = new Paginator(4, 5)
// pagination_info = paginator.build(10000, 1)
// console.log(pagination_info)
