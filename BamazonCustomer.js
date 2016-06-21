//Bamazon store customer vew

//Require npm modules
var mysql = require('mysql');
var inquirer = require("inquirer");

//Connect to Database.
var connection = mysql.createConnection({
	host: 'localhost',
	port:3306, 
	user: 'root',
	password: 'Armoredmods296', 
	database:'Bamazon'

}); // end of connection to database

connection.connect(function(err){
    if(err) throw err;
    console.log("connected");
    console.log();})

order(); //calls the order function

function order(){
  connection.query('SELECT * FROM Products',function(err,res){
  for(var i=0;i<res.length;i++){
    console.log(res[i].ProductName+" | "+res[i].DepartmentName+" | "+res[i].Price+" | "+res[i].StockQuantity);}
    console.log("-----------------------------------");})
     inquirer.prompt([{
        type: 'input',
        message: 'Which item would you like to purchase?',
        name: 'itemId'
       },{
       	type:'input',
       	message: 'How many would you like?',
       	name: 'quantity'
       }]).then(function (answers) {
        connection.query('SELECT * FROM Products WHERE ProductName = ?', answers.itemId, function(err,res){
          if(err) throw err;
           	if (answers.quantity > res[0].StockQuantity){
            console.log("I'm sorry we dont have that many in stock. Please select another item.");
            order();
          }else{
            var total = answers.quantity * res[0].Price
            console.log("Your total for "+answers.quantity +" "+ answers.itemId +" will be " +total +" dollars. Thanks!");
            connection.query('UPDATE Products SET StockQuantity = "'+(res[0].StockQuantity - answers.quantity)+'" WHERE ProductName = "'+answers.itemId+'"');
          }
        })
        });
} // end of ordering function