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
     name: 'createshop',
     description: "Reloads a command",
     args: true,
     owner:true,
     cooldown: 5,
     // Refer to typings.d.ts for available properties.
 
     async execute (message, args) {
         Utality.Log(message)
         Utality.Log(args)
         var con = require(appDir + '/utality/connection')
         Utality.Log('Connected')
         con.getConnection(function (err, conn) {
             
             function AddData (terrain_name, land_name,shopname) {
                 var terrain_id
                 var land_id
                 
 
                 //Select terrain_id using terrain_name
                 function get_terrain_id () {
                     var sql_select_terrain = Query.select_terrain
                     con.query(sql_select_terrain, ['%' + terrain_name + '%'], function (
                         err,
                         result
                     ) {
                         if (err) throw err
                         if (result == [] || !result.length) {
                             Utality.Embed(
                                 message,
                                 {
                                     'Correct Command:': '?excludeterrainland TerrainName LandName'
                                 },
                                 'No Data',
                                 'Your Terrain Name does not exist.'
                             )
                         } else {
                             Utality.Log('query selected TERRAIN')
                             Utality.Log(result[0].id)
                             terrain_id = result[0].id
                             get_land_id()
                         }
                     })
                 }
 
                 //Select land_id using land_name
                 function get_land_id () {
                     var sql_select_land = Query.select_land
                     con.query(sql_select_land, ['%' + land_name + '%'], function (
                         err,
                         result
                     ) {
                         if (err) throw err
                         if (result == [] || !result.length) {
                             Utality.Embed(
                                 message,
                                 {
                                     'Correct Command:': '?excludeterrainland TerrainName LandName'
                                 },
                                 'No Data',
                                 'Your Land Name does not exist.'
                             )
                         } else {
                             Utality.Log('query selected LAND')
                             Utality.Log(result[0].id)
                             land_id = result[0].id
                             get_terrain_land_id()
                         }
                     })
                 }
                  //Select land_id using land_name
                  function get_terrain_land_id () {

                    var land_terrain_sql = Query.insert_terrain_land;
                    Utality.Log(land_terrain_sql)
                    Utality.Log(terrain_id)
                    Utality.Log(land_id)
																				
                    con.query(land_terrain_sql, [terrain_id,land_id], function (err, result) {
                        if (err) throw err 
                         Utality.Log('query selected TERRAIN LAND')
                         Utality.Log(result.insertId)
                         terrain_land_id = result.insertId
                         insert_into_shop(terrain_land_id)
                        
                    
                        
                    })

                   
                }
 
                 //insert into data exclude_terrain_in_land
                 function insert_into_shop (terrain_land_id) {
                     var sql = Query.insert_shop
                     con.query(sql, [shopname,terrain_land_id], function (err, result) {
                         Utality.Log(result)
                         if (err) throw err
                         Utality.Log('1 record inserted')
                         var json = { 'Terrain ': terrain_name, 'Land': land_name , 'Shop_Name': land_name }
                         Utality.Embed(message, json, 'This Shop has been Opened', ' ')
                     })
                    
                 }
 
                 get_terrain_id()
                 Utality.Log('shit')
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
                             if (args[0] == null || args[1] == null) {
                                 message.channel.send({
                                     content: 'Correct Command: ?excludeterrainland TerrainName LandName'
                                 })
                             } else {
                                 AddData(args[0], args[1],args[2])
                             }
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
 