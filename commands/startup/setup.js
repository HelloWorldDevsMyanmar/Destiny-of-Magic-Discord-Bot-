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
const util = require('util');
 module.exports = {
	name: 'setup',
	execute (message, args) {
		try{
			var con = require(appDir+'/utality/connection');
		
			Utality.Log("Connected");
			con.getConnection(function(err, conn) {
				
				function queryData() {
					var sql_select = 'SELECT * FROM world'
					//World SQL
					con.query(sql_select, function (err, result) {
					
						if (err) throw err 
						result.map(RowDataPacket => {
							var json = {"Category": RowDataPacket.world_name};
							Utality.Embed(message,json,"World Created","A New World Has Been Created");
							//World Category
							message.guild.channels.create({ name: RowDataPacket.world_name+"", type: ChannelType.GuildText, reason: 'World Channel' })
							.then(category => {
									//Land SQL
									// const categoryid=category.id;
									var sql_land = 'SELECT * FROM land where world_id= '+	RowDataPacket.id;
									
									con.query(sql_land, function (error, lands) {
										if (err) throw err 
										lands.map(LandName =>{
											
											Utality.Log("Category Created");
											//Land Text Channel Create
											message.guild.channels.create({ name: LandName.land_name+"", type: ChannelType.GuildCategory, reason: 'Land Channel' })
											.then(land => {
												// land.setParent(categoryid);
												const landid_category=land.id;
												Utality.Log(message.guild);
												Utality.Log("Channel ID: "+landid_category);
												Utality.Log("Land ID: "+LandName.id);


												// //Adding Important Server Features
												// var sql = 'INSERT INTO channels (server_id,channel_name,channel_id,category_id,land_id) VALUES (?,?,?,?,?)'
												
												// con.query(sql, [message.guild.id,message.guild.name,landid,categoryid,LandName.id], function (err, result) {
												// 	if (err) throw err 
												// 	Utality.Log("Channel Created");
												// 	var json = {"Channel": LandName.land_name};
												// 	Utality.Embed(message,json,"Land Created","A New Land in World Has Been Created");
												// })
											
											}).catch(console.error).then(Utality.Log("Finally"));
										})
		
									});
									}).catch(console.error);
							})
							
							});
							
				}
			
				function releaseQuery() {
					Utality.Log("Log Out")
					// return the query back to the pool
					conn.release();
				}
			
				queryData();
				releaseQuery();
				Utality.Log(`All Connections ${con._allConnections.length}`);
				Utality.Log(`Acquiring Connections ${con._acquiringConnections.length}`);
				Utality.Log(`Free Connections ${con._freeConnections.length}`);
				Utality.Log(`Queue Connections ${con._connectionQueue.length}`);
			});
		
					
		}catch(e){
			Utality.Log(e);
		}
		
	}
}
