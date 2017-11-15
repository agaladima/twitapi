const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', { name });
});


router.get('/table', (req, res) => {
	res.render('table');
});

router.get('/hello', (req, res) => {
	const name = req.cookies.username;
	if(name) {
		res.redirect('/');
	} else {
		res.render('hello', { name });
	}
});


router.post('/hello', (req, res) => {
	res.cookie('username', req.body.username);
	res.redirect('/');
});

router.post('/goodbye', (req, res) => {
	res.clearCookie('username');
	res.redirect('/hello');
});

module.exports = router;
