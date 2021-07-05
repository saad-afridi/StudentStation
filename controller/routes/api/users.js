const router = require('express').Router();
const User = require('../../../models/user.model');

// @route GET api/users/get-users
// @desc Get All Users
// @access Private
router.get('/get-users', (req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// @route POST api/users/register
// @desc Add new User
// @access Public
router.post('/register', (req, res) => {
	console.log(req.body);
	const { username } = req.body;
	const newUser = new User({ username });

	newUser
		.save()
		.then(() => res.json('User added successfully!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

// @route @GET api/users/login
// @desc Login User
// @access Public
router.get('/login', (req, res) => {
	const { username } = req.body;

	User.findOne({ username })
		.then((user) => {
			if (!user) {
				return res.status(400).json('Username does not exist');
			}
			return res.json('User Logged In Sucessfully!');
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});
module.exports = router;
