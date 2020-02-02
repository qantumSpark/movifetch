import * as api from "/js/api.js";
import * as dom from "/js/dom.js";

//Ecoute l'input et construit la string query
dom.listenInput(1,query => {
  //Requête la list des films au serveur
  getMovies(query, list => {
    //Clear la vue 
    document.querySelector('.app__home__results').innerHTML = ''

    //Sort la liste par popularité
    const films = list.sort((a,b)=> a.popularity < b.popularity)

    //Parcours la liste
    films.forEach(film => {
      //Construit une div par film
      const filmDom = dom.buildFilm("app__home__result",[
        {
          type:'img',
          src:'https://image.tmdb.org/t/p/w500'+film.poster_path
        },
        {
          type: 'h3',
          content: film.title,
          style:['result__title'],
          attr: {name: 'data-id', value: film.id}
        },
        {
          type:'p',
          content: film.overview.slice(0,150) + " ...",
          style:['result__description']
        }
      ], true ,id => {
        //Ajoute un event listener 'click' a chaque film
        //Permet de recuperer l'id et naviguer vers un film

        //Switch les classes CSS pour afficher la page
        dom.fromTo('.app__home', '.app__film')

        //Requête pour récuperer les infos du film cliqué avec l'id
        getMovie(id, details => {
          //Construit le film
          
          const film = dom.buildFilm("app__film",[
            {
              type:'h1',
              content:details.title,
              style:['film__title']
            },{
              type:'h5',
              content: details.popularity+ '<i class="fas fa-star "></i>',
              style:['film__popularity']
            },{
              type:'img',
              src:"https://image.tmdb.org/t/p/w500"+details.backdrop_path,
              style:['film__img']
            },{
              type:'h5',
              content:"Date de sortie: " +details.release_date,
              style:['film__year']
            },{
              type:'h5',
              content:"Status: "+details.status,
              style:['film__status']
            },{
              type:'p',
              content:details.overview,
              style:['film__description']
            },
          ], false)
          
          dom.appendFilm(film, '.app__film')
        })
      })


      //Append tout les films a la home
      dom.appendFilm(filmDom, '.app__home__results')
    })
  })
  
})



async function getMovies(query, cb) {
  await axios.get('/api/'+query)
  .then(res => {
    cb(res.data)
  })
  .catch(err => console.log(err))
}

async function getMovie(query, cb) {
  await axios.get('/api/details/'+query)
  .then(res => {
    cb(res.data)
  })
  .catch(err => console.log(err))
}



/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

//Recherche de films
// api.searchURL(res => {
//   dom.search(res, 1, (url, res) => {
//     api.getMany(url, res => {
//       let list = res.data.results.sort((a, b) => a.popularity < b.popularity);

//       dom.appendFilms(list);
//       dom.awaitSelection(id => {
//         api.getOneUrl(id, film => {
//           dom.showSelectFilm(film);
//         })
//       })

//       dom.scrollWatcher(url,(query, pageString)=>{
//         api.getMore(query, pageString, res => {
//           dom.appendFilms(res);

//         })
//       })
//     });
//   });
// });

// Select a single film
