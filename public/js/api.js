async function getSearchMovieURL() {
  axios.get("/api")
  .then(result => {
    const API_KEY = result.data.key;
    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=`
    console.log(searchURL);
    
    return searchURL
  })
  .catch(err => console.log('Error: '+err));
}

module.exports = getSearchMovieURL