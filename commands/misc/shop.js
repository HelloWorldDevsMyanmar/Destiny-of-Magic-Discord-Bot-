/**
 * @file 
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */

 const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } = require('discord.js');
 const { dirname } = require('path');
 const appDir = dirname(require.main.filename);
 var Utality = require(appDir+'/utality/utality');
 var Query = require(appDir+'/utality/query');

 module.exports = {
	name: "shop",
	owner:true,
	description: "Invite the bot to your server!",
	// Refer to typings.d.ts for available properties.

	async execute(interaction, client) {
		try{
			var con = require(appDir+'/utality/connection');
		
			con.getConnection(function(err, conn) {
				
				function queryCapitalCityData(channel_id,channel_name) {
					var sql_select = Query.select_channel_id;
					//World SQL
					con.query(sql_select,[channel_id,channel_name], function (err, result) {
						Utality.Log(sql_select)
						Utality.Log(channel_id)
						Utality.Log(channel_name)
						if (err) throw err
                        if (!result.length) {Utality.Embed(interaction,result,"No Data","No Data");}
						result.map(Query =>{
                            Utality.Log("QUWEY")
                            Utality.Log(Query)
							// var json = {"Resources ": ResourceName.resource_name};
							Utality.Embed(interaction,Query,"Query Data List","Query Details");
						});
							
				});
			}
			
				function releaseQuery() {
					Utality.Log("Log Out")
					// return the query back to the pool
					conn.release();
				}
			
				queryCapitalCityData();
				releaseQuery();
			});

			const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions(
						{
							label: 'Weapons',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					),
			);
				
			const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Invite the bot to your server!')
			.setURL('https://xnxx.com')
			.setDescription('Invite the bot to your server!');
	
	
			await interaction.reply({ content: "embed", components: [row] });

			Utality.Log(interaction.customId)
			// if (interaction.customId === 'select') {
			// 	await interaction.update({ content: 'Something was selected!', components: [] });
			// }
		
		}catch(e){
			Utality.Log(e);
		}

	},
};
