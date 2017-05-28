const request = require('request');

function urbanDicSearch(word) {
  return new Promise((resolve, reject) => {
    request(`http://api.urbandictionary.com/v0/define?term=${word}`, (error, response, body) => {
      if (error) {
        reject(error);
      }
      const pBody = JSON.parse(body);
      // Check that definition is a string/exists
      if (typeof pBody.list[0] !== 'undefined') {
        resolve({
          definition: pBody.list[0].definition,
          example: pBody.list[0].example,
        });
      } else {
        reject();
      }
    });
  });
}

module.exports = (bot) => {
  bot.command(['urbandictionary', 'urbandic', 'ud'], (ctx) => {
    bot.telegram.sendChatAction(ctx.message.chat.id, 'typing');
    const word = ctx.state.command.args;
    urbanDicSearch(word).then((result) => {
      ctx.reply(`${word} means:\n${result.definition}`);
      ctx.reply(`An example of ${word} is:\n${result.example}`);
    }).catch((err) => {
      ctx.reply(`Error! ${err}`);
    });
  });
};
