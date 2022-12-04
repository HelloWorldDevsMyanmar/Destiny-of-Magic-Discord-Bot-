/**
 * @file Sample ping command
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
 module.exports = {
	name: 'addland',
	// Refer to typings.d.ts for available properties.

	execute (message, args) {
		console.log(message)
		console.log(args)
		var mysql = require('mysql')

		var con = mysql.createConnection({
			host: '127.0.0.1',
			port: '3306',
			user: 'root',
			password: 'lycanthrope',
			database: 'destinyofmagicdiscordbot'
		})

		con.connect(function (err) {
			if (err) throw err
			console.log('Connected!')
			var sql = 'INSERT INTO land (land_name, world_id) VALUES (?)'
			con.query(sql, [[args[0], args[1]]] , function (err, result) {
				if (err) throw err
				console.log('1 record inserted')
			})
			var sql_select = 'SELECT * FROM land'
			var land_array = [];
			con.query(sql_select, function (err, result) {
				if (err) throw err
				console.log(result);
				result.map(RowDataPacket => {
					land_array.push(RowDataPacket.land_name);
				})
				console.log(land_array.toString());
				message.channel.send({ content: 'Adding land Successful!' })
				message.channel.send({ content: 'Current lands are' })
				message.channel.send({ content: land_array.toString() })
			})
		})
	}
}
