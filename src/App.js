import React from 'react';

// Material UI Components
import {AppBar, Toolbar, Typography, 
    Tabs, Tab, IconButton } from '@material-ui/core';

// Material UI Icons
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ListIcon from '@material-ui/icons/List';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import HomeIcon from '@material-ui/icons/Home'
import FaceIcon from '@material-ui/icons/Face';

// App Pages
import ToDoPage from './pages/Todo';
import TimerPage from './pages/Timer';
import CalculatorPage from './pages/Calculator'

// Theme and Styling
import { withStyles, ThemeProvider} from '@material-ui/styles';
import PropTypes from 'prop-types';
import { teal, grey, blueGrey, indigo } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";



const styles = theme => ({
    title: {
        flexGrow: 1,
    },

});

const themeLight = createMuiTheme({
    palette: {
        primary: {
            main: indigo[400],
        },
        secondary : {
            main: grey[300],
        },
        type: 'light',
        background: {
            default: grey[100],
        }
    }
})

const themeDark = createMuiTheme({
    palette: {
        primary: {
            main: teal['A400'],
        },
        secondary: {
            main: blueGrey[800],
        },
        type: 'dark',
        background: {
            default: '#11141f',
        },  
    }
})


class App extends React.Component {

    constructor(){
        super();
        this.state = {
            selectedTab: 0,
            darkMode: false,

            // Timer attributes
            alarm : -2,
            paused: false,
            pomOn: false,
            pom: [25, 5, 30],
            session: 0,
        }
        this.setAlarmTime = this.setAlarmTime.bind(this);
    }

    componentDidMount = () => {
        const selectedTab = localStorage.getItem('tab');
        if (selectedTab) {
            const savedTab = JSON.parse(selectedTab);
            this.setState({ selectedTab: savedTab });
        }
        const darkMode = localStorage.getItem('theme');
        if (darkMode) {
            const savedTheme = JSON.parse(darkMode);
            this.setState({ darkMode: savedTheme})
        }
        const pom = localStorage.getItem('pom-settings');
        console.log(pom);
        if (pom) {
            const savedPom = JSON.parse(pom);
            this.setState({ pom: savedPom});
        }
        this.interval = setInterval(
            () => this.checkAlarmClock(),1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {classes} = this.props;
        return (
        <div className="App">
        <ThemeProvider theme={this.state.darkMode ? themeDark : themeLight}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        Student Station
                    </Typography>
                    <Tabs value={this.state.selectedTab} onChange={this.changeTabs}>
                        <Tab label="Home" icon={<HomeIcon />} />
                        <Tab label="Todo List" icon={<ListIcon />} />
                        <Tab label="Timer" icon={<AccessAlarmIcon />} />
                        <Tab label="Calculator" icon={<FaceIcon />} />
                    </Tabs>
                    <IconButton onClick={this.changeThemes}>
                        <Brightness4Icon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {this.state.selectedTab === 1 && <ToDoPage />}

            {this.state.selectedTab === 2 && <TimerPage 
            updateAlarmTimeFn= {this.setAlarmTime}
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
            pom={this.state.pom}
            >
            </TimerPage>}

            {this.state.selectedTab === 3 && <CalculatorPage />}
        </ThemeProvider>
        </div>
        )
    }

    changeTabs = async (e, newTab) => {
        await this.setState({selectedTab: newTab});
        localStorage.setItem('tab', JSON.stringify(this.state.selectedTab));
    }

    changeThemes = async () => {
        await this.setState({ darkMode: !this.state.darkMode})
        localStorage.setItem('theme', JSON.stringify(this.state.darkMode));
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

    // Pause button
    togglePause = () => {
        if (this.state.alarm !== -2) {
            this.setState({paused: !this.state.paused});
        }
    }

    // Getting Pom Input
    getPom = async (work, shortBreak, longBreak) => {
        // Dealing with invalid input
        if (Number(work) === 0 || Number(shortBreak) === 0 || Number(longBreak) === 0) {
            return;
        }
        await this.setState({pom: [Number(work) * 60, Number(shortBreak) * 60, Number(longBreak) * 60], 
        session: 0, pomOn: true});
        localStorage.setItem('pom-settings', JSON.stringify(this.state.pom));
    }

    // Checking Pomodoro
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
        }
    }

    // Skipping to next Session
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

    // Calculate progress for linearBar
    calculateProgress = () => {
        if(this.state.alarm <= 0 || !this.state.pomOn) {
            return 100;
        }
        return (this.state.session / 8) * 100;
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);