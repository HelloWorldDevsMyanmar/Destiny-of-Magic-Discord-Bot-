const { prefix } = require("./../../config.json");
const { dirname } = require('path');
 const appDir = dirname(require.main.filename);
var Utality = require(appDir+'/utality/utality');
 
module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Help",
  execute(message) {
	let commands = [message.client.commands.values()]
	console.log(commands);
	Utality.Embed(message,commands,"Terrain List","List How Many Terrains In This Game.");

    // let helpEmbed = new MessageEmbed()
    //   .setTitle("TEST")
    //   .setDescription("HELP")
    //   .setColor("#F8AA2A");

    // commands.forEach((cmd) => {
    //   helpEmbed.addField(
    //     `**${message.client.prefix}${cmd.name}**`,
    //     `${cmd.description}`,
    //     true
    //   );
    // });

    // helpEmbed.setTimestamp();

    // return message.channel.send(helpEmbed).catch(console.error);
  }
};