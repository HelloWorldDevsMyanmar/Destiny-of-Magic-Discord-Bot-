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
 
 module.exports = {
	name: 'addland',
	// Refer to typings.d.ts for available properties.

	execute (message, args) {


	
		console.log(message)
		console.log(args)
		var con = require(appDir+'/utality/connection');
		Utality.Log("Connected");
		con.getConnection(function(err, conn) {
				
				function queryData() {
					var sql_select = 'SELECT * FROM land'
					//World SQL
					con.query(sql_select, function (err, result) {
					
						if (err) throw err 
						result.map(LandName =>{
							var json = {"Land ": LandName.land_name};
							Utality.Embed(message,json,"Land List","List How Many Land In This Game.");
						});
							
				});
			}
				function AddData(data,world_id) {
					var sql = 'INSERT INTO land (land_name, world_id) VALUES (?,?)'
					con.query(sql, [data,world_id], function (err, result) {
					if (err) throw err
					Utality.Log('1 record inserted')
					var json = {"Land ": data};
					Utality.Embed(message,json,"A New Land Added"," ");
				})
					
			}
			
				function releaseQuery() {
					Utality.Log("Log Out")
					// return the query back to the pool
					conn.release();
				}

				AddData(args[0],args[1]);
				queryData();
				releaseQuery();
				Utality.Log(`All Connections ${con._allConnections.length}`);
				Utality.Log(`Acquiring Connections ${con._acquiringConnections.length}`);
				Utality.Log(`Free Connections ${con._freeConnections.length}`);
				Utality.Log(`Queue Connections ${con._connectionQueue.length}`);
				
		});


		// console.log(message)
		// console.log(args)
	
		// var con = require(appDir+'/utality/connection');
		// con.connect(function (err) {
		// 	if (err) throw err
		// 	console.log('Connected!')
		// 	var sql = 'INSERT INTO land (land_name, world_id) VALUES (?)'
		// 	con.query(sql, [[args[0], args[1]]] , function (err, result) {
		// 		if (err) throw err
		// 		console.log('1 record inserted')
		// 	})
		// 	var sql_select = 'SELECT * FROM land'
		// 	var land_array = [];
		// 	con.query(sql_select, function (err, result) {
		// 		if (err) throw err
		// 		console.log(result);
		// 		result.map(RowDataPacket => {
		// 			land_array.push(RowDataPacket.land_name);
		// 		})
		// 		console.log(land_array.toString());
		// 		message.channel.send({ content: 'Adding land Successful!' })
		// 		message.channel.send({ content: 'Current lands are' })
		// 		message.channel.send({ content: land_array.toString() })
		// 	})
		// })
	}
}
