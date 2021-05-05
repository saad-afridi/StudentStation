import React, { Component } from 'react'

// Calc Components
import AddMark from './AddMark'
import MarkList from './MarkList'

// Material UI Components
import { Grid, Typography, Paper } from '@material-ui/core'

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    course: {
        margin: "5px",
        padding: "auto",
        backgroundColor: theme.palette.secondary.light,
    },
});

class CourseItem extends Component {
 

    render() {
        const {classes, course} = this.props;

        return (
        <Grid item component={Paper} className={classes.course}> 
            <Typography variant="h5" align="left"> {course.name} </Typography>
            <hr />
            <AddMark updateMarksFn={this.updateMarks} course={course} />
            {course.marks.length > 0 ? <MarkList marks={course.marks}/> : ""}
        </Grid>
        )
    }

    updateMarks = (course) => {
        this.props.updateMarksFn(course);
    }

}

CourseItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CourseItem);