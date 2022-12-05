/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
 const { EmbedBuilder } = require('discord.js');
 const { dirname } = require('path');
const appDir = dirname(require.main.filename);
 var Utality = require(appDir+'/utality/utality');
 module.exports = {
	name: "connection_count",
	// Refer to typings.d.ts for available properties.

	execute(message, args) {
        try{
			var con = require(appDir+'/utality/connection');
		
			Utality.Log("Connected");
			con.getConnection(function(err, conn) {
				
				console.log(`All Connections ${con._allConnections.length}`);
				console.log(`Acquiring Connections ${con._acquiringConnections.length}`);
				console.log(`Free Connections ${con._freeConnections.length}`);
				console.log(`Queue Connections ${con._connectionQueue.length}`);
                
                var json = {"All Connections": con._allConnections.length, "Acquiring Connections": con._acquiringConnections.length, 
                "Queue Connections": con._connectionQueue.length,"Free Connections":con._freeConnections.length};
                 Utality.Embed(message,json,"Connection Count In MySQL","Getting How Many Connection Count In MySQL");
			});
		
					
		}catch(e){
			Utality.Log(e);
		}
	},
};
