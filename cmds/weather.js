const request = require('request');
const config = require('./../config');

function weatherReq(latitude, longitude) {
  return new Promise((resolve, reject) => {
    request(`https://api.darksky.net/forecast/${config.darkSkyAPI}/${latitude},${longitude}?units=ca`, (error, response, body) => {
      if (error) {
        reject(error);
      }
      const pBody = JSON.parse(body);
      if (typeof pBody.currently !== 'undefined') {
        resolve(`Currently it is: ${pBody.currently.temperature}°C and the weather condition is: ${pBody.currently.summary}\n\n${pBody.daily.summary}\n\nWeather infomation provided by DarkSky`);
      } else {
        reject();
      }
    });
  });
}

module.exports = (bot) => {
  bot.on('location', (ctx) => {
    weatherReq(ctx.message.location.latitude, ctx.message.location.longitude)
    .then((weatherResults) => {
      ctx.reply(weatherResults);
    }).catch((err) => {
      ctx.reply(`Error! ${err}`);
    });
  });
};
