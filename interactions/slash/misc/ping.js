/**
 * @type {import('../../../typings').SelectInteractionCommand}
 */

const { SlashCommandBuilder,ActionRowBuilder,EmbedBuilder,StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check the bot average ping!'),
	async execute(interaction, client) {

		const help_menu = new StringSelectMenuBuilder()
		    .setCustomId('select')
		    .setPlaceholder('Nothing selected')
		    .setOptions(new StringSelectMenuOptionBuilder({
				label: 'Select me',
				description: 'This is a description',
				value: 'first_option',
			}), new StringSelectMenuOptionBuilder({
				label: 'You can select me too',
				description: 'This is also a description',
				value: 'second_option',
			}),
		)
	
			await interaction.reply({ content: 'Pong!', ephemeral: true, components: [new ActionRowBuilder().addComponents(help_menu)] });
	},
};