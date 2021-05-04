import React from 'react';

// Timer Components
import SetTimer from '../components/Timer/SetTimer';
import ShowTime from '../components/Timer/ShowTime';
import SetPomodoro from '../components/Timer/SetPomodoro'

// Material UI Components
import {Typography, Container, Grid,
     Button, LinearProgress} from '@material-ui/core'

// Material UI Icons
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
    header: {
        margin: "80px 0px 30px 0px",
        color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
    },
    controlButtons: {
        margin: "20px 0px 20px 0px"
    },
});

class TimerPage extends React.Component {

    constructor () {
        super();
        this.state = {
            alarm : -2,
            paused: false,
            pomOn: false,
            pom: [25, 5, 30],
            session: 0,
        };
        this.setAlarmTime = this.setAlarmTime.bind(this);
    }


    render () {
        const {classes} = this.props;
        const {alarm, session, pomOn, paused, pom} = this.props;
        return (
        
        <Container className="TimerContainer"> 
            <Grid container spacing={3} direction="row" justify="center" 
            alignItems="center" className={classes.header}>
                <Grid item> 
                    <AccessAlarmIcon style={{transform: 'scale(2.0)'}} /> 
                </Grid>
                <Grid item>
                    <Typography variant="h3" component="div" align="left" className="TitleContainer"> 
                    Track Yourself
                    </Typography>
                </Grid>
            </Grid>
            
            <ShowTime timeLeft={alarm} pomOn={pomOn} session={session}></ShowTime>

            {pomOn ? <LinearProgress variant="determinate" value={this.calculateProgress()} 
            ></LinearProgress> : ''}
            
            <Grid container spacing={2} justify="center" alignItems="center" 
            className={classes.controlButtons}>
                <Grid item>
                    <Button color="primary" size="large" variant="contained" onClick={this.togglePause} disabled={alarm === -2}> 
                        {paused ?  'Play' : 'Pause'} 
                        {paused ?  <PlayIcon /> : <PauseIcon />} 
                    </Button>
                </Grid>
                <Grid item>
                    <Button color="primary" size="large" variant="contained" 
                    onClick={this.nextSession} disabled={!pomOn}> 
                        Skip <NavigateNextIcon />
                    </Button>
                </Grid>
            </Grid>

            <SetTimer setAlarmFn={this.setAlarmTime}></SetTimer>
            <SetPomodoro getPomFn={this.getPom} pom={pom}></SetPomodoro>

        </Container>
        )
    }

    // Sets the Alarm Time -> Converts hours + minutes to seconds
    setAlarmTime = (hours, minutes) => {
        this.props.updateAlarmTimeFn(hours, minutes); 
    }

    // Check if Alarm is over or not
    checkAlarmClock = () => {
        this.props.checkAlarmFn(); 
    }

    // Pause button
    togglePause = () => {
        this.props.togglePauseFn();
    }

    // Getting Pom Input
    getPom = (work, shortBreak, longBreak) => {
        this.props.getPomFn(work, shortBreak, longBreak);
    }

    // Checking Pomodoro
    checkPom = () => {
        this.props.checkPomFn(); 
    }

    // Skipping to next Session
    nextSession = () => {
        this.props.skipSessionFn(); 
    }

    // Calculate progress for linearBar
    calculateProgress = () => {
        return this.props.checkProgressFn();
    }
}

TimerPage.propTypes = {
    classes: PropTypes.object.isRequired,
    session: PropTypes.number.isRequired,
};

export default withStyles(styles)(TimerPage);