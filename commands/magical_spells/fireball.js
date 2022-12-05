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

module.exports = {
	name: 'fireball',
	// Refer to typings.d.ts for available properties.
	execute (message, args) {
		console.log(message)
		console.log(args)
		var opponent_json = { 
            'Current Hp ': '70',
            'Max Hp ': '100',
            'Current Mana': '100',
            'Max Mana': '100',
        }
		Utality.Embed(
			message,
			opponent_json,
			'Your Opponent',
			'Opponent took 30 damage'
		)
        var player_json = { 
            'Current Hp ': '100',
            'Max Hp ': '100',
            'Current Mana': '90',
            'Max Mana': '90',
        }
		Utality.Embed(
			message,
			player_json,
			'You',
			'You lost 10 Mana'
		)
	}
}
