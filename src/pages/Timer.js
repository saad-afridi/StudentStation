import React from 'react';

// Timer Components
import SetTimer from '../components/Timer/SetTimer';
import ShowTime from '../components/Timer/ShowTime';
import SetPomodoro from '../components/Timer/SetPomodoro';
import PageTitle from '../components/PageTitle';

// Material UI Components
import { Container, Grid, Button, LinearProgress } from '@material-ui/core';

// Material UI Icons
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
	header: {
		margin: '80px 0px 30px 0px',
		color:
			theme.palette.type === 'dark'
				? theme.palette.primary.light
				: theme.palette.primary.main,
	},
	controlButtons: {
		margin: '30px 0px 60px 0px',
	},
});

class TimerPage extends React.Component {
	render() {
		const { classes } = this.props;
		const { alarm, session, pomOn, paused, pom } = this.props;
		return (
			<Container className="TimerContainer">
				<PageTitle
					text={'Track Yourself'}
					icon={
						<AccessAlarmIcon
							style={{ transform: 'scale(2.0)' }}
						/>
					}
				/>

				<ShowTime
					timeLeft={alarm}
					pomOn={pomOn}
					session={session}></ShowTime>

				{pomOn ? (
					<LinearProgress
						variant="determinate"
                        color="secondary"
						value={this.calculateProgress()}></LinearProgress>
				) : (
					''
				)}

				<Grid
					container
					spacing={2}
					justify="center"
					alignItems="center"
					className={classes.controlButtons}>
					<Grid item>
						<Button
							size="large"
                            color="secondary"
							variant={paused ? "contained" : "outlined"}
							onClick={this.togglePause}
							disabled={alarm === -2}>
							{paused ? 'Play' : 'Pause'}
							{paused ? <PlayIcon /> : <PauseIcon />}
						</Button>
					</Grid>
					<Grid item>
						<Button
							size="large"
                            color="secondary"
							variant="outlined"
							onClick={this.nextSession}
							disabled={!pomOn}>
							Skip <SkipNextIcon />
						</Button>
					</Grid>
				</Grid>

				<SetTimer setAlarmFn={this.setAlarmTime}></SetTimer>
				<SetPomodoro getPomFn={this.getPom} pom={pom}></SetPomodoro>
			</Container>
		);
	}

	// Sets the Alarm Time -> Converts hours + minutes to seconds
	setAlarmTime = (hours, minutes) => {
		this.props.updateAlarmTimeFn(hours, minutes);
	};

	// Check if Alarm is over or not
	checkAlarmClock = () => {
		this.props.checkAlarmFn();
	};

	// Pause button
	togglePause = () => {
		this.props.togglePauseFn();
	};

	// Getting Pom Input
	getPom = (work, shortBreak, longBreak) => {
		this.props.getPomFn(work, shortBreak, longBreak);
	};

	// Checking Pomodoro
	checkPom = () => {
		this.props.checkPomFn();
	};

	// Skipping to next Session
	nextSession = () => {
		this.props.skipSessionFn();
	};

	// Calculate progress for linearBar
	calculateProgress = () => {
		return this.props.checkProgressFn();
	};
}

TimerPage.propTypes = {
	classes: PropTypes.object.isRequired,
	session: PropTypes.number.isRequired,
};

export default withStyles(styles)(TimerPage);
