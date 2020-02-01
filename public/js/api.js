export async function searchURL(cb) {
  let result =  await getSearchMovieURL()
  cb(result)
}

export async function getMany(url,cb) {
  axios.get(url)
  .then(res => {
    cb(res)
  }).catch(err => {
    console.log(err)
  });
  }
export async function getMore(query, pageString, cb) {
  searchURL(res => {
    let url = res + query + pageString + "&include_adult=false";
    axios.get(url).then(res => {
      let list = res.data.results.sort(
        (a, b) => a.popularity < b.popularity
      );
      //append dom
      cb(list);
    });
  });
}  
async function getOne(url, cb) {
  await axios.get(url)
    .then(res => {
      const film = res.data
      cb(film)
    })
}


export async function getOneUrl(id, cb){
  await axios.get('/api')
    .then(res => {
      let key = res.data.key
      console.log(key);
      let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US` 
      getOne(url, cb)  
    })
    .catch(err => console.log(err))
}
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////

  async function getSearchMovieURL() {
    return await axios.get("/api")
     .then(result => {
       const API_KEY = result.data.key;
       const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`  
       return searchURL
     })
     .catch(err => console.log('Error: '+err));
   }

