module.exports = (bot) => {
  function chatMemberStatus(ctx, next) {
    ctx.telegram.getChatMember(ctx.message.chat.id, ctx.message.from.id).then((chatMember) => {
      if (chatMember.status === 'administrator' || chatMember.status === 'creator') {
        next();
      } else {
        ctx.reply('You\'re not an admin.');
      }
    });
  }

  bot.command('delete', chatMemberStatus, (ctx) => {
    if (!ctx.message.chat.all_members_are_administrators && ctx.message.chat.type !== 'private') {
      if (ctx.message.reply_to_message !== undefined) {
        const replyChatId = ctx.message.reply_to_message.chat.id;
        const replyMessageId = ctx.message.reply_to_message.message_id;
        return ctx.telegram.deleteMessage(replyChatId, replyMessageId)
        .then((didDelete) => {
          if (didDelete) {
            return ctx.telegram.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
          }
          return ctx.reply('Error Deleting Message');
        })
        .catch(err => ctx.reply(`${err}`));
      }
      return ctx.reply('Error. Reply to a message to delete it');
    }
    return ctx.reply('Cannot delete message in this chat.');
  });
};
