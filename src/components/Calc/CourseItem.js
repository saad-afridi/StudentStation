import React, { Component } from 'react'

// Calc Components
import AddMark from './AddMark'

// Material UI Components
import { Grid, Typography } from '@material-ui/core'

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    course: {
    },
});

class CourseItem extends Component {
 

    render() {
        const {classes, course} = this.props;

        return (
        <Grid item> 
            <Typography variant="h5" align="left"> {course.name} </Typography>
            <AddMark updateMarksFn={this.updateMarks} course={course} />
        </Grid>
        )
    }

    updateMarks = (course, mark) => {
        this.props.updateMarksFn(course, mark);
    }

}

CourseItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CourseItem);