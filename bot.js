const { Telegraf } = require('telegraf');
const bot = new Telegraf("5989124907:AAHzTfTppUZqhxKWWlekpAUpVwVJyzpOww4");
const admin = "6092519697"

bot.start((ctx) => {
    ctx.reply("Hey there! It's me @Exoticitus")
})
bot.on('message', async (ctx) => {
    if (ctx.chat.type == "private") {
        if (ctx.chat.id == admin) {
            if (ctx.message && ctx.message.reply_to_message) {
                const reply = ctx.message.reply_to_message;
                if (reply.forward_from) {
                    const forwardFromId = reply.forward_from.id;
                    if (ctx.message.audio || ctx.message.document || ctx.message.photo || ctx.message.sticker || ctx.message.video || ctx.message.video_note || ctx.message.voice) {
                        const caption = ctx.message.caption ? { caption: ctx.message.caption } : {};
                        await ctx.telegram.sendCopy(forwardFromId, ctx.message, caption);
                    } else if (ctx.message.animation) {
                        const caption = ctx.message.caption ? { caption: ctx.message.caption } : {};
                        await ctx.telegram.sendAnimation(forwardFromId, ctx.message.animation, caption);
                    } else if (ctx.message.media_group_id) {
                        const media = await ctx.telegram.getMediaGroup(ctx.message.chat.id, ctx.message.media_group_id);
                        await ctx.telegram.sendMediaGroup(forwardFromId, media);
                    } else {
                        await ctx.telegram.sendMessage(forwardFromId, ctx.message.text);
                    }
                    return;
                }
            } else {
                await ctx.deleteMessage();
            }
        } else {
            const messageOptions = {
                disable_notification: false,
                caption: ctx.message.caption ? ctx.message.caption : null
            };
            ctx.telegram.forwardMessage(admin, ctx.chat.id, ctx.message.message_id, messageOptions)
        }
        return
    }
});