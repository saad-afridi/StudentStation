import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000'

export const authLogin = (userData) => (dispatch) => {
	console.log(userData);
	axios
		.post('/api/users/login', userData)
		.then((res) => {
			return dispatch({
				type: 'USER-LOGIN',
				payload: res,
			});
		})
		.catch((err) => console.log(err));
};

export const authRegister = (userData) => (dispatch) => {
	console.log(userData);
	axios
		.post('/api/users/register', userData)
		.then((res) =>
			dispatch({
				type: 'USER-REGISTER',
				payload: userData,
			})
		)
		.catch((err) => console.log(err));
};
export default authLogin;
