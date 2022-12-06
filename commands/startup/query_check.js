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

module.exports = {
	name: 'querycheck',
	// Refer to typings.d.ts for available properties.

	execute (message, args) {
		Utality.Log(message)
		Utality.Log(args)
		try{
			var con = require(appDir+'/utality/connection');
		
			Utality.Log("Connected");
			con.getConnection(function(err, conn) {
				
				function queryData() {
					var sql_select = Query.all_terrain_in_land;
					//World SQL
					con.query(sql_select, function (err, result) {
					
						if (err) throw err 
						result.map(Query =>{
                            Utality.Log(Query)
							// var json = {"Resources ": ResourceName.resource_name};
							Utality.Embed(message,Query,"Query Data List","Query Details");
						});
							
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
