import axios from 'axios';

export const authLogin = (userData, history) => (dispatch) => {
	console.log(userData);
	axios
		.post('/api/users/login', userData)
		.then((res) => history.push('/login'));
};
