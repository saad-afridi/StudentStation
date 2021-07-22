const initialState = {
	username: '',
	password: '',
	general: '',
};

export default function authErrorsReducers(state = initialState, error) {
	switch (error.type) {
		case 'USERNAME':
			return { password: '', username: error.payload, general: '' };
		case 'PASSWORD':
			return { username: '', password: error.payload, general: '' };
		case 'GENERAL':
			return { ...state, general: error.payload };
		default:
			return state;
	}
}
