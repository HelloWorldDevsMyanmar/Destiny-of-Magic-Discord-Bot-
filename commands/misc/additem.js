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
  
 module.exports = {
	 name: 'additem',
	 // Refer to typings.d.ts for available properties.
 
	 execute (message, args) {
		 Utality.Log(message)
		 Utality.Log(args)
		 var con = require(appDir + '/utality/connection')
		 Utality.Log('Connected')
		 con.getConnection(function (err, conn) {
			 function queryData () {
				 var sql_select = Query.all_world;
				 //World SQL
				 con.query(sql_select, function (err, result) {
					 if (err) throw err
					 if (!result.length) {Utality.Embed(message,result,"No Data","No Data");}
					 result.map(ItemName => {
						 var json = { 'Item ': ItemName.item_name }
						 Utality.Embed(
							 message,
							 json,
							 'Item List',
							 'List How Many Item In This Game.'
						 )
					 })
				 })
			 }
			 function AddData (data,cost,desc,stats) {
				 var sql = Query.insert_item;
				 con.query(sql, [data,cost,desc,stats], function (err, result) {
					 if (err) throw err
					 
					 Utality.Log('1 record inserted')
					 var json = { 'Item ': data }
					 Utality.Embed(message, json, 'A New Item Added', ' ')
				 })
			 }
 
			 function releaseQuery () {
				 Utality.Log('Log Out')
				 // return the query back to the pool
				 conn.release()
			 }
			 if (args[0] == null || args[1] == null || args[2] == null || args[3] == null) {
				message.channel.send({ content: "Correct Command: "+Utality.Prefix+"additem itemname cost description stats" });
			}
			else{
				AddData(args[0],args[1],args[2],args[3])
			}
			
			

			 //queryData()
			 releaseQuery()
			 Utality.Log(`All Connections ${con._allConnections.length}`)
			 Utality.Log(`Acquiring Connections ${con._acquiringConnections.length}`)
			 Utality.Log(`Free Connections ${con._freeConnections.length}`)
			 Utality.Log(`Queue Connections ${con._connectionQueue.length}`)
		 })
	 }
 }
 