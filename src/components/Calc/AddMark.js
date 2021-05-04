import React, { Component } from 'react'

// Material UI Components
import { Grid, Typography } from '@material-ui/core'

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    course: {
    },
});

class AddMark extends Component {
 

    render() {
        const {classes} = this.props;

        return (
            <div></div>
        )
    }

}

AddMark.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddMark);