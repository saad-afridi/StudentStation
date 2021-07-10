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


// @route POST api/users/login
// @desc Login User
// @access Public
router.post('/login', (req, res) => {
	console.log("LOGIN (POST)", req.body);
	const { username, password } = req.body;

	User.findOne({ username })
		.then((user) => {
			if (!user) {
				return res.status(400).json('Username does not exist');
			} else if (user.password != password) {
				return res.status(400).json('Password is incorrect');
			}
			return res.json(user);
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});


// @route POST api/users/register
// @desc Add new User
// @access Public
router.post('/register', (req, res) => {
	console.log("REGISTER (POST)", req.body);
	const { username, password } = req.body;
	const newUser = new User({ username, password });

	newUser
		.save()
		.then(() => res.json(newUser))
		.catch((err) => {
            console.log(err.name);
            console.log("ERROR! : ", err)
            return res.status(400).json('Error: ' + err);
        });
});


module.exports = router;
