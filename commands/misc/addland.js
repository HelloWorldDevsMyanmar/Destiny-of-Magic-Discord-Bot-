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
var Query = require(appDir + '/utality/query')

module.exports = {
	name: 'addland',
	// Refer to typings.d.ts for available properties.

	execute (message, args) {
		Utality.Log(message)
		Utality.Log(args)
		var con = require(appDir + '/utality/connection')
		Utality.Log('Connected')
		con.getConnection(function (err, conn) {
			function queryData () {
				var sql_select = Query.all_land
				//World SQL
				con.query(sql_select, function (err, result) {
					if (err) throw err
					if (!result.length) {
						Utality.Embed(message, result, 'No Data', 'No Data')
					}
					result.map(LandName => {
						var json = { 'Land ': LandName.land_name }
						// Utality.Embed(
						// 	message,
						// 	json,
						// 	'Land List',
						// 	'List How Many Land In This Game.'
						// )
					})
				})
			}
			function AddData (data, world) {
				var sql_select_world = Query.select_world_name
				con.query(sql_select_world, ['%' + world + '%'], function (
					err,
					result
				) {
					if (err) throw err
					if (result == [] || !result.length) {
						Utality.Embed(message, { 'Correct Command:': '?addland LandName WorldName'}, 'No Data', 'Your World Name does not exist.')
					} else {
						Utality.Log('query selected')
						Utality.Log(result[0].id)
						var world_id = result[0].id
						var sql = Query.insert_land
						con.query(sql, [data, world_id], function (err, result) {
							if (err) throw err
							Utality.Log('1 record inserted')
							var json = { 'Land ': data }
							Utality.Embed(message, json, 'A New Land Added', ' ')
						})
						queryData()
					}
				})
			}

			function releaseQuery () {
				Utality.Log('Log Out')
				// return the query back to the pool
				conn.release()
			}

			if (args[0] == null || args[1] == null) {
				message.channel.send({ content: "Correct Command: ?addland LandName WorldName" });
			}
			else{
				AddData(args[0], args[1])
			}
			
			releaseQuery()
			Utality.Log(`All Connections ${con._allConnections.length}`)
			Utality.Log(`Acquiring Connections ${con._acquiringConnections.length}`)
			Utality.Log(`Free Connections ${con._freeConnections.length}`)
			Utality.Log(`Queue Connections ${con._connectionQueue.length}`)
		})

		// Utality.Log(message)
		// Utality.Log(args)

		// var con = require(appDir+'/utality/connection');
		// con.connect(function (err) {
		// 	if (err) throw err
		// 	Utality.Log('Connected!')
		// 	var sql = 'INSERT INTO land (land_name, world_id) VALUES (?)'
		// 	con.query(sql, [[args[0], args[1]]] , function (err, result) {
		// 		if (err) throw err
		// 		Utality.Log('1 record inserted')
		// 	})
		// 	var sql_select = 'SELECT * FROM land'
		// 	var land_array = [];
		// 	con.query(sql_select, function (err, result) {
		// 		if (err) throw err
		// 		Utality.Log(result);
		// 		result.map(RowDataPacket => {
		// 			land_array.push(RowDataPacket.land_name);
		// 		})
		// 		Utality.Log(land_array.toString());
		// 		message.channel.send({ content: 'Adding land Successful!' })
		// 		message.channel.send({ content: 'Current lands are' })
		// 		message.channel.send({ content: land_array.toString() })
		// 	})
		// })
	}
}
