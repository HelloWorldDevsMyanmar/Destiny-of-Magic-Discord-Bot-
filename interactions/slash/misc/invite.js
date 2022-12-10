const { SlashCommandBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require('discord.js');
const { dirname } = require('path');
const internal = require('stream');
const appDir = dirname(require.main.filename);
var Utality = require(appDir+'/utality/utality');
var Query = require(appDir+'/utality/query');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Invite the bot to your server!'),
	async execute(interaction, client) {
		var json = { 'Invite ': "https://discord.com/oauth2/authorize?client_id="+interaction.guild.members.me.id+"&permissions=70282305&scope=bot" }

		const avatar = interaction.guild.members.me.displayAvatarURL()
		const embed = new EmbedBuilder()
		.setTitle("Invite the bot To Your Server!")
		.setThumbnail(`${avatar}`)
		.setColor(0x303236)
		 .setDescription(`**[Click Here](https://discord.com/api/oauth2/authorize?client_id=${interaction.guild.members.me.id}&permissions=36768832&scope=applications.commands%20bot)**`)
        .setTimestamp()
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()});

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Invite")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${interaction.guild.members.me.id}&permissions=2184310032&scope=bot%20applications.commands`)
                    .setEmoji("🔗")
                    .setStyle(ButtonStyle.Link),
					new ButtonBuilder()
                   .setLabel("Github")
                   .setStyle(ButtonStyle.Link)
                .setURL("https://github.com/HelloWorldDevsMyanmar/Destiny-of-Magic-Discord-Bot-"),	
            )
			// .addComponents(
            //     new ButtonBuilder()
            //         .setLabel("Support Us")
            //         .setURL(`https://paypal.me/htutz?country.x=RS&locale.x=en_US`)
            //         .setEmoji("💵")
            //         .setStyle(ButtonStyle.Link)
            // )

			await interaction.reply({ embeds: [embed], components: [row] });
    }
	}