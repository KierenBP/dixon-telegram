module.exports = (bot) => {
  // Start command - Add to database
  bot.command('start', ({ reply }) => {
    // Add to database
    return reply(`Hello! I'm ${bot.options.firstName}. Type /help to see what I am able to do!`);
  });
  // Stop command - Remove from database and public listing
  bot.command('stop', ({ reply }) => {
    // Remove to database
    return reply('Removing you from database now... Goodbye <3');
  });
  bot.command('help', ({ reply }) => {
    return reply('*Dixon Telegram Bot Help*\nDeveloped by [@imkieren](https://t.me/imkieren)\n\n*Fun Commands*\n/roll|/dice|/d \\[number] - Rolls dice. Default is 6\n/gif|/g <query> - Searches for gif on giphy. Picks randomly.\n/urbandic|/ud <query> - Searches word on [Urban Dictionary](http://urbandictionary.com)\n\n*Moderation Commands*\n/delete - Reply to a chat message to delete it. Only works in supergroups and groups with specified admins.', {
      parse_mode: 'markdown',
      disable_web_page_preview: true,
    });
  });
};
