import * as api from "/js/api.js";
import * as dom from "/js/dom.js";

//Recherche de films
api.searchURL(res => {
  dom.search(res, 1, (url, res) => {
    api.getMany(url, res => {
      let list = res.data.results.sort((a, b) => a.popularity < b.popularity);

      
      dom.appendFilms(list);
      dom.awaitSelection(id => {
        api.getOneUrl(id, film => {          
          dom.showSelectFilm(film);
        })
      })


      dom.scrollWatcher(url,(query, pageString)=>{
        api.getMore(query, pageString, res => {
          dom.appendFilms(res);
          
        })
      })
    });
  });
});

// Select a single film




