var mysql = require('mysql')
const { discord,EmbedBuilder,ChannelType } = require('discord.js');
const { prefix } = require("./../config.json");

module.exports = {
    Log: function (output) {
        console.log(output);
      // whatever
    },
    Prefix: prefix,
    Embed: function (client,data_array,title,description) {
       
      const exampleEmbed = new EmbedBuilder();
      exampleEmbed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
      exampleEmbed.setTitle(title);
      
      
      exampleEmbed.setDescription(description);
      
      exampleEmbed.setTimestamp();
      exampleEmbed.setFooter({ text: 'Created By Hello World Dev', iconURL: 'https://raw.githubusercontent.com/HelloWorldDevsMyanmar/logo/main/Logo.png' });
      if(Object.keys(data_array).length>0){
        for (var key in data_array) {
          exampleEmbed.addFields({ name: key+"", value: data_array[key]+"", inline: true });
         
        }
      }else{
        exampleEmbed.addFields({ name: "Data", value:"0", inline: true });
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