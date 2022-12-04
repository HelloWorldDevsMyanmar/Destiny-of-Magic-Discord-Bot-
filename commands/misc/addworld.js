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
	name: 'addworld',
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
			var sql = 'INSERT INTO world (name) VALUES (?)'
			con.query(sql, [args[0]], function (err, result) {
				if (err) throw err
				console.log('1 record inserted')
			})
			var sql_select = 'SELECT * FROM world'
			var world_array = [];
			con.query(sql_select, function (err, result) {
				if (err) throw err
				result.map(RowDataPacket => {
					world_array.push(RowDataPacket.name);
				})
				console.log(world_array.toString());
				message.channel.send({ content: 'Adding world Successful!' })
				message.channel.send({ content: 'Current worlds are' })
				message.channel.send({ content: world_array.toString() })
			})
		})
	}
}
