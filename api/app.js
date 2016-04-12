'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var moment = require('moment-timezone');

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.listen(3050, function() {
	console.log('Example app listening on port 3050!');
});

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/snowapi';

// Method to connect to, use the database in the callback, and close the connection
// Callback is passed two parameters
// 1) the mongo database object
// 2) a method to call when done with the connection (so it can be closed);
var useDb = function(callback) {
	// Use connect method to connect to the Server
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			//HURRAY!! We are connected. :)
			console.log('Connection established to', url);

			// do some work here with the database.
			callback(db, function() {
				//Close connection
				db.close();
				console.log('Connection closed');
			});
		}
	});
};

router.get('/', function(req, res) {
	res.json({
		'error': false,
		'message': 'Please refer to documentation at' +
			'https://github.com/codeforeauclaire/snowparking'
	});
});

/// Helper methods
// From SO @ https://goo.gl/9hrWsI
/**
 *  * Returns a random integer between min (inclusive) and max (inclusive)
 *   * Using Math.round() will give you a non-uniform distribution!
 *    */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/// Methods to generate stub data
function pastTodaysCutOff() {
	var todaysCutOff = moment().startOf('day').hour(17).format();
	return (moment().diff(todaysCutOff, 'seconds') >= 0);
}
function getStartTime(daysAdd) {
	if (pastTodaysCutOff()) {
		return moment().tz('America/Chicago').startOf('day')
			.add(daysAdd + 1, 'day').format();
	} else {
		return moment().tz('America/Chicago').startOf('day')
			.add(daysAdd, 'day').format();
	}
}
function getEndTime(daysAdd) {
	if (pastTodaysCutOff()) {
		return moment().tz('America/Chicago').startOf('day')
			.add(daysAdd + 1, 'day').hour(17).format();
	} else {
		return moment().tz('America/Chicago').startOf('day')
			.add(daysAdd, 'day').hour(17).format();
	}
}

router.get('/status', function(req, res) {
	console.log('Called: /status');
	console.log('TODO: Use this data intelligently in return.');
	useDb(function(db, done) {
		var cursor = db.collection('notifications').find({ });
		cursor.each(function(err, doc) {
			console.log(doc);
		});
	});
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json(
		[
			{
				error: false,
			    alternateSideParking: false
			},
			{
				error: false,
			    alternateSideParking: ['even', 'odd'][getRandomInt(0, 1)],
				startTime: getStartTime(0),
			    endTime: getEndTime(0)
			}
		][getRandomInt(0, 1)]
	);
});

router.get('/schedule', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json(
		[
			{
				error: false,
				schedule: []
			},
			{
				error: false,
				schedule: [
					{
					    alternateSideParking: 'even',
						startTime: getStartTime(0),
					    endTime: getEndTime(0)
					},
					{
					    alternateSideParking: 'odd',
						startTime: getStartTime(1),
					    endTime: getEndTime(1)
					},
					{
					    alternateSideParking: 'even',
						startTime: getStartTime(2),
					    endTime: getEndTime(2)
					}
				]
			}
		][getRandomInt(0, 1)]
	);
});

router.post('/notification', function(req, res) {
	console.log('');
	useDb(function(db, done) {
		console.log('Body recieved:');
		console.log(req.body);
		db.collection('notifications').insertOne(req.body, function(err, result) {
			if (err) {
				console.log('Fail to insert:');
				console.log(err);
				done();
			}
			console.log('Inserted');
			done();
		});
	});
	res.json(
		{
			error: false
		}
	);
});

app.use('/', router);
