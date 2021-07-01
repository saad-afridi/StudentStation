const initalState = {
	alarm: -2,
	paused: false,
	pomOn: false,
	pom: [25, 5, 30],
	session: 0,
};

export default function timerReducers(state = initalState, action) {
	switch (action.type) {
		case 'TOGGLE-PAUSE':
			return { ...state, paused: !state.paused };
		case 'SKIP-SESSION':
			return skipSession(state);
		default:
			return state;
	}
}


// Helper functions for state changes
const skipSession = (state) => {
	// Work -> Long Break
	if (state.session === 7) {
		return {
            ...state,
			alarm: state.pom[2],
			session: state.session + 1,
		}
	}
	// Work -> Short break
	else if (state.session % 2 === 1) {
		return {
            ...state,
			alarm: state.pom[1],
			session: state.session + 1,
		};
	}
	// Short or Long Break -> Work
	else {
		if (state.session < 7) {
			return {
                ...state,
				alarm: state.pom[0],
				session: state.session + 1,
			};
		} else {
			return ({ ...state, alarm: state.pom[0], session: 1 });
		}
	}
};



