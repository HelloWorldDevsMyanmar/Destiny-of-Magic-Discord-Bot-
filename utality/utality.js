var mysql = require('mysql')
const { discord,EmbedBuilder,ChannelType } = require('discord.js');
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
       
    },
    Public_Thread: function(message,title,autoArchiveDuration,reason){

      message.startThread({
        name: title,
        autoArchiveDuration: autoArchiveDuration,
        type: 'GUILD_PUBLIC_THREAD',
        reason: reason
    }).then(function(result) {
       var threadid=result.id;
        //Since This Is Async , Getting ThreadID is Difficult. Planning to Make Thread DB after Discusing Enemy Encounters
     
     });

    },
    Private_Thread: function(message,title,autoArchiveDuration,reason){

      message.startThread({
        name: title,
        autoArchiveDuration: autoArchiveDuration,
        type: ChannelType.PrivateThread,
        reason: reason
    }).then(function(result) {
      var threadid=result.id;
       //Since This Is Async , Getting ThreadID is Difficult. Planning to Make Thread DB after Discusing Enemy Encounters
     });

    },
    
  };