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
	name: 'nationlist',
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
			var sql_select = 'SELECT * FROM nation'
			var nation_array = [];
			con.query(sql_select, function (err, result) {
				if (err) throw err
				result.map(RowDataPacket => {
					nation_array.push(RowDataPacket.name);
				})
				console.log(nation_array.toString());
				message.channel.send({ content: 'Current nations are' })
				message.channel.send({ content: nation_array.toString() })
			})
		})
	}
}
