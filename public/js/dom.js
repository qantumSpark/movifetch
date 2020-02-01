

export function search(res, pageNum, cb) {
  const searchInput = document.querySelector('#appInput')
  const searchBtn = document.querySelector('#searchBtn')
  searchInput.addEventListener("keydown", function(e){
    if(e.keyCode === 13){
      const search = searchInput.value
      const query = `&query=${search}`
      const page = `&page=${pageNum}`
      const url = res+query+page+'include_adult=false'
      document.querySelector('.app__home__results').innerHTML = ''
      cb(url, res)
    }
  })

  searchBtn.addEventListener('click', ()=>{
    const search = searchInput.value
      const query = `&query=${search}`
      const page = `&page=${pageNum}`
      const url = res+query+page+'&include_adult=false'
      document.querySelector('.app__home__results').innerHTML = ''
      cb(url, res)
  })
}

export function appendFilms(list){
  list.forEach(e => {
    const film = buildFilmDocument(e)
    const container = document.querySelector('.app__home__results')
    container.appendChild(film)
  })
}

export function scrollWatcher(url,cb) {
  let limit = 3000;
  let page = 1;
  window.addEventListener("scroll", e => {
    if (window.scrollY > 200) {
      widget(true)
    } else {
      widget(false)
    }
    if (window.scrollY > limit) {
      page = page + 1;
      limit = limit + 3000;
      let query = "`&query=" + document.querySelector("#appInput").value;
      let pageString = "&page=" + page;
      //Search for more
      cb(query,pageString)
      
    }
  });
}
export function awaitSelection(cb) {
  let list = document.querySelectorAll('.app__home__result')
  
  list.forEach(film => {
    film.addEventListener('click', e => {
      let id = film.children[1].getAttribute('data-id')
      cb(id)
    })
  })
}
{/* <div class="app__film  --hidden">
        <div class="film__retour"><i class="fas fa-chevron-left"></i> Retour</div>
        <h3 class="film__title">Titre du film</h3>
        <img src="" alt="img" class="film__img">
        <div class="film__infos">
          <div class="film__year">2019</div>
          <div class="film__genres">Fantasy // Action // Adventure</div>
        </div>
        <div class="film__resume">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat mollitia suscipit nisi veniam excepturi illo est iusto, maiores exercitationem unde vero! Ut iure corrupti exercitationem rerum eligendi qui porro voluptatem similique rem omnis culpa libero aspernatur nisi magnam, iusto dolore.
    </div> */}

export function showSelectFilm(film) {
  console.log(film);
  
  const home = document.querySelector('.app__home')

  const container = document.querySelector('.app__film')
  
  const goback = document.createElement('div')
  goback.classList.add('film__retour')
  goback.innerHTML = '<i class="fas fa-chevron-left"></i> Retour'

  goback.addEventListener('click', ()=>{
    container.classList.add('--hidden')
    container.innerHTML = ''
    home.classList.remove('--hidden')
  })
  container.appendChild(goback)

  const title = document.createElement('h3')
  title.classList.add('film__title')
  title.innerText = film.title
  container.appendChild(title)
  
  const popularity = document.createElement('h5')
  popularity.classList.add('film__popularity')
  popularity.innerHTML = film.popularity+' <i class="fas fa-star "></i>'
  container.appendChild(popularity)

  const img = document.createElement('img')
  img.src = "https://image.tmdb.org/t/p/w500"+film.backdrop_path
  img.classList.add('film__img')
  container.appendChild(img)
  

  const infosContainer = document.createElement('div')
  infosContainer.classList.add('film__infos')


  const genres = document.createElement('h5')
  genres.classList.add('film__genres')
  genres.innerText = "Genres: "
  film.genres.forEach(e => genres.innerText += " "+e.name+ " ")
  infosContainer.appendChild(genres)

  const date = document.createElement('h5')
  date.classList.add('film__year')
  date.innerText = "Date de sortie: " +film.release_date
  infosContainer.appendChild(date)

  const status = document.createElement('h5')
  status.classList.add('film__status')
  status.innerText =  "Status: "+film.status
  infosContainer.appendChild(status)

  const description = document.createElement('p')
  description.classList.add('film__description')
  description.innerText = film.overview
  infosContainer.appendChild(description)

  container.appendChild(infosContainer)

  home.classList.add('--hidden')
  container.classList.remove('--hidden')
}

/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
  function widget(boolean) {
    const widget = document.querySelector('#widget')
    if (boolean) {
      widget.style.opacity = 1
    }else{
      widget.style.opacity = 0
    }
  }

function buildFilmDocument(film) {
  const result = document.createElement('div')
  result.classList.add('app__home__result')

  const img = document.createElement('img')
  img.src = "https://image.tmdb.org/t/p/w500" +film.poster_path
  result.appendChild(img)

  const title = document.createElement('h5')
  title.innerText = film.title
  title.classList.add('result__title')
  title.setAttribute('data-id', film.id)
  result.appendChild(title)

  const description = document.createElement('p')
  description.innerText = troncate(film.overview, 150)
  description.classList.add('result__description')
  result.appendChild(description)

  return result
}


function troncate(string, charNum) {
  return string.slice(0, charNum)+' ...'
}