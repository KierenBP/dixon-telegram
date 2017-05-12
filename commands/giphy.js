const Giphy = require('giphy');
const config = require('./../config');

const giphy = new Giphy(config.giphyToken);

function gifSearch(query) {
  return new Promise((resolve, reject) => {
    giphy.search({ q: query }, (err, test) => {
      if (err) {
        reject(err);
      }
      if (test.data.length !== 0) {
        console.log(test.data.length);
        const randomNumber = Math.floor(Math.random() * (test.data.length)) + 1;
        console.log(randomNumber);
        resolve(test.data[randomNumber].images.original.mp4);
      } else {
        reject('No Gifs Found');
      }
    });
  });
}

module.exports = gifSearch;
