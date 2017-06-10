const request = require('request');


function btcConvert(btcToCurrencyCode) {
  return new Promise((resolve, reject) => {
    request(`http://api.coindesk.com/v1/bpi/currentprice/${btcToCurrencyCode}.json`, (error, response, body) => {
      if (error) {
        reject(error);
      }
      const pBody = JSON.parse(body);
      // Check that definition is a string/exists
      if (typeof pBody.bpi[btcToCurrencyCode] !== 'undefined') {
        resolve(pBody.bpi[btcToCurrencyCode].rate_float);
      } else {
        reject();
      }
    });
  });
}

function convertCurrency(amount, fromCurrencyCode, toCurrencyCode) {
  return new Promise((resolve, reject) => {
    if (fromCurrencyCode === 'BTC') {
      btcConvert(toCurrencyCode).then((btc) => {
        resolve(amount * btc);
      }).catch(err => reject(err));
    } else if (toCurrencyCode === 'BTC') {
      btcConvert(fromCurrencyCode).then((btc) => {
        resolve(amount / btc);
      }).catch(err => reject(err));
    } else if (fromCurrencyCode === toCurrencyCode) {
      reject('Please pick two different currencies');
    } else {
      request(`https://api.fixer.io/latest?base=${fromCurrencyCode}&symbols=${toCurrencyCode}`, (error, response, body) => {
        if (error) {
          reject(error);
        }
        const pBody = JSON.parse(body);
      // Check that definition is a string/exists
        if (typeof pBody.rates !== 'undefined' && typeof pBody.rates[toCurrencyCode] !== 'undefined') {
          resolve(pBody.rates[toCurrencyCode] * amount);
        } else {
          reject();
        }
      });
    }
  });
}


module.exports = (bot) => {
  bot.command('convert', (ctx) => {
    bot.telegram.sendChatAction(ctx.message.chat.id, 'typing');
    const command = ctx.state.command;
    convertCurrency(command.splitArgs[0].toUpperCase(), command.splitArgs[1].toUpperCase(), command.splitArgs[2].toUpperCase())
    .then((converted) => {
      ctx.reply(`${command.splitArgs[0] + command.splitArgs[1]} is ${converted + command.splitArgs[2]}`);
    })
    .catch((err) => {
      ctx.reply(`Error! ${err}`);
    });
  });
};
