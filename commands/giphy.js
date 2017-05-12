const Giphy = require('giphy');
const config = require('./../config');

const giphy = new Giphy(config.giphyToken);

function gifSearch(query) {
  return new Promise((resolve, reject) => {
    giphy.search({ q: query }, (err, test) => {
    // If there is an error reject the promise
      if (err) {
        reject(err);
      }
      if (test.data.length !== 0) {
        // Picks a random gif from the array
        const randomNumber = Math.floor(Math.random() * (test.data.length)) + 1;
        resolve(test.data[randomNumber].images.original.mp4);
      } else {
        reject('No Gifs Found');
      }
    });
  });
}

module.exports = gifSearch;
