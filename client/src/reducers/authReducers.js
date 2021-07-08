const getLocalData = () => {
	return {
		authenticated: false,
		user: {},
	};
};

const initialState = getLocalData();

export default function authReducers(state = initialState, action) {
	switch (action.type) {
		case 'USER-LOGIN':
            console.log(action.payload);
			return { authenticated: true, user: action.payload};
		case 'USER-REGISTER':
            console.log(action.payload);
			return { authenticated: true, user: action.payload};
        case 'USER-LOGOUT':
            return { authenticated: false, user: {}}
		default:
			return state;
	}
}
