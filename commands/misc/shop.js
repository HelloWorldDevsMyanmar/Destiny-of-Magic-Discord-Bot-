/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */

 const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events } = require('discord.js');

 module.exports = {
	name: "shop",
	owner:true,
	description: "Invite the bot to your server!",
	// Refer to typings.d.ts for available properties.

	execute(message, args) {
		if (message.content === "!shop") {
            const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Invite the bot to your server!')
			.setURL('https://xnxx.com')
			.setDescription('Invite the bot to your server!');
           message.reply("shop")
          }
	},
};
