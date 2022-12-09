const { prefix } = require("./../../config.json");
const { dirname } = require('path');
 const appDir = dirname(require.main.filename);
 const { discord,EmbedBuilder,ChannelType } = require('discord.js');

var Utality = require(appDir+'/utality/utality');
var json = {};
var count=0;
var Query = require(appDir+'/utality/query');

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Help",
  owner:false,
  execute(message) {
	var arr = message.client.commands;
	var userid=message.author.id;

	  const exampleEmbed = new EmbedBuilder();
      exampleEmbed.setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
      exampleEmbed.setTitle("HELP");
      
      
      exampleEmbed.setDescription("HELP COMMANDS OF THE GAME");
      
      exampleEmbed.setTimestamp();
      exampleEmbed.setFooter({ text: 'Created By Hello World Dev', iconURL: 'https://raw.githubusercontent.com/HelloWorldDevsMyanmar/logo/main/Logo.png' });
	  var con = require(appDir + '/utality/connection')
	  Utality.Log('Connected')
	  con.getConnection(function (err, conn) {
		  function queryData (server_id,owner_id) {
				Utality.Log(server_id)
				Utality.Log(owner_id)
			  var sql_select = Query.select_owner;
			  //World SQL
			  con.query(sql_select,[server_id,owner_id], function (err, result) {
				  if (err) throw err
				  if (!result.length) {
					sentEmbeded(arr,false)
				  }
				  result.map(Owner => {
					sentEmbeded(arr,true)
					
				  })
			  })
		  }
		

		  function releaseQuery () {
			  Utality.Log('Log Out')
			  // return the query back to the pool
			  conn.release()
		  }

		  function sentEmbeded(arr,owner){
			if(owner){
				arr.forEach((value, key) => {
			
					//Utality.Log(key)
					var valuedata= JSON.parse(JSON.stringify(value));
					if(valuedata.owner){
						exampleEmbed.addFields({ name: '__**'+valuedata.name+'**__', value:valuedata.description, inline: true });
					}else{
						exampleEmbed.addFields({ name: valuedata.name, value:valuedata.description, inline: true });	
					}
					
					// const newLocal = Utality.Log(typeof json);
				  }); 
				  message.channel.send({ embeds: [exampleEmbed] });
			}else{
				arr.forEach((value, key) => {
			
					//Utality.Log(key)
					var valuedata= JSON.parse(JSON.stringify(value));
					if(!valuedata.owner){
						exampleEmbed.addFields({ name: valuedata.name, value:valuedata.description, inline: true });
					}
					
					// const newLocal = Utality.Log(typeof json);
				  }); 
				  message.channel.send({ embeds: [exampleEmbed] });
			}
		  }
		
		  
		  
		 //  queryData()
		 queryData(message.guildId,userid)
			releaseQuery()
		  Utality.Log(`All Connections ${con._allConnections.length}`)
		  Utality.Log(`Acquiring Connections ${con._acquiringConnections.length}`)
		  Utality.Log(`Free Connections ${con._freeConnections.length}`)
		  Utality.Log(`Queue Connections ${con._connectionQueue.length}`)
	  })
	
    
     
    
	

	

  }
};