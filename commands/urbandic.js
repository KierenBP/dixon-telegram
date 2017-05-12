const request = require('request');

function urbanDicSearch(word) {
  return new Promise((resolve, reject) => {
    request(`http://api.urbandictionary.com/v0/define?term=${word}`, (error, response, body) => {
      if (error) {
        reject(error);
      }
      const pBody = JSON.parse(body);
      resolve({
        definition: pBody.list[0].definition,
        example: pBody.list[0].example,
      });
    });
  });
}

module.exports = urbanDicSearch;
