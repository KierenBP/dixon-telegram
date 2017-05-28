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
        // Check that it exists
        if (typeof test.data[randomNumber].images !== 'undefined') {
          resolve(test.data[randomNumber].images.original.mp4);
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
