/**
 * @file Dynamic help command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.3.0
 */

// Deconstructing prefix from config file to use in help command

/**
 * @type {import('../../typings').LegacyCommand}
 */

 const { dirname } = require('path')
 const appDir = dirname(require.main.filename)
 var Utality = require(appDir + '/utality/utality')
 const { client_id } = require(appDir+"/config.json");
 
module.exports = {
	name: "invite",
	description: "Invite the bot to your server!",
	aliases: ["commands"],
	usage: "Invite the bot to your server!",
	cooldown: 5,

	execute(message, args) {
		const { commands } = message.client;
        var json = { 'Invite ': "https://discord.com/oauth2/authorize?client_id="+client_id+"&permissions=70282305&scope=bot" }
        Utality.Embed(message, json, 'Invite the bot to your server!', ' ')
		// If there are no args, it means it needs whole help command.


		// Finally send the embed.

	},
};
