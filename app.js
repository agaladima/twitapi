const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const moment = require('moment');
const Twit = require('twit');
const config = require('./js/config.js');
const T = new Twit(config);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.locals.moment = require('moment');

//use pug
app.set('view engine', 'pug');

// to use css
app.use('/static', express.static('css'));

let myTwitter = [];
let numFollowers = [];
let profileImage = [];
let profileBanner = [];
//get credentials
T.get('account/verify_credentials', {skip_status: false}, function (err, data, response) {
	//console.log(data);
	myTwitter = data['screen_name'];
	numFollowers = data['followers_count'];
	profileImage = data['profile_image_url'];
	profileBanner = data['profile_banner_url'];
});

//get five most recent friends
let friends = {};
T.get('friends/list', { count: 5 },  function (err, data, response) {
	friends = data.users;
	//console.log(friends[0]);
});

//get five most recent timeline tweets
let timeline = {};
T.get('statuses/user_timeline', {screen_name: "GSMbyAIR", count: 5}, function(err, data, response) {
	//console.log("id ", req.screenName2);
	timeline = data;
	//console.log(timeline);
});

//get five most recent DMs
let directmssg = {};
T.get('direct_messages', { count: 5 },  function (err, data, response) {
	directmssg = data;
	//console.log('direct_messages  ', data);
});

//render the data
app.get('/', (req, res) => {
	res.render('index', {
		myTwit: myTwitter,
		myFollowers: numFollowers,
		profileImg: profileImage,
		profileBnr: profileBanner,
		'elFriends': friends,
		'Tweets': timeline,
		'elDMs': directmssg
	});
});

//post tweet and refresh page
app.post('/', (req, res)=>{
	T.post("statuses/update", { status: req.body.tweetSent }).then(()=>{
		res.redirect('/');
	});
	
});

//error pages
app.use(function(req, res) {
	res.status(400);
	res.render('404.pug', {title: '404: File Not Found'});
});

app.use(function(error, req, res, next) {
	res.status(500);
	res.render('500.pug', {title:'500: Internal Server Error', error: error});
});

app.listen(3000, () => {
	console.log('The app is running on local host:3000!');
});