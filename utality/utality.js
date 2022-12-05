var mysql = require('mysql')
const { discord,EmbedBuilder } = require('discord.js');
module.exports = {
    Log: function (output) {
        console.log(output);
      // whatever
    },
    Embed: function (client,data_array,title,description) {
       
      const exampleEmbed = new EmbedBuilder();
      exampleEmbed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
      exampleEmbed.setTitle(title);
      
      
      exampleEmbed.setDescription(description);
      
      exampleEmbed.setTimestamp();
      exampleEmbed.setFooter({ text: 'Created By Hello World Dev', iconURL: 'https://mmanime.org/frontend/img/mark.png' });
     
      for (var key in data_array) {
        exampleEmbed.addFields({ name: key+"", value: data_array[key]+"", inline: true });
       
      }
      client.channel.send({ embeds: [exampleEmbed] });
       
    }
  };