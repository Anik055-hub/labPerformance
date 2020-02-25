var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('home/index', {user: result});
	});
});

router.get('/view_users', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/view_users', {userlist: results});
			}else{
				res.redirect('/home');
			}
		});
});

router.get('/insert', function(req, res){
	userModel.insert(user, function(result){
		res.render('home/insert', {user: result});
	});
});

router.post('/insert', function(req, res){

	var user ={
		    id: req.params.id,
		    companyname: req.body.cname,
			jobtitle: req.body.title,
			joblocation: req.body.location,
			salary: req.body.salary
	};

	userModel.insert(user, function(status){
	 	if(status){
			//res.cookie('username', req.body.uname);
			res.redirect('/home');
		}else{
			res.send('invalid username/password');
		}
	});
});


router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
});

router.post('/edit/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/edit/'+req.params.id);
			}
		});
});

module.exports = router;
