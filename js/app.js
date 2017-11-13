const express = require('express');
const app = express();

//use pug
app.set('view engine', 'pug');

//require config file
const T = require('./config.js');

//get five most recent friends
T.get('friends/list', { screen_name: 'GSMbyAIR' },  function (err, data, response) {
	let recFriends = [];
  	//recFriends = data;
 	//console.log(recFriends);
  	//console.log(data.users[0]['screen_name']);
	for (var i = 0; i < 5; i++) {
		recFriends.push(data.users[i]['screen_name']);
		console.log(data.users[i]['screen_name']);
	}
	console.log('<------------------------------------------------------------------->');
});

//get five most recent tweets
T.get('statuses/user_timeline', { screen_name: 'GSMbyAIR' },  function (err, data, response) {
  	let recTweets = [];
	//recTweets = data;
	//console.log(recTweets);
	//console.log(data[0]['text']);
	for (var i = 0; i < 5; i++) {
		recTweets.push(data[i]['text'])
		console.log(data[i]['text']);
	}
	console.log('<------------------------------------------------------------------->');
});

//get five most recent DMs
T.get('direct_messages', { screen_name: 'GSMbyAIR' },  function (err, data, response) {
	let recDM = [];
	//console.log(data[0]['text']);
	//console.log(data);
	for (var i = 0; i < 5; i++) {
		recDM.push(data[i]['text'])
		console.log(data[i]['text']);
	}
	console.log('<------------------------------------------------------------------->');
});

app.listen(3000, () => {
	console.log('The app is running on local host:3000!');
});