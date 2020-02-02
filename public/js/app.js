import * as api from "/js/api.js";
import * as dom from "/js/dom.js";

dom.listenInput(1, query => {
  document.querySelector(".app__home__results").innerHTML = "";
  getAndBuild(query);
});

dom.listenSroll(query => {
  getAndBuild(query);
});

///////////////////////////////////////////////////////

///////////////////////////////////////////////////////

function getAndBuild(query) {
  //Request liste de films
  api.getMovies(query, list => {
    //Sort la liste par popularité
    const films = list.sort((a, b) => a.popularity < b.popularity);

    //Parcours la liste
    films.forEach(film => {
      //Construit une div par film
      const filmDom = dom.buildFilm(
        "app__home__result",
        [
          {
            type: "img",
            src: "https://image.tmdb.org/t/p/w500" + film.poster_path
          },
          {
            type: "h3",
            content: film.title,
            style: ["result__title"],
            attr: { name: "data-id", value: film.id }
          },
          {
            type: "p",
            content: film.overview.slice(0, 150) + " ...",
            style: ["result__description"]
          }
        ],
        true,
        id => {
          //Ceci est le callback du click sur chaque films
          //Permet de recuperer l'id et naviguer vers un film

          //Clear la page film
          document.querySelector(".app__film__details").innerHTML = "";
          //Switch les classes CSS pour afficher la page
          dom.fromTo(".app__home", ".app__film__details");

          //Requête pour récuperer les infos du film cliqué avec l'id
          api.getMovie(id, details => {
            //Construit le film

            const film = dom.buildFilm(
              "app__film__details",
              [
                {
                  type: "h1",
                  content: details.title,
                  style: ["film__title"]
                },
                {
                  type: "h5",
                  content: details.popularity + '<i class="fas fa-star "></i>',
                  style: ["film__popularity"]
                },
                {
                  type: "img",
                  src:
                    "https://image.tmdb.org/t/p/w500" + details.backdrop_path,
                  style: ["film__img"]
                },
                {
                  type: "h5",
                  content: "Date de sortie: " + details.release_date,
                  style: ["film__year"]
                },
                {
                  type: "h5",
                  content: "Status: " + details.status,
                  style: ["film__status"]
                },
                {
                  type: "p",
                  content: details.overview,
                  style: ["film__description"]
                }
              ],
              false
            );
            dom.backBtn();
            dom.appendFilm(film, ".app__film__details");
          });
        }
      );
      //Append tout les films a la home
      dom.appendFilm(filmDom, ".app__home__results");
    });
  });
}
