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
 var con = require(appDir+'/utality/connection');
 module.exports = {
	name: 'landlist',
	// Refer to typings.d.ts for available properties.

	execute (message, args) {
		console.log(message)
		console.log(args)
	

		con.connect(function (err) {
			if (err) throw err
			console.log('Connected!')
			var sql_select = 'SELECT * FROM land'
			var land_array = [];
			con.query(sql_select, function (err, result) {
				if (err) throw err
				console.log(result);
				result.map(RowDataPacket => {
					land_array.push(RowDataPacket.land_name);
				})
				console.log(land_array.toString());
				message.channel.send({ content: 'Current lands are' })
				message.channel.send({ content: land_array.toString() })
			})
		})
	}
}
