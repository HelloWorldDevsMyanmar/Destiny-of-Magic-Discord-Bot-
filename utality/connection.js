var mysql = require('mysql');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
var Utality = require(appDir+'/utality/utality');
const { mysql_user, mysql_pass, mysql_server, mysql_port,mysql_db} = require(appDir+"/config.json");

// var con = mysql.createConnection({
//     host: '127.0.0.1',
//     port: '8889',
//     user: 'root',
//     password: 'root',
//     database: 'dangame'
// })

config = {
    connectionLimit: 10,
    host: mysql_server,
    port: mysql_port,
    user: mysql_user,
    password: mysql_pass,
    database: mysql_db,
    waitForConnections: true,
    multipleStatements: true
  };

  var con = mysql.createPool(config);
  Utality.Log(con);
  // Attempt to catch disconnects 
  con.on('connection', function (connection) {
    console.log('DB Connection established');

    con.on('error', function (err) {
      console.error(new Date(), 'MySQL error', err.code);
    });
    con.on('close', function (err) {
      console.error(new Date(), 'MySQL close', err);
    });

  });
module.exports = con;