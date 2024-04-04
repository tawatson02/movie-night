const baseURL = 'https://api.themoviedb.org/3/movie/'
const streamingURL = 'https://streaming-availability.p.rapidapi.com/get?output_language=en&tmdb_id=movie%2F'
let randomNumber = '373571';
let rStreamingURL = `${streamingURL}${randomNumber}`
let rmovieURL = `${baseURL}${randomNumber}?api_key=9ac847364cd064efb7e479c53ce0e809`

let previousMovie = [];

let randomMovie = document.querySelector('#random')
function getTMDB() {
  randomNumber = '373571';
  rmovieURL = `${baseURL}${randomNumber}?api_key=9ac847364cd064efb7e479c53ce0e809`
  console.log(randomNumber);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YWM4NDczNjRjZDA2NGVmYjdlNDc5YzUzY2UwZTgwOSIsInN1YiI6IjY2MDYyOWVhMmZhZjRkMDE3ZGM2YWZiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nCbINUDrRR-6SQ0MpGHIXb7X37u2Ot-mUmJ2sBELFHo'
    }
  };

  fetch(rmovieURL, options)
    .then(response => {
      console.log(response)
      if (response.status > 400) {
        getRandomNumber()
        getTMDB()
      }
      return response.json()
    })
    .then(data => {
      console.log(data)
      if (data.adult === true) {
        getRandomNumber()
        getTMDB()
      }
      else {
        function saveMovieDetails() {
          const mDetails = {
            mPoster: data.poster_path,
            mTitle: data.title,
            mRating: data.vote_average,
            mDescription: data.overview,
          }

          previousMovie.push(mDetails)
          console.log(previousMovie)

        }
        saveMovieDetails();
        storeMovies();
        const moviePoster = document.querySelector('#poster')
        const movieTitle = document.querySelector('#movie-title')
        const movieRating = document.querySelector('#movie-rating')
        const movieDesc = document.querySelector('#movie-description')

        for (let i = 0; i < previousMovie.length; i++) {
          const pMovie = previousMovie[i];
          if (data.poster_path === null) {
            moviePoster.src = './assets/images/tvPlaceholderproject1.jpg'
          }
          else {
            moviePoster.src = 'https://media.themoviedb.org/t/p/w220_and_h330_face' + pMovie.mPoster;
          }

          movieTitle.textContent = pMovie.mTitle;
          movieRating.textContent = pMovie.mRating + "/10";
          movieDesc.textContent = pMovie.mDescription;
        }


      }
    }
    )
    .catch(err =>
      console.error(err));
  // console.log("this button works",response)

};


randomMovie.addEventListener('click', getTMDB)
// randomMovie.addEventListener('click', getRandomNumber)
function getRandomNumber() {
  let randomNumber = Math.random()
  let scaledNumber = randomNumber * (1268029 - 373816) + 373816;

  let result = Math.floor(scaledNumber);

  return result;
}


console.log(randomNumber);

// 373816 used as starter number 
// 1268029 as final number 


function storeMovies() {
  localStorage.setItem('previousMovie', JSON.stringify(previousMovie))
}

// will get a random movie on page load
getTMDB();



function getStreaming() {
  const url = rStreamingURL;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'be9ee1be2emsh58a6b038feb55f6p193bc4jsn5c0bfcae5e91',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };

  fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err =>
    console.error(err));

}
getStreaming();