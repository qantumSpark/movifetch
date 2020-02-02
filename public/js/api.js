export async function getMovies(query, cb) {
  await axios
    .get("/api/" + query)
    .then(res => {
      cb(res.data);
    })
    .catch(err => console.log(err));
}

export async function getMovie(query, cb) {
  await axios
    .get("/api/details/" + query)
    .then(res => {
      cb(res.data);
    })
    .catch(err => console.log(err));
}
