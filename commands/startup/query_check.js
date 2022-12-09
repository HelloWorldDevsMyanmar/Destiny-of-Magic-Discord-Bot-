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
	owner:false,
	description: "Invite the bot to your server!",
	// Refer to typings.d.ts for available properties.

	execute (message, args) {
		Utality.Log(message)
		Utality.Log(args)
		try{
			var con = require(appDir+'/utality/connection');
		
			Utality.Log(message);
			con.getConnection(function(err, conn) {
				
				function queryData(server_id,discord_id) {
					Utality.Log(discord_id)
					Utality.Log(server_id)
					var exist_sql=Query.check_exclude;
													
				}
			
				function releaseQuery() {
					Utality.Log("Log Out")
					// return the query back to the pool
					conn.release();
				}
			
				queryData(message.guildId,message.author.id);
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
