import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000'

const header_info = {'Content-type': 'application/json'}

export const authLogin = (userData) => (dispatch) => {
	console.log(userData);
	axios
		.post('/api/users/login', userData, header_info)
		.then((res) => {
            console.log(res)
			return dispatch({
				type: 'USER-LOGIN',
				payload: res.data,
			});
		})
		.catch((err) => {
            console.log(err.response.data);
            return dispatch({
                type: err.response.data.type,
                payload: err.response.data.message
            })
        });
};

export const authRegister = (userData) => (dispatch) => {
	console.log(userData);
	axios
		.post('/api/users/register', userData, header_info)
		.then((res) =>
			dispatch({
				type: 'USER-REGISTER',
				payload: res.data,
			})
		)
		.catch((err) => console.log(err));
};
