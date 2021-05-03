import React from 'react';

// Timer Components
import SetTimer from '../components/Timer/SetTimer';
import ShowTime from '../components/Timer/ShowTime';

// Material UI Components
import {Typography, Container, Grid} from '@material-ui/core'

// Material UI Icons
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

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
            alarm : -2
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
            
            <ShowTime timeLeft={this.state.alarm}></ShowTime>
            <SetTimer setAlarmFn={this.setAlarmTime}></SetTimer>
        </Container>
        )
    }

    // Sets the Alarm Time -> Converts hours + minutes to seconds
    setAlarmTime = async (hours, minutes) => {

        // Dealing with invalid input 
        let n1 = Number(hours);
        let n2 = Number(minutes);
        if (isNaN(n1)|| isNaN(n2)) {
            return;
        }
        else if (n1 === 0 && n2 === 0) {
            return;
        }
        this.setState({ alarm: (n1 * 60 + n2) * 60 });
        console.log(this.state.alarm);
    }

    // Check if Alarm is over or not
    checkAlarmClock = async () => {
        if (this.state.alarm === -2){
            return;
        } else if(this.state.alarm === -1) {
            alert("Time's Up!");
            this.setState({ alarm: -2 });
        } else {
            this.setState({ alarm: this.state.alarm - 1 });
            console.log("not yet");
        }
    }
}

TimerPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimerPage);