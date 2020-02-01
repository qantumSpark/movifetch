import * as api from '/js/api.js';

let searchURL = api.searchURL()
console.log(searchURL);

const searchInput = document.querySelector('#appInput')
const searchBtn = document.querySelector('#searchBtn')

searchInput.addEventListener("keydown", function(e){
  if(e.keyCode === 13){
    let search = this.value
    let page = 1
    let url = searchURL +page+ "include_adult=false"
    console.log(url);
    
    // axios.get(searchURL +page+ "include_adult=false")
    //   .then((result) => {
    //     console.log(result)
    //   }).catch((err) => {
    //     console.log(err)
    //   });
  }
})

