/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
 const { dirname } = require('path');
 const appDir = dirname(require.main.filename);
 var Utality = require(appDir+'/utality/utality');
 var Query = require(appDir+'/utality/query');
var check=false;
module.exports = {
	name: 'itemlist',
	description: "Reloads a command",
	owner:true,
	cooldown: 5,
	// Refer to typings.d.ts for available properties.

	async execute (message, args) {
		
		Utality.Log(check)
		Utality.Log(message)
		Utality.Log(args)
		try{
			var con = require(appDir+'/utality/connection');
		
			Utality.Log("Connected");
			con.getConnection(function(err, conn) {
				
				function queryData() {
					var sql_select = Query.all_item;
					//World SQL
					con.query(sql_select, function (err, result) {
					
						if (err) throw err 
						if (!result.length) {Utality.Embed(message,result,"No Data","No Data");}
						result.map(ItemName =>{
							var json = {"Item ": ItemName.item_name};
							Utality.Embed(message,json,"Item List","List How Many Item In This Game.");
						});
							
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
