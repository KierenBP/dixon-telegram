const config = require('./config.json');
const Telegraf = require('telegraf');
const fs = require('fs');
const commandParts = require('telegraf-command-parts');

// Token from Bot Father
const token = config.telegramToken;

// Initalise Bot
const bot = new Telegraf(token);

// Middleware
bot.use(commandParts());

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
  bot.options.firstName = botInfo.first_name;
  console.log(`Hi there! I'm ${botInfo.first_name}!`);
});

const commandsFolder = './cmds';

// Makes new commands easier to add by looping though 'cmd' folder
fs.readdir(commandsFolder, (err, cmds) => {
  // calls the function with `bot` passed through
  // eslint-disable-next-line
  cmds.map(cmd => require(`${commandsFolder}/${cmd}`)(bot));
});


bot.startPolling();
