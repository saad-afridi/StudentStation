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

const skipSession = (state) => {
	// Work -> Long Break
	if (this.state.session === 7) {
		this.setState({
			alarm: this.state.pom[2],
			session: this.state.session + 1,
		});
	}
	// Work -> Short break
	else if (this.state.session % 2 === 1) {
		this.setState({
			alarm: this.state.pom[1],
			session: this.state.session + 1,
		});
	}
	// Short or Long Break -> Work
	else {
		if (this.state.session < 7) {
			this.setState({
				alarm: this.state.pom[0],
				session: this.state.session + 1,
			});
		} else {
			this.setState({ alarm: this.state.pom[0], session: 1 });
		}
	}
};
