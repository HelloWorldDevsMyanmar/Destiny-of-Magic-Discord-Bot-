/**
 * @file Sample help command with slash command.
 * @author Naman Vrati & Thomas Fournier
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
var Utality = require(appDir+'/utality/utality');
var Query = require(appDir+'/utality/query');

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.
    /**
     * @param {Client} client
     */
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription(
			"List all commands of bot or info about a specific command."
		)
		.addStringOption((option) =>
			option
				.setName("command")
				.setDescription("The specific command to see the info of.")
		),

	async execute( interaction, client) {
		/**
		 * @type {string}
		 * @description The "command" argument
		 */
		/**
		 * @type {EmbedBuilder}
		 * @description Help command's embed
		 */
Utality.Log(interaction)

await interaction.deferReply({ ephemeral: false });
        
const categories = readdirSync("./commands/")

const embed = new EmbedBuilder()
	.setColor(client.color)
	.setDescription(`${client.i18n.get(language, "utilities", "help_desc")}`)

const row = new ActionRowBuilder()
	.addComponents([
		new StringSelectMenuBuilder()
			.setCustomId("help-category")
			.setPlaceholder(` Choose`)
			.setMaxValues(1)
			.setMinValues(1)
			/// Map the categories to the select menu
			.setOptions(categories.map(category => {
				return new StringSelectMenuOptionBuilder()
					.setLabel(category)
					.setValue(category)
				}
			))
		])

	interaction.editReply({ embeds: [embed], components: [row] }).then(async (msg) => {
		let filter = (i) => (i.isStringSelectMenu()) && i.user && i.message.author.id == client.user.id;
		let collector = await msg.createMessageComponentCollector({ 
			filter,
			time: 60000 
		});
		collector.on('collect', async (m) => {
			if(m.isStringSelectMenu()) {
				if(m.customId === "help-category") {
					await m.deferUpdate();
					let [directory] = m.values;

					const embed = new EmbedBuilder()
						.setAuthor({ name: `${interaction.guild.members.me.displayName} Help Command!`, iconURL: interaction.guild.iconURL({ dynamic: true })})
						.setDescription(`The bot prefix is: \`/\``)
						.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
						.setColor(client.color)
						.addFields({ name: `❯  ${directory.toUpperCase()} [${client.slash.filter(c => c.category === directory).size}]`, value: `${client.slash.filter(c => c.category === directory).map(c => `\`${c.name.at(-1)}\``).join(", ")}`, inline: false })
						.setFooter({ text: `© ${interaction.guild.members.me.displayName} | Total Commands: ${client.slash.size}`, iconURL: client.user.displayAvatarURL({ dynamic: true })})

					interaction.editReply({ embeds: [embed] });
				}
			}
		});

	collector.on('end', async (collected, reason) => {
		if(reason === 'time') {
			const timed = new EmbedBuilder()
			.setColor(client.color)

			interaction.editReply({ embeds: [timed], components: [] });
		}
	});
})
	}
};
