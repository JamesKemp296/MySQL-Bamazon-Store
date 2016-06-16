var prompt = require('prompt');
 
  prompt.start();



var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Armoredmods296',
  database : 'Bamazon'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id" + connection.threadId); 
});

connection.query('SELECT * FROM Products', function(err, data) {
	if (err) throw err;
	console.log(data[1].Price);
});