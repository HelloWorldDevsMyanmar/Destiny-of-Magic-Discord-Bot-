/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
 const {
	ChannelType,EmbedBuilder
	
} = require("discord.js");

const { dirname } = require('path');
const appDir = dirname(require.main.filename);
var Utality = require(appDir+'/utality/utality');
var con = require(appDir+'/utality/connection');
 module.exports = {
	name: 'setup',
	execute (message, args) {
		
		con.connect(function (err) {
			if (err) throw err
			Utality.Log("Connected");
			var sql_select = 'SELECT * FROM world'
			//World SQL
			con.query(sql_select, function (err, result) {
				if (err) throw err
				result.map(RowDataPacket => {
					//World Category
					message.guild.channels.create({ name: RowDataPacket.world_name+"", type: ChannelType.GuildCategory, reason: 'World Channel' })
					.then(category => {
							//Land SQL
							const categoryid=category.id;
							var sql_land = 'SELECT * FROM land where world_id= '+	RowDataPacket.id;
							con.query(sql_land, function (error, lands) {
								if (error) throw error
								lands.map(LandName =>{
									Utality.Log("Category Created");
									//Land Text Channel Create
									message.guild.channels.create({ name: LandName.land_name+"", type: ChannelType.GuildText, reason: 'Land Channel' })
									.then(land => {
										land.setParent(categoryid);
										const landid=land.id;
										Utality.Log(message.guild);
										//Adding Important Server Features
										var sql = 'INSERT INTO channels (server_id,channel_name,channel_id,category_id) VALUES (?,?,?,?)'
										con.query(sql, [message.guild.id,message.guild.name,landid,categoryid], function (err, result) {
											if (err) throw err
											Utality.Log("Channel Created");

										})
									
									}).catch(console.error);

								})

							});

						
					
					}).catch(console.error);
						})
					
						
					})
	})
	}
}
