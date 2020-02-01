const getApiKey = async () => {
  const result = await fetch('/api')
  return result.key
}

const getSearchMovieURL = async () => {
  const key = getApiKey() 
  const searchURL = 'https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page='
  try {
      const result = await fetch(searchURL)
      if (result.status != 200)
      throw statusText
  } catch(e) {
      console.log('Error: '+e)
  }
}  

async function test() {
  await getSearchMovieURL()
  console.log('after');
}

test()