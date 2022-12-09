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
 var Query = require(appDir+'/utality/query');
 const { PermissionsBitField } = require('discord.js');
 module.exports = {
     name: 'addowner',
     description: "Reloads a command",
	 args: true,
     owner:false,
     cooldown: 5,
     // Refer to typings.d.ts for available properties.
 
     async execute (message, args) {
         Utality.Log(message)
         Utality.Log(args)
         var con = require(appDir + '/utality/connection')
         Utality.Log('Connected')
         con.getConnection(function (err, conn) {
             function queryData () {
                 var sql_select = Query.select_owner;
                 //World SQL
                 con.query(sql_select,[message.guildId], function (err, result) {
                     if (err) throw err
                     if (!result.length) {Utality.Embed(message,result,"No Data","No Data");}
                     result.map(Owner => {
                         var json = { 'Owner List ': '<@'+Owner.discord_user_id+'>' }
                         Utality.Embed(
                             message,
                             json,
                             'Owner List',
                             'List How Many Owners In This Game.'
                         )
                     })
                 })
             }
             function AddData (data,server_id,server_name) {
                 var sql = Query.insert_owner;
                 var data = data.replace(/\D/g, "");
                 con.query(sql, [server_id,server_name,data], function (err, result) {
                     if (err) throw err
                     
                     Utality.Log('1 record inserted')
                     var json = { 'Owner ': '<@'+data+'>' }
                     Utality.Embed(message, json, 'A New World Owner Added', ' ')
                 })
             }
 
             function releaseQuery () {
                 Utality.Log('Log Out')
                 // return the query back to the pool
                 conn.release()
             }
           
            let memberTarget = message.guild.members.cache.get(message.author.id);
            if (memberTarget.permissions.has(PermissionsBitField.Flags.Administrator)) {
                if (args[0] == null ) {
                    message.channel.send({ content: "Correct Command: "+Utality.Prefix+"add_gamemaster Discord_ID" });
                }
                else{
                    AddData(args[0],message.guildId,message.guild.name)
                }
               
            }else{
                message.reply(`<@${memberTarget.user.id}> do not have permissions to edit this game`);
            } 
             
            //  queryData()
             releaseQuery()
             Utality.Log(`All Connections ${con._allConnections.length}`)
             Utality.Log(`Acquiring Connections ${con._acquiringConnections.length}`)
             Utality.Log(`Free Connections ${con._freeConnections.length}`)
             Utality.Log(`Queue Connections ${con._connectionQueue.length}`)
         })
     }
 }
 