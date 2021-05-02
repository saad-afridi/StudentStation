import React from 'react';
import ToDoPage from './Todo';
import TimerPage from './Timer';
import {AppBar, Toolbar, Typography, 
        Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
// import './styles.css'

const styles = theme => ({
    title: {
        flexGrow: 1,
    },

});

class Home extends React.Component {

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

        return (
        <div className="App">
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
        </div>
        )
    }

    changeTabs = async (e, newTab) => {
        await this.setState({selectedTab: newTab});
        localStorage.setItem('tab', JSON.stringify(this.state.selectedTab));
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
