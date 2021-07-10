const getLocalData = () => {
	return {
		authenticated: false,
		user: {
            username: '',
            password: ''
        },
	};
};

const initialState = getLocalData();

export default function authReducers(state = initialState, action) {
	switch (action.type) {
		case 'USER-LOGIN':
            console.log("ACTION PAYLOAD", action.payload);
			return { authenticated: true, user: action.payload};
		case 'USER-REGISTER':
            console.log("ACTION PAYLOAD", action.payload);
			return { authenticated: true, user: action.payload};
        case 'USER-LOGOUT':
            return { authenticated: false, user: {}}
		default:
			return state;
	}
}
