const router = require('express').Router();
const User = require('../../../models/user.model');

// @route GET api/users/get-users
// @desc Get All Users
// @access Private
router.get('/get-users', (req, res) => {
	console.log('Some tihng happened!');
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// @route POST api/users/register
// @desc Add new User
// @access Public
router.post('/register', (req, res) => {
	const username = req.body.username;
	const newUser = new User({ username });

	newUser
		.save()
		.then(() => res.json('User added successfully!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
