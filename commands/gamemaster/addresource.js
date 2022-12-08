/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
const { dirname } = require('path')
const appDir = dirname(require.main.filename)
var Utality = require(appDir + '/utality/utality')
var Query = require(appDir+'/utality/query');
 
module.exports = {
	name: 'addresource',
	description: "Reloads a command",
	args: true,
	cooldown: 5,
	// Refer to typings.d.ts for available properties.

	async execute (message, args) {
		Utality.Log(message)
		Utality.Log(args)
		var con = require(appDir + '/utality/connection')
		Utality.Log('Connected')
		con.getConnection(function (err, conn) {
			function queryData () {
				var sql_select = Query.all_resource;

				//Resource SQL
				con.query(sql_select, function (err, result) {
					if (err) throw err
					if (!result.length) {Utality.Embed(message,result,"No Data","No Data");}
					result.map(ResourceName => {
						var json = { 'Resource ': ResourceName.resource_name }
						Utality.Embed(
							message,
							json,
							'Resource List',
							'List How Many Resource In This Game.'
						)
					})
				})
			}
			function AddData (world_name, data, resource_quantity, fixed_amount) {
				var sql_select_world = Query.select_world_name;
				con.query(sql_select_world, ['%' + world_name + '%'], function (
					err,
					result
				) {
					if (err) throw err
					if (!result.length) {Utality.Embed(message,result,"No Data","No Data");}
					Utality.Log('1 record inserted')
					Utality.Log(result[0].id)
					var world_id = result[0].id

					var sql =Query.insert_resource;
						
					con.query(
						sql,
						[world_id, data, resource_quantity, fixed_amount],
						function (err, result) {
							if (err) throw err
							Utality.Log('1 record inserted')
							var json = {
								'Resource': data,
								'Quantity': resource_quantity,
								'Fixed Amount': fixed_amount
							}
							Utality.Embed(message, json, 'A New Resource Added', ' ')
						}
					)
				})
			}

			function releaseQuery () {
				Utality.Log('Log Out')
				// return the query back to the pool
				conn.release()
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
							if (args[0] == null || args[1] == null || args[2] == null || args[3] == null) {
								message.channel.send({ content: "Correct Command: "+Utality.Prefix+"addresource worldname resourcename quantity fixed_amount" });
							}
							else{
								AddData(args[0],args[1],args[2],args[3])
							}
						}else{Utality.Embed(message,result,"No Permission","Permission Denied");}
						
					});
				});
			}
			ownercheck(message.guildId,message.author.id);

			
			//queryData()
			releaseQuery()
			Utality.Log(`All Connections ${con._allConnections.length}`)
			Utality.Log(`Acquiring Connections ${con._acquiringConnections.length}`)
			Utality.Log(`Free Connections ${con._freeConnections.length}`)
			Utality.Log(`Queue Connections ${con._connectionQueue.length}`)
		})
	}
}
