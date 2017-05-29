const { Markup } = require('telegraf');

const pubReplyKeyboard = Markup.inlineKeyboard([
  Markup.callbackButton('Publish', 'publish'),
  Markup.callbackButton('Edit Description', 'desc'),
]).extra();


module.exports = (bot) => {
  bot.command('publish', (ctx) => {
    bot.telegram.sendChatAction(ctx.message.chat.id, 'typing');
    ctx.reply('Publish', pubReplyKeyboard);
  });

  bot.action('publish', (ctx) => {
    bot.telegram.sendChatAction(ctx.message.chat.id, 'typing');
    ctx.reply('Works');
  });
};
