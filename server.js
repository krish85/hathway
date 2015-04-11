var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/hathway');

var Customer = require('./models/customer');

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8383;

var router = express.Router();

//Routes

router.get('/', function(req, res){
	res.json({ message : "Welcome to Hathway cables" })
});

router.route('/customers')
	.post(function(req, res){
		var customer = new Customer();
		customer.name = req.body.name;
		customer.customerId = req.body.customerId;
		customer.cardId = req.body.cardId;
		customer.subPackage = req.body.subPackage;
		customer.address = req.body.address;

		customer.save(function(err){
			if(err)
				res.send(err);
			res.json({ message : "New customer added successfully" });
		});
	})

	.get(function(req,res){
		Customer.find(function(err, customers){
			if(err)
				res.send(err)
			res.json(customers)
		})
	});

	router.route('/customers/:customer_id')
		.get(function(req, res){
			Customer.findById(req.params.customer_id, function(err, customer){
				if(err)
					res.send(err)
				res.json(customer)
			})
		})
		.put(function(req,res){
			Customer.findById(req.params.customer_id, function(err, customer){
				if(err)
					res.send(err)
				customer.name = req.body.name;
		  		customer.customerId = req.body.customerId;
				customer.cardId = req.body.cardId;
				customer.subPackage = req.body.subPackage;
				customer.address = req.body.address;

				customer.save(function(err){
				if(err)
					res.send(err);
				res.json({ message : "Customer updated successfully" });
				});
			})
		})
		.delete(function(req, res){
			Customer.remove({
				_id: req.params.customer_id
			}, function(err, customer){
				if(err)
					res.send(err)
				res.json({ message : "Deleted Successfully" })
			})
		});


app.use('/hathway', router);

app.listen(port);

console.log("Hathway application is listening at port " + port);