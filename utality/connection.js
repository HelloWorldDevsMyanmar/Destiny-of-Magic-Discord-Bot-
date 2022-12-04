var mysql = require('mysql');

var con = mysql.createConnection({
    host: '127.0.0.1',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'dangame'
})

module.exports = con;