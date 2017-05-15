const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');
const diceRoll = require('./commands/diceroll');
const urbanDic = require('./commands/urbandic');
const giphy = require('./commands/giphy');
const weather = require('./commands/weather');
const currency = require('./commands/currency');


const commands = {
  diceRoll,
  urbanDic,
  giphy,
  weather,
  currency,
};

// Token from Bot Father
const token = config.telegramToken;

// Initalise Bot
const bot = new TelegramBot(token, { polling: true });

bot.getMe().then((me) => {
  // eslint-disable-next-line
  console.log(`Hi! I'm ${me.first_name}`);
});

// Matches "Hello"
bot.onText(/^(hello|hi|kia ora|hey)(!)? dixon(!)?/ig, (msg) => {
  const chatId = msg.chat.id;
  bot.sendChatAction(chatId, 'typing');
  bot.sendMessage(chatId, 'Hello! 👋', {
    reply_to_message_id: msg.message_id,
    disable_notification: true,
  });
});


// Matches "/help"
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendChatAction(chatId, 'typing');
  bot.sendMessage(chatId, '*Help!*\n\nDixon Bot was created by @imkieren\nhttps://dixon.kieren.xyz\nhttps://github.com/kierenbp/dixon-telegram \n\nCommands and Actions:\n\u2022[[word]].gif - Searches giphy and returns a gif\n\u2022/urbandic [word] - Searches Urban Dictionary for specified word\n\u2022/roll (number) - Rolls dice. 6 sides is default.\n\u2022/convert (amount) (from currency code) (to currency code) - Converts currency (including bitcoin) eg: /convert 1 USD BTC 6 sides is default.\n\u2022Weather Update - Gives you weather update when you *send your location*', { parse_mode: 'markdown', reply_to_message_id: msg.message_id });
});


// Matches "/roll [number]"
bot.onText(/\/(roll)( .+)?/, (msg, match) => {
  const chatId = msg.chat.id;
  // Send Typing Status
  bot.sendChatAction(chatId, 'typing');
  commands.diceRoll(match[2] || 6).then((value) => {
    bot.sendMessage(chatId, `🎲 ${value}`, { reply_to_message_id: msg.message_id });
  }).catch((err) => {
    bot.sendMessage(chatId, `🚫Error! ${err}`, { reply_to_message_id: msg.message_id });
  });
});

// Matches "/urbandic [word]"
bot.onText(/\/urbandic (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  // Send typing Status
  bot.sendChatAction(chatId, 'typing');
  commands.urbanDic(match[1]).then((value) => {
    bot.sendMessage(chatId, `${match[1]}: ${value.definition}`, { reply_to_message_id: msg.message_id });
    bot.sendMessage(chatId, `Example: ${value.example}`, { reply_to_message_id: msg.message_id });
  }).catch((err) => {
    bot.sendMessage(chatId, `🚫Error! ${err}`, { reply_to_message_id: msg.message_id });
  });
});


// Matches ".gif" at the end of a message
bot.onText(/(.+)\.gif+$/g, (msg, match) => {
  const chatId = msg.chat.id;
  // Send videosending Status
  bot.sendChatAction(chatId, 'upload_video');
  commands.giphy(match[1]).then((gifUrl) => {
    bot.sendVideo(chatId, gifUrl, { reply_to_message_id: msg.message_id });
  }).catch((err) => {
    bot.sendMessage(chatId, `🚫Error! ${err}`, { reply_to_message_id: msg.message_id });
  });
});

// Matches "/convert [fromCurrencyCode] [toCurrencyCode]" at the end of a message
bot.onText(/\/convert (.+) (.+) (.+) /, (msg, match) => {
  const chatId = msg.chat.id;
  const amount = match[1];
  const fromCurrency = match[2].toUpperCase();
  const toCurrency = match[3].toUpperCase();
  // Telegram adds the entire command at match[0] and has two values at the end of the array
  if (match.length < 6) {
    commands.currency(amount, fromCurrency, toCurrency).then((convertedAmount) => {
      bot.sendMessage(chatId, `💰${amount + fromCurrency} in ${toCurrency} is ${convertedAmount}`, { reply_to_message_id: msg.message_id });
    }).catch((err) => {
      bot.sendMessage(chatId, `🚫Error! ${err}`, { reply_to_message_id: msg.message_id });
    });
  } else {
    bot.sendMessage(chatId, '🚫Error! Too many arguments', { reply_to_message_id: msg.message_id });
  }
});


bot.on('location', (msg) => {
  const chatId = msg.chat.id;
  bot.sendChatAction(chatId, 'typing');
  commands.weather(msg.location.latitude, msg.location.longitude).then((weatherInfo) => {
    bot.sendMessage(chatId, weatherInfo, { reply_to_message_id: msg.message_id });
  }).catch((err) => {
    bot.sendMessage(chatId, `🚫Error! ${err}`, { reply_to_message_id: msg.message_id });
  });
});

// Dev Testing
// bot.on('message', (msg) => {
//   console.log(msg);
// });
