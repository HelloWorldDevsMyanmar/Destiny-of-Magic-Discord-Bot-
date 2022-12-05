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
	name: 'landlist',
	// Refer to typings.d.ts for available properties.

	execute (message, args) {
		console.log(message)
		console.log(args)
		try{
			var con = require(appDir+'/utality/connection');
		
			Utality.Log("Connected");
			con.getConnection(function(err, conn) {
				
				function queryData() {
					var sql_select = 'SELECT * FROM land'
					//World SQL
					con.query(sql_select, function (err, result) {
					
						if (err) throw err 
						result.map(Land =>{
							var json = {"Current Land are : ": Land.land_name};
							Utality.Embed(message,json,"Land List","Current Lands Are.");
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
