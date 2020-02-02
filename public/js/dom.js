export function backBtn() {
  const parent = document.querySelector(".app__film__details");
  const btn = document.createElement("div");
  btn.classList.add("app__film__goback");
  btn.innerHTML = `<i class="fas fa-arrow-circle-left"></i> Retour`;
  btn.addEventListener("click", () => {
    fromTo(".app__film__details", ".app__home");
  });
  parent.appendChild(btn);
}

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

export function listenSroll(cb) {
  let pageNum = 2;
  let limit = 2000;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      //Widget to go up appear
    } else {
      //Widget disappear
    }

    if (window.scrollY > limit) {
      limit += 2000;
      const text = document.querySelector("#appInput").value;
      buildQuery(text, pageNum, cb);
      pageNum += 1;
    }
  });
}

//Prends l'HTMLElement film et attache à la target
export function appendFilm(film, targetSelector) {
  const target = document.querySelector(targetSelector);
  target.appendChild(film);
}

//Construit le film
/**
 *
 * @param {String} classOfDiv Classe CSS du container de chaque film
 * @param {Array} filmParams Tableau d'objets, ou chaque objets représente un élément HTML à attacher au film
 * @param {Boolean} boolean True si on veut attacher un click Listener sur le film a sa construction
 * @param {Function} cb Callback pour le listener si true
 */
export function buildFilm(classOfDiv, filmParams, boolean, cb) {
  //Créer le container
  let film = document.createElement("div");
  //Append la classe designée
  film.classList.add(classOfDiv);

  //Pour chaque objet dans le tableau
  filmParams.forEach(param => {
    //console.log(param);

    let elem = document.createElement(param.type);
    if (param.type === "img") {
      elem.src = param.src;
    } else {
      elem.innerHTML = param.content;
    }

    if (param.style) {
      let list = param.style;
      //console.log(list);

      list.forEach(e => {
        elem.classList.add(e);
      });
    }

    if (param.attr) {
      elem.setAttribute(param.attr.name, param.attr.value);
    }

    film.appendChild(elem);
  });

  //Callback on click si true
  if (boolean) {
    film.addEventListener("click", e => {
      let id = film.children[1].getAttribute("data-id");
      cb(id);
    });
  }

  //Retourne le container film prés a être append
  return film;
}

//Navigation
export function fromTo(from, to) {
  let departingPage = document.querySelector(from);
  let destinationPage = document.querySelector(to);

  departingPage.classList.add("--hidden");
  destinationPage.classList.remove("--hidden");
}

function buildQuery(text, pageNum, cb) {
  let query = text + "&page=" + pageNum;
  cb(query);
}
