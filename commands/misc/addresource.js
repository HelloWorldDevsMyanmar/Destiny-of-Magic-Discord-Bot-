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

module.exports = {
	name: 'addresource',
	// Refer to typings.d.ts for available properties.

	execute (message, args) {
		console.log(message)
		console.log(args)
		var con = require(appDir + '/utality/connection')
		Utality.Log('Connected')
		con.getConnection(function (err, conn) {
			function queryData () {
				var sql_select = 'SELECT * FROM resources'

				//Resource SQL
				con.query(sql_select, function (err, result) {
					if (err) throw err
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
				var sql_select_world = 'SELECT * FROM world WHERE world_name LIKE ?'
				con.query(sql_select_world, ['%' + world_name + '%'], function (
					err,
					result
				) {
					if (err) throw err
					Utality.Log('1 record inserted')
					Utality.Log(result[0].id)
					var world_id = result[0].id

					var sql =
						'INSERT INTO resources (world_id, resource_name, resource_quantity, fixed_amount) VALUES (?, ?, ?, ?)'
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

			AddData(args[0], args[1], args[2], args[3])
			queryData()
			releaseQuery()
			Utality.Log(`All Connections ${con._allConnections.length}`)
			Utality.Log(`Acquiring Connections ${con._acquiringConnections.length}`)
			Utality.Log(`Free Connections ${con._freeConnections.length}`)
			Utality.Log(`Queue Connections ${con._connectionQueue.length}`)
		})
	}
}
