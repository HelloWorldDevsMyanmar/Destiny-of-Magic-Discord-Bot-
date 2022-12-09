/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
 const { PermissionsBitField } = require('discord.js');
 module.exports = {
	name: "permission",
    owner:true,
    description: "Invite the bot to your server!",
	// Refer to typings.d.ts for available properties.

	execute(message, args) {
		message.channel.send({ content: "Pong." });
        let memberTarget = message.guild.members.cache.get(message.author.id);
        if (memberTarget.permissions.has(PermissionsBitField.Flags.Administrator)) {
            message.reply(`<@${memberTarget.user.id}> is a Adminstrator.`);
        } 
        
	},
};
