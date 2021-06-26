import React from 'react';

// Material UI Components
import {
	AppBar,
	Toolbar,
	Typography,
	Tabs,
	Tab,
	IconButton,
	Container,
	Hidden,
	withWidth,
} from '@material-ui/core';

// Material UI Icons
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ListIcon from '@material-ui/icons/List';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';

// App Pages
import ToDoPage from './pages/Todo';
import TimerPage from './pages/Timer';
import CalculatorPage from './pages/Calculator';
import HomePage from './pages/Home';

// Theme and Styling
import { withStyles, ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { teal, grey, indigo, pink } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const themeLight = createMuiTheme({
	palette: {
		primary: {
			main: indigo[500],
		},
		secondary: {
			main: pink[500],
		},
		type: 'light',
		background: {
			default: grey[200],
		},
		elevated: {
			1: grey[300],
			2: grey[400],
			3: grey[500],
		},
	},
	typography: {
		h3: {
			fontFamily: ['Syne'],
		},
		fontFamily: ['Roboto'],
	},
});

const themeDark = createMuiTheme({
	palette: {
		primary: {
			main: '#8bbee9',
			contrastText: grey[900],
		},
		secondary: {
			main: teal['A400'],
		},
		type: 'dark',
		background: {
			default: '#14121f',
		},
		elevated: {
			1: '#283140',
			2: '#3c4960',
			3: '#43526c',
		},
		text: {
			primary: '#FFFFFFCC',
		},
	},
	typography: {
		h3: {
			fontFamily: ['Syne'],
		},
		fontFamily: ['Roboto'],
	},
});

const styles = () => ({
	title: {
		flexGrow: 1,
	},
	appBar: {
		color: '#FFFFFFCC',
		backgroundColor: '#2d3748',
	},
	appBarTabs: {
		marginRight: 'auto',
	},
	changeThemeButton: {
		marginLeft: 'auto',
	},
});

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedTab: 0,
			darkMode: false,

			// Timer attributes
			alarm: -2,
			paused: false,
			pomOn: false,
			pom: [25, 5, 30],
			session: 0,
		};
		this.setAlarmTime = this.setAlarmTime.bind(this);
	}

	componentDidMount = () => {
		document.title = 'Student Station';
		const selectedTab = localStorage.getItem('tab');
		if (selectedTab) {
			const savedTab = JSON.parse(selectedTab);
			this.setState({ selectedTab: savedTab });
		}
		const darkMode = localStorage.getItem('theme');
		if (darkMode) {
			const savedTheme = JSON.parse(darkMode);
			this.setState({ darkMode: savedTheme });
		}
		const pom = localStorage.getItem('pom-settings');
		if (pom) {
			const savedPom = JSON.parse(pom);
			this.setState({ pom: savedPom });
		}
		this.interval = setInterval(() => this.checkAlarmClock(), 1000);
	};

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const { darkMode } = this.state;
		const { classes } = this.props;
		return (
			<Container className="App">
				<ThemeProvider theme={darkMode ? themeDark : themeLight}>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Syne&display=swap"
						rel="stylesheet"
					/>
					<CssBaseline />
					<AppBar
						color={!darkMode ? 'primary' : 'default'}
						className={darkMode ? classes.appBar : ''}>
						<Toolbar>
							<Hidden only={['sm', 'xs']}>
								<Typography
									variant="h3"
									className={classes.title}>
									Student Station
								</Typography>
							</Hidden>
							<Tabs
								className={classes.appBarTabs}
								variant="scrollable"
								scrollButtons="auto"
								value={this.state.selectedTab}
								onChange={this.changeTabs}>
								<Tab
									label="Home"
									icon={
										<HomeIcon
											color={darkMode ? 'secondary' : ''}
										/>
									}
								/>
								<Tab
									label="Todo List"
									icon={
										<ListIcon
											color={darkMode ? 'secondary' : ''}
										/>
									}
								/>
								<Tab
									label="Timer"
									icon={
										<AccessAlarmIcon
											color={darkMode ? 'secondary' : ''}
										/>
									}
								/>
								<Tab
									label="Calculator"
									icon={
										<FaceIcon
											color={darkMode ? 'secondary' : ''}
										/>
									}
								/>
							</Tabs>
							<IconButton
								className={classes.changeThemeButton}
								onClick={this.changeThemes}>
								<Brightness4Icon />
							</IconButton>
						</Toolbar>
					</AppBar>

					{this.state.selectedTab === 0 && <HomePage />}

					{this.state.selectedTab === 1 && <ToDoPage />}

					{this.state.selectedTab === 2 && (
						<TimerPage
							updateAlarmTimeFn={this.setAlarmTime}
							checkAlarmFn={this.checkAlarmClock}
							togglePauseFn={this.togglePause}
							getPomFn={this.getPom}
							checkPomFn={this.checkPom}
							skipSessionFn={this.nextSession}
							checkProgressFn={this.calculateProgress}
							alarm={this.state.alarm}
							pomOn={this.state.pomOn}
							session={this.state.session}
							paused={this.state.paused}
							pom={this.state.pom}></TimerPage>
					)}

					{this.state.selectedTab === 3 && <CalculatorPage />}
				</ThemeProvider>
			</Container>
		);
	}

	changeTabs = async (e, newTab) => {
		await this.setState({ selectedTab: newTab });
		localStorage.setItem('tab', JSON.stringify(this.state.selectedTab));
	};

	changeThemes = async () => {
		await this.setState({ darkMode: !this.state.darkMode });
		localStorage.setItem('theme', JSON.stringify(this.state.darkMode));
	};

	// Sets the Alarm Time -> Converts hours + minutes to seconds
	setAlarmTime = (hours, minutes) => {
		let n1 = Number(hours);
		let n2 = Number(minutes);

		// Dealing with invalid input
		if (n1 === 0 && n2 === 0) {
			return;
		}
		this.setState({ alarm: (n1 * 60 + n2) * 60 });
		this.setState({ paused: false, pomOn: false });
	};

	// Check if Alarm is over or not
	checkAlarmClock = () => {
		if (this.state.paused) {
			return;
		} else if (this.state.pomOn) {
			this.checkPom();
		} else if (this.state.alarm === -2) {
			return;
		} else if (this.state.alarm === -1) {
			alert("Time's Up!");
			this.setState({ alarm: -2 });
		} else {
			this.setState({ alarm: this.state.alarm - 1 });
		}
	};

	// Pause button
	togglePause = () => {
		if (this.state.alarm !== -2) {
			this.setState({ paused: !this.state.paused });
		}
	};

	// Getting Pom Input
	getPom = async (work, shortBreak, longBreak) => {
		// Dealing with invalid input
		if (
			Number(work) === 0 ||
			Number(shortBreak) === 0 ||
			Number(longBreak) === 0
		) {
			return;
		}
		await this.setState({
			pom: [
				Number(work) * 60,
				Number(shortBreak) * 60,
				Number(longBreak) * 60,
			],
			session: 0,
			pomOn: true,
		});
		localStorage.setItem('pom-settings', JSON.stringify(this.state.pom));
	};

	// Checking Pomodoro
	checkPom = () => {
		// Starting Pomodoro
		if (this.state.session === 0) {
			this.setState({
				alarm: this.state.pom[0],
				session: this.state.session + 1,
			});
		}

		// Pomodoro Timer ended
		if (this.state.alarm === -1) {
			// Work Ended -> Short break or Long
			if (this.state.session % 2 === 1) {
				if (this.state.session === 7) {
					alert('Work Ended, Long Break!');
					this.setState({
						alarm: this.state.pom[2],
						session: this.state.session + 1,
					});
				} else {
					alert('Work Ended, Short Break!');
					this.setState({
						alarm: this.state.pom[1],
						session: this.state.session + 1,
					});
				}
			}
			// Short Break ended -> Work
			else if (this.state.session < 7) {
				alert('Short Break Ended, Work Time!');
				this.setState({
					alarm: this.state.pom[0],
					session: this.state.session + 1,
				});
			}
			// Long Break ended -> Work
			else {
				alert('Long Break Ended, Work Time!');
				this.setState({ alarm: this.state.pom[0], session: 1 });
			}
		} else {
			this.setState({ alarm: this.state.alarm - 1 });
		}
	};

	// Skipping to next Session
	nextSession = () => {
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

	// Calculate progress for linearBar
	calculateProgress = () => {
		if (this.state.alarm <= 0 || !this.state.pomOn) {
			return 100;
		}
		return (this.state.session / 8) * 100;
	};
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
	width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(withStyles(styles)(App));
