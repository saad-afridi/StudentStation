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
    }
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

    componentDidMount(){
        this.interval = setInterval(
          () => this.checkAlarmClock(),1000)
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        const {classes} = this.props;

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
            
            <ShowTime timeLeft={this.state.alarm} pomOn={this.state.pomOn} session={this.state.session}></ShowTime>

            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item>
                    <Button color="primary" size="large" variant="contained" onClick={this.togglePause}> 
                        {this.state.paused ?  'Play' : 'Pause'} 
                        {this.state.paused ?  <PlayIcon /> : <PauseIcon />} 
                    </Button>
                </Grid>
                <Grid item>
                    <Button color="primary" size="large" variant="contained" 
                    onClick={this.nextSession} disabled={!this.state.pomOn}> 
                        Skip <NavigateNextIcon />
                    </Button>
                </Grid>
            </Grid>

            <SetTimer setAlarmFn={this.setAlarmTime}></SetTimer>
            <SetPomodoro getPomFn={this.getPom}></SetPomodoro>
            
        </Container>
        )
    }

    // Sets the Alarm Time -> Converts hours + minutes to seconds
    setAlarmTime = (hours, minutes) => {
        let n1 = Number(hours);
        let n2 = Number(minutes);

        // Dealing with invalid input 
        if (n1 === 0 && n2 === 0) {
            return;
        }
        this.setState({ alarm: (n1 * 60 + n2) * 60 });
        this.setState({ paused: false, pomOn: false});
        console.log(this.state.alarm);
    }

    // Check if Alarm is over or not
    checkAlarmClock = () => {
        if (this.state.paused) {
            return;
        } else if (this.state.pomOn){
            this.checkPom();
        } else if (this.state.alarm === -2) {
            return;
        } else if (this.state.alarm === -1) {
            alert("Time's Up!");
            this.setState({ alarm: -2 });
        } else {
            this.setState({ alarm: this.state.alarm - 1 });
            console.log("not yet");
        }
    }

    togglePause = () => {
        if (this.state.alarm !== -2) {
            this.setState({paused: !this.state.paused});
        }
    }

    getPom = (work, shortBreak, longBreak) => {
        console.log(work, shortBreak, longBreak);
        
        // Dealing with invalid input
        if (Number(work) === 0 || Number(shortBreak) === 0 || Number(longBreak) === 0) {
            return;
        }

        this.setState({pom: [Number(work) * 60, Number(shortBreak) * 60, Number(longBreak) * 60], 
        session: 0, pomOn: true});
    }

    checkPom = () => {
        // Starting Pomodoro
        if (this.state.session === 0) {
            this.setState({alarm: this.state.pom[0] , session: this.state.session + 1});
        }

        // Pomodoro Timer ended
        if (this.state.alarm === -1) {
            console.log(this.state.session);
            // Work Ended -> Short break or Long
            if(this.state.session % 2 === 1) {
                if (this.state.session === 7) {
                    alert("Work Ended, Long Break!");
                    this.setState({alarm: this.state.pom[2], session: this.state.session + 1});
                }
                else {
                    alert("Work Ended, Short Break!");
                    this.setState({alarm: this.state.pom[1] , session: this.state.session + 1});
                }
            }
            // Short Break ended -> Work
            else if (this.state.session < 7){
                alert("Short Break Ended, Work Time!");
                this.setState({alarm: this.state.pom[0], session: this.state.session + 1});
            }
            // Long Break ended -> Work
            else {
                alert("Long Break Ended, Work Time!");
                this.setState({alarm: this.state.pom[0], session: 1});
            }
        } else {
            this.setState({ alarm: this.state.alarm - 1 });
            console.log("not yet");
        }
    }

    nextSession = () => {
        console.log(this.state.session);
        // Work -> Long Break
        if (this.state.session === 7) {
            this.setState({alarm: this.state.pom[2], session: this.state.session + 1});
        }
        // Work -> Short break
        else if (this.state.session % 2 === 1){
            this.setState({alarm: this.state.pom[1] , session: this.state.session + 1});
        } 
        // Short or Long Break -> Work
        else {
            if (this.state.session < 7) {
                this.setState({alarm: this.state.pom[0], 
                    session: this.state.session + 1});
            } else {
                this.setState({alarm: this.state.pom[0], session: 1});
            }
        }
    }
}

TimerPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimerPage);