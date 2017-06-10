module.exports = (bot) => {
  // Start command - Add to database
  bot.command('start', ({ from, reply }) => {
    // Add to database
    return reply(`Hello! I'm ${bot.options.firstName}. Type /help to see what I am able to do!`);
  });
  // Stop command - Remove from database and public listing
  bot.command('stop', ({ from, reply }) => {
    // Remove to database
    return reply('Removing you from database now... Goodbye <3');
  });
  bot.command('help', ({reply}) => {
    return reply('yooza')
  });
};
