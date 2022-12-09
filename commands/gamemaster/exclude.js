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
 var Query = require(appDir + '/utality/query')
 
 module.exports = {
     name: 'exclude',
     description: "Reloads a command",
     owner:true,
     cooldown: 5,
     // Refer to typings.d.ts for available properties.
 
     async execute (message, args) {
         Utality.Log(message)
         Utality.Log(args)
         var con = require(appDir + '/utality/connection')
         Utality.Log('Connected')
         con.getConnection(function (err, conn) {
             function queryData () {
                 var sql_select = Query.select_all_exclude
                 //World SQL
                 con.query(sql_select, function (err, exclude) {
                     if (err) throw err
                     if (!exclude.length) {
                         Utality.Embed(message, exclude, 'No Data', 'No Data')
                     }
                     exclude.map(excluded => {
                        var terrainid=excluded.terrain_id;
                        var landid=excluded.land_id
                       
                        var sql_channel=Query.select_channel_ter_lan;
                        Utality.Log(message.guildId)
                        Utality.Log(landid)
                        Utality.Log(terrainid)
                        Utality.Log(sql_channel)
                        con.query(sql_channel,[message.guildId,terrainid,landid],function(err,channels){
                            if (err) throw err
                            channels.map(channela =>{
                                // Utality.Log(channela.channel_id);
                                const fetchedChannel = message.guild.channels.cache.get(channela.channel_id);
                                fetchedChannel.delete();
                                con.query(Query.delete_channel,[channela.channel_id],function(err,check){

                                });
                            })
                            

                        });

                       
                     })
                 })
             }
          
 
             function releaseQuery () {
                 Utality.Log('Log Out')
                 // return the query back to the pool
                 conn.release()
             }
         
             function ownercheck(server_id,discord_id){
                 var sql_select = Query.select_count_owner;
                 //World SQL
                 con.query(sql_select,[server_id,discord_id], function (err, result) {
                     Utality.Log(sql_select)
                     Utality.Log(server_id)
                     Utality.Log(discord_id)
                     Utality.Log(result)
                     if (err) throw err
                     if (!result.length) {Utality.Embed(message,result,"No Permission","Permission Denied");}
                     result.map(Query =>{
                         Utality.Log("QUWEY")
                         Utality.Log(Query.count)
                         // var json = {"Resources ": ResourceName.resource_name};
                         if(Query.count>0){
                            queryData()
                         }else{Utality.Embed(message,result,"No Permission","Permission Denied");}
                         
                     });
                 });
             }
             ownercheck(message.guildId,message.author.id);
 
             releaseQuery()
             Utality.Log(`All Connections ${con._allConnections.length}`)
             Utality.Log(`Acquiring Connections ${con._acquiringConnections.length}`)
             Utality.Log(`Free Connections ${con._freeConnections.length}`)
             Utality.Log(`Queue Connections ${con._connectionQueue.length}`)
         })
 
      
     }
 }
 