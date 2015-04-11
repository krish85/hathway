var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
	customerId : Number,
	name : String,
	cardId : Number,
	subPackage : Number,
	address : String
});

module.exports = mongoose.model('Customer', CustomerSchema);