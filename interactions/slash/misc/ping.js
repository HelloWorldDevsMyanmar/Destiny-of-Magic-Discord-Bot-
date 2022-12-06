const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check the bot average ping!'),
	async execute(interaction) {
		await interaction.reply('Ngr loe ma luke!');
	},
};