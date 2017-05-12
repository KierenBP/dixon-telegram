const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');
const diceRoll = require('./commands/diceroll');
const urbanDic = require('./commands/urbandic');
const giphy = require('./commands/giphy');


const commands = {
  diceRoll,
  urbanDic,
  giphy,
};

// Token from Bot Father
const token = config.telegramToken;

// Initalise Bot
const bot = new TelegramBot(token, { polling: true });

bot.getMe().then((me) => {
  console.log(`Hi! I'm ${me.first_name}`);
});

// Matches "Hello"
bot.onText(/^(hello |hi |kia\ ora |hey )(!)?( dixon)?(!)?/ig, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendChatAction(chatId, 'typing');
  bot.sendMessage(chatId, 'Hello! 👋', {
    reply_to_message_id: msg.message_id,
    disable_notification: true,
  });
});


// Matches "/roll [number]"
bot.onText(/\/(roll|)( .+)?/, (msg, match) => {
  const chatId = msg.chat.id;
  // Send Typing Status
  bot.sendChatAction(chatId, 'typing');
  commands.diceRoll(match[2] || 6).then((value) => {
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


// Matches ".gif" at the end of a message
bot.onText(/(.+)\.gif+$/g, (msg, match) => {
  const chatId = msg.chat.id;
  // Send videosending Status
  bot.sendChatAction(chatId, 'upload_video');
  commands.giphy(match[1]).then((gifUrl) => {
    bot.sendVideo(chatId, gifUrl);
  }).catch((err) => {
    bot.sendMessage(chatId, `🚫Error! ${err}`);
  });
});
