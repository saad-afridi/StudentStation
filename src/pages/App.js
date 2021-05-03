import React from 'react';
import ToDoPage from './Todo';
import TimerPage from './Timer';
import {AppBar, Toolbar, Typography, 
        Tabs, Tab, IconButton } from '@material-ui/core';
import { withStyles, ThemeProvider} from '@material-ui/styles';
import PropTypes from 'prop-types';
import { lightBlue, teal, grey, blueGrey } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Brightness4Icon from '@material-ui/icons/Brightness4';



const styles = theme => ({
    title: {
        flexGrow: 1,
    },

});

const themeLight = createMuiTheme({
    palette: {
        primary: {
            main: lightBlue[700],
        },
        secondary : {
            main: grey[200],
        },
        type: 'light',
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
        }
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
    }

    render() {
        const {classes} = this.props;
        return (
        <div className="App">
        <ThemeProvider theme={this.state.darkMode ? themeDark : themeLight}>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        Student Station
                    </Typography>
                    <Tabs value={this.state.selectedTab} onChange={this.changeTabs}>
                        <Tab label="Home" />
                        <Tab label="Todo List" />
                        <Tab label="Timer" />
                    </Tabs>
                    <IconButton onClick={this.changeThemes}>
                        <Brightness4Icon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {this.state.selectedTab === 1 && <ToDoPage />}
            {this.state.selectedTab === 2 && <TimerPage />}
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
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
