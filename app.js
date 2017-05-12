const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');
const diceRoll = require('./commands/diceroll');


const commands = {
  diceRoll,
};

// Token from Bot Father
const token = config.telegramToken;

// Initalise Bot
const bot = new TelegramBot(token, { polling: true });


// Matches "/diceroll [number]"
bot.onText(/\/diceroll (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  commands.diceRoll(match[1]).then((value) => {
    bot.sendMessage(chatId, `🎲 ${value}`);
  }).catch((err) => {
    bot.sendMessage(chatId, `🚫Error! ${err}`);
  });
});
