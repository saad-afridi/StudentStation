import React from 'react';

// Material UI Components
import {Grid, Button, TextField} from '@material-ui/core'

// Material UI Icons
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
    root: {
        margin: "10px",
    }
})

class SetTimer extends React.Component {

    constructor() {
        super();
        this.state = {
            hours: '',
            minutes: ''
        };
    }

    render() {
        const {classes} = this.props;
        return (
            <form onSubmit={this.submitAlarm}>
                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center"
                className={classes.root}>
                    <Grid item>
                        <TextField variant="filled" type="number" label="Hours" id="set-hours" 
                        onKeyDown={this.keyPress} onChange={this.updateHours}> </TextField>
                    </Grid>
                    <Grid item>
                        <TextField variant="filled" type="number" label="Minutes" id="set-mins" 
                        onKeyDown={this.keyPress} onChange={this.updateMinutes}> </TextField>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" 
                        onClick={(e)=>this.submitAlarm(e)}> 
                            <AlarmOnIcon />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }

    updateHours = (e) => {
        this.setState({hours : e.target.value});
    }
    
    updateMinutes = (e) => {
        this.setState({minutes : e.target.value});
    }

    keyPress = (e) => {
        // Submit if they press enter
        if(e.keyCode === 13) {
            this.submitAlarm(e);
        }
    }

    submitAlarm = (e) => {
        e.preventDefault();
        this.props.setAlarmFn(this.state.hours, this.state.minutes);
        this.setState({
            hours: '',
            minutes: ''
        });
        document.getElementById('set-hours').value = '';
        document.getElementById('set-mins').value = '';
    }
}

SetTimer.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SetTimer);