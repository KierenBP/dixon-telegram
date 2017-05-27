const config = require('./config.json');
const Telegraf = require('telegraf');
const diceRoll = require('./commands/diceroll');
const urbanDic = require('./commands/urbandic');
const giphy = require('./commands/giphy');
const weather = require('./commands/weather');
const currency = require('./commands/currency');

const { Markup } = require('telegraf');



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
const bot = new Telegraf(token);

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username
  bot.options.firstName = botInfo.first_name
  console.log(`Hi there! I'm ${botInfo.first_name}!`)
})

// Detect when user says 'Hi' and reply!
bot.hears(['hi', 'Hi'], (ctx) => ctx.reply('Hey there!',{
    reply_to_message_id: ctx.message.message_id 
}));


// Start command - Add to database
bot.command('start', ({ from, reply }) => {
  console.log('start', from)
  // Add to database
  return reply(`Hello! I'm ${bot.options.firstName}. Type /help to see what I am able todo!`)
});


// Stop Command
bot.command('stop', (ctx) => ctx.reply('You sure you wanna stop?\n*Warning this will remove you from the online chat index*\nType /stopplease to contiune...',{
    reply_to_message_id: ctx.message.message_id,
    parse_mode: 'markdown'
}));

bot.command('stopplease', (ctx) => {
  console.log(ctx)
  if(all_members_are_administrators) {
    console.log('stop', ctx.from)
    ctx.reply(`This sucks. Removing you from database and leaving chat! Goodbye <3`)

    // Remove from database

    // Remove from online index


    // Leave Chat
    if(ctx.message.chat.type !== 'private') {
      // ctx.leaveChat()
    }
  }
});


// Publish supergroup chat to online searchable index
bot.command('publish', (ctx) => {
  ctx.getChat().then(x => {
    if(typeof x.username === 'string' && x.type === 'supergroup') {
      ctx.reply(`Chat link: https://t.me/${x.username} \nChat Name: ${x.title}`, Markup.inlineKeyboard([
        Markup.callbackButton('Edit Description', 'desc'),
        Markup.callbackButton('Publish', 'publish')
      ]).extra());
      
    }else {
      ctx.reply('You cannot publish a chat that isn\'t a public supergroup!');
    }
  });
});

bot.action('desc', (ctx => {
  ctx.reply('Reply to this message with new Description')
}))

bot.action('publish', (ctx => {
  ctx.reply('Publishing...')
}))


// List Admins
bot.command('admins', (ctx) => {
  if(ctx.chat.type !== 'private') {
    ctx.getChatAdministrators().then(admins => {
      let replyMessage = '';
      admins.map(admin => {
        replyMessage += `${admin.user.first_name} (@${admin.user.username}): ${admin.status} \n`
      })
      ctx.reply(replyMessage)
    })
  }else {
    ctx.reply('Private chat doesnt have any admins.')
  }
});




bot.startPolling();