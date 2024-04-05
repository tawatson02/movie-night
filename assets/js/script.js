const moviePoster = document.querySelector('#poster')
const movieTitle = document.querySelector('#movie-title')
const movieRating = document.querySelector('#movie-rating')
const movieDesc = document.querySelector('#movie-description')
let randomMovie = document.querySelector('#random')
const backButton = document.querySelector('#back')
const baseURL = 'https://api.themoviedb.org/3/movie/'
const streamingURL = 'https://streaming-availability.p.rapidapi.com/get?output_language=en&tmdb_id=movie%2F'
let randomNumber = getRandomNumber();
let rStreamingURL = `${streamingURL}${randomNumber}`
let rmovieURL = `${baseURL}${randomNumber}?api_key=9ac847364cd064efb7e479c53ce0e809`

let previousMovie = [];

let currentIndex = previousMovie.length;
if (localStorage.getItem('previousMovie') !== null) {
  currentIndex = JSON.parse(localStorage.getItem('previousMovie')).length - 1
}



function getTMDB() {
  randomNumber = getRandomNumber();
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
      else {
        return response.json()
      }

    })
    .then(data => {
      console.log(data)
      if (data.adult === true) {
        getRandomNumber()
        getTMDB()
        return false;
      }
      else {
        function saveMovieDetails() {
          const mDetails = {
            mID: data.id,
            mPoster: data.poster_path,
            mTitle: data.title,
            mRating: data.vote_average,
            mDescription: data.overview,
          }

          previousMovie.push(mDetails)
          console.log(previousMovie)
          getStreaming();
          storeMovies();
        }
        saveMovieDetails();

        // const moviePoster = document.querySelector('#poster')
        // const movieTitle = document.querySelector('#movie-title')
        // const movieRating = document.querySelector('#movie-rating')
        // const movieDesc = document.querySelector('#movie-description')

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
  currentIndex = previousMovie.length -1
  localStorage.setItem('previousMovie', JSON.stringify(previousMovie))
}

// will get a random movie on page load
getTMDB();



function getStreaming() {
  const url = rStreamingURL;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd7ccc3d62fmshc0f593796a8742cp1a0bd4jsn0f505ecc2775',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // let filteredData = data.result.streamingInfo.us.filter((item) => item.streamingType == "subscription")
      // console.log(filteredData)
      function streamData() {
        const streamPlatform = document.querySelector("#stream-platform")
        streamPlatform.innerHTML = '';
        if(data.message === "Not Found" ||
          data?.result?.streamingInfo?.us === undefined){
          
          const div = document.createElement("div")
          div.id = 'sPlatform'
          div.textContent = 'This movie isnt available to stream'
          streamPlatform.append(div)
        }
        else{
          let filteredData = data.result.streamingInfo.us.filter((item) => item.streamingType == "subscription")
          for (let i = 0; i < filteredData.length; i++) {
            const fData = filteredData[i];
            const div = document.createElement("div")
            div.id = 'sPlatform'
            div.textContent = fData.service
            streamPlatform.append(div)
        }
        // iterate through previousMovie array and add streamPlatform to each object in previousMovie array.
        for (let i = 0; i < previousMovie.length; i++) {
          const pMovie = previousMovie[i];

          pMovie.streamPlatform = filteredData
          storeMovies();
          
        }

      }
    }
      streamData()
    })


    .catch(err =>
      console.error(err));

}



backButton.addEventListener('click', getPreviousMovie)
function getPreviousMovie() {
  init();
  console.log(currentIndex)
  currentIndex--;
  console.log(currentIndex)
  console.log(previousMovie)

  const pMovie = previousMovie[currentIndex];
  if (pMovie.mPoster === null) {
    moviePoster.src = './assets/images/tvPlaceholderproject1.jpg'
  }
  else {
    moviePoster.src = 'https://media.themoviedb.org/t/p/w220_and_h330_face' + pMovie.mPoster;
  }
  movieTitle.textContent = pMovie.mTitle;
  movieRating.textContent = pMovie.mRating + "/10";
  movieDesc.textContent = pMovie.mDescription;
}





function init() {
  const storedMovies = JSON.parse(localStorage.getItem('previousMovie'));
  if (storedMovies !== null) {
    previousMovie = storedMovies;
  }
};
init();
console.log(previousMovie)