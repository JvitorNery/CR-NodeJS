'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb://jv:isban@ds155028.mlab.com:55028/wifchatbotconnect',(err,database)=>{
	if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  });
});
//app.set('view engine', 'ejs');
/*

app.listen('3000',function(){
	console.log("rodando na porta 3000");
});
*/
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
	//res.send("olar");
	
	db.collection('mensagens').find().toArray(function(err, results) {
  	console.log(results)
// 	res.sendFile('/Users/Diego/Desktop/ISBAN/jnery/node js codigos/crud/index.html');
  	res.render('/Users/Diego/Desktop/ISBAN/jnery/node js codigos/crud/index.ejs', {mensagens: results});
	});
});

app.post('/create',function(req,res){
	//console.log(req.body.nome);
	//console.log(req.body.sobrenome);

    db.collection('mensagens').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
    });
});