const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');
const diceRoll = require('./commands/diceroll');
const urbanDic = require('./commands/urbandic');


const commands = {
  diceRoll,
  urbanDic,
};

// Token from Bot Father
const token = config.telegramToken;

// Initalise Bot
const bot = new TelegramBot(token, { polling: true });

bot.getMe().then((me) => {
  console.log(`Hi! I'm ${me.first_name}`);
});

// Matches "Hello"
bot.onText(/hello(!)?( dixon)?(!)?/ig, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendChatAction(chatId, 'typing');
  bot.sendMessage(chatId, 'Hello! 👋');
});


// Matches "/diceroll [number]"
bot.onText(/\/diceroll (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  // Send Typing Status
  bot.sendChatAction(chatId, 'typing');
  commands.diceRoll(match[1]).then((value) => {
    bot.sendMessage(chatId, `🎲 ${value}`);
  }).catch((err) => {
    bot.sendMessage(chatId, `🚫Error! ${err}`);
  });
});

// Matches "/urbandic [word]"
bot.onText(/\/urbandic (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  // Send typing Status
  bot.sendChatAction(chatId, 'typing');
  commands.urbanDic(match[1]).then((value) => {
    bot.sendMessage(chatId, `${match[1]}: ${value.definition}`);
    bot.sendMessage(chatId, `Example: ${value.example}`);
  }).catch((err) => {
    bot.sendMessage(chatId, `🚫Error! ${err}`);
  });
});
