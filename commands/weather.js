const request = require('request');
const config = require('./../config');

function urbanDicSearch(latitude, longitude) {
  return new Promise((resolve, reject) => {
    request(`https://api.darksky.net/forecast/${config.darkSkyAPI}/${latitude},${longitude}?units=ca`, (error, response, body) => {
      if (error) {
        reject(error);
      }
      const pBody = JSON.parse(body);
      if (typeof pBody.currently.temperature === 'string') {
        resolve(`Currently it is: ${pBody.currently.temperature}°C and the weather condition is: ${pBody.currently.summary}\n\n${pBody.daily.summary}`);
      } else {
        reject();
      }
    });
  });
}

module.exports = urbanDicSearch;
