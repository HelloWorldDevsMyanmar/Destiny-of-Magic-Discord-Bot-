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
	name: 'excludeterrainland',
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
			function AddData (terrain_name, land_name) {
				var terrain_id
				var land_id

				//Select terrain_id using terrain_name
				function get_terrain_id () {
					var sql_select_terrain = Query.select_terrain
					con.query(sql_select_terrain, ['%' + terrain_name + '%'], function (
						err,
						result
					) {
						if (err) throw err
						if (result == [] || !result.length) {
							Utality.Embed(
								message,
								{
									'Correct Command:': '?excludeterrainland TerrainName LandName'
								},
								'No Data',
								'Your Terrain Name does not exist.'
							)
						} else {
							Utality.Log('query selected')
							Utality.Log(result[0].id)
							terrain_id = result[0].id
							get_land_id()
						}
					})
				}

				//Select land_id using land_name
				function get_land_id () {
					var sql_select_land = Query.select_land
					con.query(sql_select_land, ['%' + land_name + '%'], function (
						err,
						result
					) {
						if (err) throw err
						if (result == [] || !result.length) {
							Utality.Embed(
								message,
								{
									'Correct Command:': '?excludeterrainland TerrainName LandName'
								},
								'No Data',
								'Your Land Name does not exist.'
							)
						} else {
							Utality.Log('query selected')
							Utality.Log(result[0].id)
							land_id = result[0].id
							insert_into_exclude()
						}
					})
				}

				//insert into data exclude_terrain_in_land
				function insert_into_exclude () {
					var sql = Query.insert_exclude_terrain_in_land
					con.query(sql, [terrain_id, land_id], function (err, result) {
						Utality.Log(result)
						if (err) throw err
						Utality.Log('1 record inserted')
						var json = { 'Terrain ': terrain_name, 'Land': land_name }
						Utality.Embed(message, json, 'This has been excluded', ' ')
					})
					queryData()
				}

				get_terrain_id()
				Utality.Log('shit')
			}

			function releaseQuery () {
				Utality.Log('Log Out')
				// return the query back to the pool
				conn.release()
			}

			if (args[0] == null || args[1] == null) {
				message.channel.send({
					content: 'Correct Command: ?excludeterrainland TerrainName LandName'
				})
			} else {
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
