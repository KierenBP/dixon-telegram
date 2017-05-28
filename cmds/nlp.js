module.exports = (bot) => {
  bot.hears(['hi dixon', 'Hi Dixon'], ctx => ctx.reply('Hey there!', {
    reply_to_message_id: ctx.message.message_id,
  }));
};
