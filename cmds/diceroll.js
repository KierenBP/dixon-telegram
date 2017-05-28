// Roll Dice with either max number of 6 or given number

function diceRoll(maxNumber) {
  // Return Promise
  return new Promise((resolve, reject) => {
    const max = parseInt(maxNumber, 10);
    if (isNaN(max)) { // Check if max is a number
      reject('Dice roll only works with numbers!');
    } else if (max <= 1) { // Check if number is above 1
      reject('Number must be above 1');
    }
    // Return Rolled Number
    resolve(`${Math.floor(Math.random() * (max)) + 1}`);
  });
}

module.exports = (bot) => {
  bot.command(['roll', 'dice', 'd'], (ctx) => {
    bot.telegram.sendChatAction(ctx.message.chat.id, 'typing');
    diceRoll(ctx.state.command.splitArgs[0] || 6).then((rolledNum) => {
      ctx.reply(`Rolled: ${rolledNum}`);
    }).catch((err) => {
      ctx.reply(`Error! ${err}`);
    });
  });
};
