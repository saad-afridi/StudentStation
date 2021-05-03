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
        margin: "5px",
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
        return (
            <form onSubmit={(e) => this.submitAlarm(e)}>
                <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <TextField variant="filled" label="Hours" id="set-hours"
                        onChange={(e) => this.updateHours(e)}> </TextField>
                    </Grid>
                    <Grid item>
                        <TextField variant="filled" label="Minutes" id="set-mins"
                        autofocus="true" onChange={(e) => this.updateMinutes(e)}> </TextField>
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