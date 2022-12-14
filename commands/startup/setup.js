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
var Query = require(appDir+'/utality/query');

 module.exports = {
	name: 'setup',
	owner:true,
	description: "Invite the bot to your server!",
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
						if (!result.length) {Utality.Embed(message,result,"No Data","No Data");}
						result.map(RowDataPacket => {
							var json = {"Category": RowDataPacket.world_name};
							Utality.Embed(message,json,"World Created","A New World Has Been Created");
							//World Category
							message.guild.channels.create({ name: RowDataPacket.world_name+"", type: ChannelType.GuildText, reason: 'World Channel' })
							.then(category => {
									//Land SQL
									// const categoryid=category.id;
									var sql_land = Query.all_select_land;
									
									con.query(sql_land,[RowDataPacket.id], function (error, lands) {
										if (err) throw err 
										if (!lands.length) {Utality.Embed(message,result,"No Data","No Data");}
										lands.map(LandName =>{
											
											Utality.Log("Category Created");
											//Land Text Channel Create
											message.guild.channels.create({ name: LandName.land_name+"", type: ChannelType.GuildCategory, reason: 'Land Channel' })
											.then(land => {
												// land.setParent(categoryid);
												const landid_category=land.id;
												const landid=LandName.id;
												Utality.Log(message.guild);
												Utality.Log("Channel ID: "+landid_category);
												Utality.Log("Land ID: "+landid);
												var sql_terrain=Query.all_terrain;
												con.query(sql_terrain, function (err, Terrain) {
													if (err) throw err 
													if (!Terrain.length) {Utality.Embed(message,result,"No Data","No Data");}
													
													Utality.Log(Terrain);
													Terrain.forEach((data) => {
													var terrain_id=data.id;
													var terrain_name=data.terrain_name;
													var exist_sql=Query.check_exclude;
													
													con.query(exist_sql,[terrain_id,landid],function(err,condition){
															
															Utality.Log(condition.length)
															Utality.Log("TERRAIN ID")
															Utality.Log(terrain_id)
															Utality.Log('LAND ID')
															Utality.Log(landid)
															Utality.Log("------------------------")
															
															condition.forEach((databool) => {
																	Utality.Log(databool.DATABOOL);
																	Utality.Log("------------------------")
																	if(databool.DATABOOL!=1){
																			Utality.Log(exist_sql +" "+ terrain_id +" "+landid);
																			message.guild.channels.create({ name: terrain_name+"", type: ChannelType.GuildText, reason: 'Terrain Channel' })
																			.then(category => {
																				category.setParent(landid_category);

																						//Adding Important Server Features
																						//category_id = LandID
																				var sql = Query.insert_channel;
																				
																				con.query(sql, [message.guild.id,category.name,category.id,terrain_id,landid,RowDataPacket.id], function (err, result) {
																					if (err) throw err 
																					
																					Utality.Log("Terrain Created");
																					//var json = {"Terrain": terrain_name};
																					//Utality.Embed(message,json,"Terrain Created","A New Terrain in "+LandName.land_name+" Has Been Created");
																				})
																				var land_terrain_sql = Query.insert_terrain_land;
																				
																				con.query(land_terrain_sql, [terrain_id,landid], function (err, result) {
																					if (err) throw err 
																				
																					Utality.Log("Land And Terrain Linked");
																					var json = {"Terrain": terrain_name};
																					Utality.Embed(message,json,"Terrain And Land Linked","A New Terrain in "+LandName.land_name+" Has Been Linked");
																				})
																				// var countchannel=Query.count_channel;
																				// con.query(countchannel, function (err, result) {
																				// 	if (err) throw err
																					
																					
																					
																				// 	 Utality.Embed(message,result[0],"Channel Count","Getting How Many Channel Count In Server");
																				// });
																			});
															}
															});
															
															
													});
								
													

													})
													
													
												})



												
											
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
			
				function ownercheck(server_id,discord_id){
					var sql_select = Query.select_count_owner;
					//World SQL
					con.query(sql_select,[server_id,discord_id], function (err, result) {
						Utality.Log(sql_select)
						Utality.Log(server_id)
						Utality.Log(discord_id)
						Utality.Log(result)
						if (err) throw err
                        if (!result.length) {Utality.Embed(message,result,"No Permission","Permission Denied");}
						result.map(Query =>{
                            Utality.Log("QUWEY")
                            Utality.Log(Query.count)
							// var json = {"Resources ": ResourceName.resource_name};
							if(Query.count>0){
								queryData();
							}else{Utality.Embed(message,result,"No Permission","Permission Denied");}
							
						});
					});
				}
				ownercheck(message.guildId,message.author.id);
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