var mysql = require('mysql');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
var Utality = require(appDir+'/utality/utality');
// var con = mysql.createConnection({
//     host: '127.0.0.1',
//     port: '8889',
//     user: 'root',
//     password: 'root',
//     database: 'dangame'
// })

config = {
    connectionLimit: 10,
    host: '127.0.0.1',
    port: '3396',
    user: 'root',
    password: 'root',
    database: 'destiny_of_magic',
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