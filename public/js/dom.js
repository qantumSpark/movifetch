

//Listener de l'input et qu bouton de recherche
export function listenInput(pageNum, cb) {
  const input = document.querySelector("#appInput");
  const searchBtn = document.querySelector("#searchBtn");
  input.addEventListener("keydown", e => {
    if (e.keyCode === 13) {
      let text = input.value;

      //Construit la query pour la requête dans le callback
      buildQuery(text, pageNum, cb);
    }
  });
  searchBtn.addEventListener("click", () => {
    let text = input.value;

    //Construit la query pour la requête dans le callback
    buildQuery(text, pageNum, cb);
  });
}

//Prends l'HTMLElement film et attache à la target
export function appendFilm(film, targetSelector) {
  const target = document.querySelector(targetSelector)
  target.appendChild(film)
}

//Construit le film
/**
 * 
 * @param {String} classOfDiv Classe CSS du container de chaque film
 * @param {Array} filmParams Tableau d'objets, ou chaque objets représente un élément HTML à attacher au film
 * @param {Boolean} boolean True si on veut attacher un click Listener sur le film a sa construction
 * @param {Function} cb Callback pour le listener si true
 */
export function buildFilm(classOfDiv, filmParams, boolean , cb){

  //Créer le container
  let film = document.createElement('div')
  //Append la classe designée
  film.classList.add(classOfDiv)

  //Pour chaque objet dans le tableau
  filmParams.forEach(param => {
    //console.log(param);
    
    let elem = document.createElement(param.type)
    if(param.type === 'img'){
      elem.src = param.src
    }else{
      elem.innerHTML = param.content
    }

    if(param.style){
      let list = param.style
      //console.log(list);
      
      list.forEach(e => {
        elem.classList.add(e)
      })
    }

    if(param.attr){
      elem.setAttribute(param.attr.name, param.attr.value)
    }

    film.appendChild(elem)
  })

  //Callback on click si true
  if(boolean){
    film.addEventListener('click', e => {
      let id = film.children[1].getAttribute('data-id')
      cb(id)
    })
  }

  //Retourne le container film prés a être append
  return film
}

//Navigation
export function fromTo(from, to) {
  let departingPage = document.querySelector(from);
  let destinationPage = document.querySelector(to)

  departingPage.classList.add('--hidden')
  destinationPage.classList.remove('--hidden')
}



function buildQuery(text, pageNum , cb) {
  let query = text + "&page=" + pageNum;
  cb(query)
}

function troncate(string, charNum) {
  return string.slice(0, charNum)+' ...'
}










/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// export function search(res, pageNum, cb) {
//   const searchInput = document.querySelector('#appInput')
//   const searchBtn = document.querySelector('#searchBtn')
//   searchInput.addEventListener("keydown", function(e){
//     if(e.keyCode === 13){
//       const search = searchInput.value
//       const query = `&query=${search}`
//       const page = `&page=${pageNum}`
//       const url = res+query+page+'include_adult=false'
//       document.querySelector('.app__home__results').innerHTML = ''
//       cb(url, res)
//     }
//   })

//   searchBtn.addEventListener('click', ()=>{
//     const search = searchInput.value
//       const query = `&query=${search}`
//       const page = `&page=${pageNum}`
//       const url = res+query+page+'&include_adult=false'
//       document.querySelector('.app__home__results').innerHTML = ''
//       cb(url, res)
//   })
// }

// export function appendFilms(list){
//   list.forEach(e => {
//     const film = buildFilmDocument(e)
//     const container = document.querySelector('.app__home__results')
//     container.appendChild(film)
//   })
// }

// export function scrollWatcher(url,cb) {
//   let limit = 3000;
//   let page = 1;
//   window.addEventListener("scroll", e => {
//     if (window.scrollY > 200) {
//       widget(true)
//     } else {
//       widget(false)
//     }
//     if (window.scrollY > limit) {
//       page = page + 1;
//       limit = limit + 3000;
//       let query = "`&query=" + document.querySelector("#appInput").value;
//       let pageString = "&page=" + page;
//       //Search for more
//       cb(query,pageString)
      
//     }
//   });
// }
// export function awaitSelection(cb) {
//   let list = document.querySelectorAll('.app__home__result')
  
//   list.forEach(film => {
//     film.addEventListener('click', e => {
//       let id = film.children[1].getAttribute('data-id')
//       cb(id)
//     })
//   })
// }
// {/* <div class="app__film  --hidden">
//         <div class="film__retour"><i class="fas fa-chevron-left"></i> Retour</div>
//         <h3 class="film__title">Titre du film</h3>
//         <img src="" alt="img" class="film__img">
//         <div class="film__infos">
//           <div class="film__year">2019</div>
//           <div class="film__genres">Fantasy // Action // Adventure</div>
//         </div>
//         <div class="film__resume">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat mollitia suscipit nisi veniam excepturi illo est iusto, maiores exercitationem unde vero! Ut iure corrupti exercitationem rerum eligendi qui porro voluptatem similique rem omnis culpa libero aspernatur nisi magnam, iusto dolore.
//     </div> */}

// export function showSelectFilm(film) {
//   console.log(film);
  
//   const home = document.querySelector('.app__home')

//   const container = document.querySelector('.app__film')
  
//   const goback = document.createElement('div')
//   goback.classList.add('film__retour')
//   goback.innerHTML = '<i class="fas fa-chevron-left"></i> Retour'

//   goback.addEventListener('click', ()=>{
//     container.classList.add('--hidden')
//     container.innerHTML = ''
//     home.classList.remove('--hidden')
//   })
//   container.appendChild(goback)

//   const title = document.createElement('h3')
//   title.classList.add('film__title')
//   title.innerText = film.title
//   container.appendChild(title)
  
//   const popularity = document.createElement('h5')
//   popularity.classList.add('film__popularity')
//   popularity.innerHTML = film.popularity+' <i class="fas fa-star "></i>'
//   container.appendChild(popularity)

//   const img = document.createElement('img')
//   img.src = "https://image.tmdb.org/t/p/w500"+film.backdrop_path
//   img.classList.add('film__img')
//   container.appendChild(img)
  

//   const infosContainer = document.createElement('div')
//   infosContainer.classList.add('film__infos')


//   const genres = document.createElement('h5')
//   genres.classList.add('film__genres')
//   genres.innerText = "Genres: "
//   film.genres.forEach(e => genres.innerText += " "+e.name+ " ")
//   infosContainer.appendChild(genres)

//   const date = document.createElement('h5')
//   date.classList.add('film__year')
//   date.innerText = "Date de sortie: " +film.release_date
//   infosContainer.appendChild(date)

//   const status = document.createElement('h5')
//   status.classList.add('film__status')
//   status.innerText =  "Status: "+film.status
//   infosContainer.appendChild(status)

//   const description = document.createElement('p')
//   description.classList.add('film__description')
//   description.innerText = film.overview
//   infosContainer.appendChild(description)

//   container.appendChild(infosContainer)

//   home.classList.add('--hidden')
//   container.classList.remove('--hidden')
// }

// /////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////
//   function widget(boolean) {
//     const widget = document.querySelector('#widget')
//     if (boolean) {
//       widget.style.opacity = 1
//     }else{
//       widget.style.opacity = 0
//     }
//   }

