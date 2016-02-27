'use strict';
var express = require('express');
var app = express();
var router = express.Router();

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/snowapi';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);

		// do some work here with the database.

		//Close connection
		db.close();
	}
});

router.get('/', function(req, res) {
	res.json({
		'error': false,
		'message': 'Hello World'
	});
});

app.use('/', router);
