import React from 'react'

// Material UI Components
import {Grid, TextField, Button} from '@material-ui/core';

// Material UI Icons
import InputIcon from '@material-ui/icons/Input';

// Theme and Styling 
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        margin: '5px',
    }
})

class SetPomodoro extends React.Component {

    constructor() {
        super();
        this.state = {
            work: '25',
            shortBreak: '5',
            longBreak: '30',
        }
    }

    render () {
        const {classes} = this.props;
        return (
            <form onSubmit={this.submitPom}>
                <Grid container spacing={2} direction="row" justify="center" alignItems="center"
                className={classes.root}>
                    <Grid item>
                        <TextField variant="filled" type="number" label="Work" id="set-work" defaultValue='25'
                        onKeyDown={this.keyPress} onChange={this.updateWork}> </TextField>
                    </Grid>
                    <Grid item>
                        <TextField variant="filled" type="number" label="Short Break" id="set-break" defaultValue='5'
                        onKeyDown={this.keyPress} onChange={this.updateBreak}> </TextField>
                    </Grid>
                    <Grid item>
                        <TextField variant="filled" type="number" label="Long Break" id="set-longBreak" defaultValue='30'
                        onKeyDown={this.keyPress} onChange={this.updateLongBreak}> </TextField>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={this.submitPom}> 
                            <InputIcon />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        )
    }

    keyPress = (e) => {
        // Submit if they press enter
        if(e.keyCode === 13) {
            this.submitPom(e);
        }
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
        this.setState({
            work: '25',
            shortBreak: '5',
            longBreak: '30',
        });
        document.getElementById('set-work').value = '25';
        document.getElementById('set-break').value = '5';
        document.getElementById('set-longBreak').value = '30';
    }
}

SetPomodoro.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SetPomodoro);




