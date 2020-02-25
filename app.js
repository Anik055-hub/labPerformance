var express = require('express');
var home = require('./controllers/home');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var ejs = require('ejs');
var exSession = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(exSession({secret: 'my top secret value',saveUninitialized: true, resave: false}));
app.use(cookieParser());

app.use('/abc', express.static('xyz'));
app.use('/admin', express.static('abc'));

app.use('/home',home);
app.use('/login',login);
app.use('/logout',logout);


app.get('/', function(req, res){
	res.send('Welcome');
});


app.listen(3000, function(){
	console.log('node server started at 3000!');
});
