const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');
const Twit = require('twit');
const config = require('./config.js');
const T = new Twit(config);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//use pug
app.set('view engine', 'pug');

// to use css
app.use('/static', express.static('css'));

// include main page route
// const mainRoutes = require('./routes');
// app.use(mainRoutes);

let myTwitter = [];
let numFollowers = [];
//get credentials
T.get('account/verify_credentials', {skip_status: false}, function (err, data, response) {
	//console.log(data);
	myTwitter = '@' + data['screen_name'];
	numFollowers = data['followers_count'];
});

//get five most recent friends
let friends = (req, res, next) => {
		T.get('friends/list', { count: 5 },  function (err, data, response) {
	  	friends = data;
	    console.log(friends.users[0]);
	});
};

//get five most recent timeline tweets
T.get('statuses/user_timeline', {screen_name: "GSMbyAIR", count: 5}, function(err, data, response) {
	//console.log("id ", req.screenName2);
	//console.log("req.tweets ",data);
});

//get five most recent DMs
T.get('direct_messages', { count: 5 },  function (err, data, response) {
	//console.log('direct_messages  ', data);
});

let tweet = (req, res, next) => {
    T.post();
};

app.get('/', (req, res) => {
	res.render('index', {
		myTwit: myTwitter,
		myFollowers: numFollowers,
	});
});

app.use(friends);

app.get('/', function (req, res) {
	req.params.friends;
});

app.listen(3000, () => {
	console.log('The app is running on local host:3000!');
});