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
 
    constructor(props) {
        super(props);
        const {course} = this.props;
        
        this.state = {
            course : course,
        };
    }

    render() {
        const {classes} = this.props;

        return (
        <Grid item component={Paper} className={classes.course}> 
            <Typography variant="h5" align="left"> {this.state.course.name} </Typography>
            <hr />
            <AddMark updateMarksFn={this.updateMarks} course={this.state.course} />
            {this.state.course.marks.length > 0 ? 
            <MarkList updateMarksFn={this.updateMarks} course={this.state.course} /> : ""}
        </Grid>
        )
    }

    updateMarks = (course) => {
        console.log("Something happened!", course);
        this.setState({course});
        this.props.updateMarksFn(course);
    }
}

CourseItem.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CourseItem);