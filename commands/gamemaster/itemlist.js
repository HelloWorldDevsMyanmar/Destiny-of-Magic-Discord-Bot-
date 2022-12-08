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
	// Refer to typings.d.ts for available properties.

	execute (message, args) {
		
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
