import React from 'react';
import ToDoPage from './Todo';
import TimerPage from './Timer';
import {AppBar, Toolbar, Typography, 
        Tabs, Tab } from '@material-ui/core';
import { withStyles, ThemeProvider} from '@material-ui/styles';
import PropTypes from 'prop-types';
import { purple } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";



const styles = theme => ({
    title: {
        flexGrow: 1,
    },

});

const themeDark = createMuiTheme({
    palette: {
        primary: {
            main: '#5d0cff',
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
            selectedTab: 0
        }
    }

    componentDidMount = () => {
        const selectedTab = localStorage.getItem('tab');
        if (selectedTab) {
            const savedTab = JSON.parse(selectedTab);
            this.setState({ selectedTab: savedTab });
        }
        else {
            console.log('No tab was selected');
        }
    }

    render() {
        const {classes} = this.props;
        console.log(themeDark);
        return (
        <div className="App">
        <ThemeProvider theme={themeDark}>
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
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
