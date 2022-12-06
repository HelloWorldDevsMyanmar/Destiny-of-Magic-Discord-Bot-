const { SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Invite the bot to your server!'),
	async execute(interaction) {
        
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('ngrloemaluke')
                .setLabel('Click me!')
                .setStyle(ButtonStyle.Primary),
        );
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Invite the bot to your server!')
			.setURL('https://xnxx.com')
			.setDescription('Invite the bot to your server!');

		await interaction.reply({ content: 'I think you should,', ephemeral: true, embeds: [embed], components: [row] });
        
	},
};