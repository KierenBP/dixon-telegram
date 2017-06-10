const Giphy = require('giphy');
const config = require('./../config');

const giphy = new Giphy(config.giphyToken);

function gifSearch(query) {
  return new Promise((resolve, reject) => {
    giphy.search({ q: query }, (err, gifArray) => {
    // If there is an error reject the promise
      if (err) {
        reject(err);
      }
      if (gifArray.data.length !== 0) {
        // Picks a random gif from the array
        const randomNumber = Math.floor(Math.random() * (gifArray.data.length)) + 1;
        // Check that it exists
        if (gifArray.data[randomNumber] && gifArray.data[randomNumber].images.original.mp4) {
          resolve(gifArray.data[randomNumber].images.original.mp4);
        } else {
          reject();
        }
      } else {
        reject('No Gifs Found');
      }
    });
  });
}

module.exports = (bot) => {
  bot.command(['gif', 'g'], (ctx) => {
    bot.telegram.sendChatAction(ctx.message.chat.id, 'upload_video');
    gifSearch(ctx.state.command.args)
    .then((gif) => {
      ctx.replyWithVideo(gif);
    }).catch((err) => {
      ctx.reply(`Error! ${err}`);
    });
  });
};
