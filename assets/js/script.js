const baseURL = 'https://api.themoviedb.org/3/movie/'
let randomNumber = getRandomNumber();
let rmovieURL = `${baseURL}${randomNumber}?api_key=9ac847364cd064efb7e479c53ce0e809`


let randomMovie = document.querySelector('#random')
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
      return response.json()
    })
    .then(data => {
      console.log(data)
      if (data.adult === true) {
        getRandomNumber()
        getTMDB()
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





