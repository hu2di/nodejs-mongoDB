var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('assert');
var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to server.");
	//insertDocument(db, function() {
	findRestaurants(db, function() {
	//updateRestaurants(db, function() {
		db.close();
	});
});

var insertDocument = function(db, callback) {
	db.collection('restaurants').insertOne( {
		"address" : {
			"street" : "2 Avenue",
			"zipcode" : "10075",
			"building" : "1480",
			"coord" : [ -73.9557413, 40.7720266 ]
		},
		"borough" : "Manhattan",
		"cuisine" : "Italian",
		"grades" : [
			{
				"date" : new Date("2014-10-01T00:00:00Z"),
				"grade" : "A",
				"score" : 11
			},
			{
				"date" : new Date("2014-01-16T00:00:00Z"),
				"grade" : "B",
				"score" : 17
			}
		],
		"name" : "Vella",
		"restaurant_id" : "41704260"
	}, function(err, result) {
		assert.equal(err, null);
		console.log("Inserted a document into the restaurants collection.");
		callback(result);
	});
};

var findRestaurants = function(db, callback) {
	//Query for All Documents in a Collection
	var cursor = db.collection('restaurants').find();
	
	//Query by a Top Level Field
	//var cursor = db.collection('restaurants').find( { "borough": "Manhattan" } );
	
	//Query by a Field in an Embedded Document
	//var cursor = db.collection('restaurants').find( { "address.zipcode": "10075" } );
	
	//Query by a Field in an Array
	//var cursor = db.collection('restaurants').find( { "grades.grade": "B" } );
	
	//Greater Than Operator ($gt)
	//var cursor = db.collection('restaurants').find( { "grades.score": { $gt: 30 } } );
	
	//Less Than Operator ($lt)
	//var cursor = db.collection('restaurants').find( { "grades.score": { $lt: 10 } } );
	
	//Logical AND
	//var cursor = db.collection('restaurants').find( { "cuisine": "Italian", "address.zipcode": "10075" });
	
	//Logical OR
	//var cursor = db.collection('restaurants').find( { $or: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ] });
    
	//Sort Query Results
	//var cursor = db.collection('restaurants').find().sort( { "borough": 1, "address.zipcode": 1 } );
	
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

var updateRestaurants = function(db, callback) {
	db.collection('restaurants').updateOne(
	{ "name" : "Juni"},
	{
		$set: { "cuisine": "American (New)" },
		$currentDate: { "lastModified": true }
	}, function(arr, result) {
		console.log(result);
		callback();
	});
};


