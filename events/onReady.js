/**
 * @file Ready Event File.
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
var Utality = require(appDir+'/utality/utality');
const { prefix } = require(appDir+"/config.json");
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

module.exports = {
	name: "ready",
	once: true,

	/**
	 * @description Executes when client is ready (bot initialization).
	 * @param {import('../typings').Client} client Main Application Client.
	 */
	execute(client) {
		let guilds = client.guilds.cache.size;
    const arrayactivities = [
        `${prefix}help `,
	    `${guilds} servers`,
    ]
	let index = 0;  
    setInterval(() => {
		if(index === arrayactivities.length) index = 0;
		const status = arrayactivities[index];
        client.user.setPresence({ 
            activities: [{ name: `${status}`, type: ActivityType.PLAYING }], 
            status: 'online', 
        })
		index++;
    }, 5000)
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
