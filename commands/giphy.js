const Giphy = require('giphy');
const config = require('./../config');

const giphy = new Giphy(config.giphyToken);

function gifSearch(query) {
  return new Promise((resolve, reject) => {
    giphy.search({ q: query }, (err, test) => {
      if (err) {
        reject(err);
      }
      if (test.data[1]) {
        resolve(test.data[1].images.original.mp4);
      } else {
        reject('No Gifs Found');
      }
    });
  });
}

module.exports = gifSearch;
