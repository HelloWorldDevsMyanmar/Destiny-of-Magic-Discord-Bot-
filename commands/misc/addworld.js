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
	name: 'addworld',
	// Refer to typings.d.ts for available properties.

	execute (message, args) {
		Utality.Log(message)
		Utality.Log(args)
		var con = require(appDir + '/utality/connection')
		Utality.Log('Connected')
		con.getConnection(function (err, conn) {
			function queryData () {
				var sql_select = Query.all_world;
				//World SQL
				con.query(sql_select, function (err, result) {
					if (err) throw err
					if (!result.length) {Utality.Embed(message,result,"No Data","No Data");}
					result.map(WorldName => {
						var json = { 'World ': WorldName.world_name }
						Utality.Embed(
							message,
							json,
							'World List',
							'List How Many World In This Game.'
						)
					})
				})
			}
			function AddData (data) {
				var sql = Query.insert_world;
				con.query(sql, [data], function (err, result) {
					if (err) throw err
					
					Utality.Log('1 record inserted')
					var json = { 'World ': data }
					Utality.Embed(message, json, 'A New World Added', ' ')
				})
			}

			function releaseQuery () {
				Utality.Log('Log Out')
				// return the query back to the pool
				conn.release()
			}
			if (args[0] == null ) {
				message.channel.send({ content: "Correct Command: "+Utality.Prefix+"addworld world_name" });
			}
			else{
				AddData(args[0])
			}
		
			
			//queryData()
			releaseQuery()
			Utality.Log(`All Connections ${con._allConnections.length}`)
			Utality.Log(`Acquiring Connections ${con._acquiringConnections.length}`)
			Utality.Log(`Free Connections ${con._freeConnections.length}`)
			Utality.Log(`Queue Connections ${con._connectionQueue.length}`)
		})
	}
}
