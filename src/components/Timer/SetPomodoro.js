import React from 'react'

// Material UI Components
import {Grid, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core';

// Material UI Icons
import InputIcon from '@material-ui/icons/Input';

// Theme and Styling 
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    formControl: {
        margin: theme.spacing(2),
        fullWidth: true,
        minWidth: 120,
    }
})

const minsArr = () => {
    let arr = [];
    for (let i = 5; i <= 60; i += 5) {
        arr.push(i);
    }
    return arr;
}

class SetPomodoro extends React.Component {

    constructor() {
        super();

        const pom = localStorage.getItem('pom-settings');
        if (pom) {
            const savedPom = JSON.parse(pom);
            this.state = {
                work: savedPom[0] / 60,
                shortBreak: savedPom[1] / 60,
                longBreak: savedPom[2] / 60,
            }
        }
        else {
            this.state = {
                work: 25,
                shortBreak: 5, 
                longBreak: 30
            }
        }
        
    }


    render () {
        const {classes, pom} = this.props;
        const minArr = minsArr();

        if (this.state.work === 0 || this.state.shortBreak === 0 || this.state.longBreak === 0 ) {
            this.updateSettings(pom);
        }

        return (
            
            <Grid container spacing={2} direction="row" justify="center" alignItems="center"
            className={classes.root}>
                <Grid item>
                    <FormControl variant="standard" className={classes.formControl}>
                        <InputLabel id="set-work-time">Work</InputLabel>
                        <Select id="set-work" value={this.state.work} onChange={this.updateWork}>
                            {
                                minArr.map((_value) => {
                                    return(
                                        <MenuItem value={_value}> {String(_value) + " mins"}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="standard" className={classes.formControl}>
                        <InputLabel id="set-short-break">Short Break</InputLabel>
                        <Select id="set-short" value={this.state.shortBreak} onChange={this.updateBreak}>
                            {
                                minArr.map((_value) => {
                                    return(
                                        <MenuItem value={_value}> {String(_value) + " mins"}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="standard" className={classes.formControl}>
                        <InputLabel id="set-long-break">Long Break</InputLabel>
                        <Select id="set-long" value={this.state.longBreak} onChange={this.updateLongBreak}>
                            {
                                minArr.map((_value, i) => {
                                    return(
                                        <MenuItem value={_value}> {String(_value) + " mins"}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" size="large" 
                    onClick={this.submitPom} endIcon={<InputIcon />}> 
                    Pomodoro  
                    </Button>
                </Grid>
            </Grid>
        )
    }

    updateSettings = (pom) => {
        this.setState({work: pom[0] / 60, shortBreak: pom[1] / 60, longBreak: pom[2] / 60});
    }

    updateWork = (e) => {
        this.setState({work: e.target.value});
    }

    updateBreak = (e) => {
        this.setState({shortBreak: e.target.value});
    }
    
    updateLongBreak = (e) => {
        this.setState({longBreak: e.target.value});
    }

    submitPom = (e) => {
        e.preventDefault();
        this.props.getPomFn(this.state.work, this.state.shortBreak, this.state.longBreak);
    }
}

SetPomodoro.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SetPomodoro);




