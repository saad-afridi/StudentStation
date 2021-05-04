import React, { Component } from 'react'

// Calc Components
import CourseItem from './CourseItem'

// Material UI Components
import { Grid } from '@material-ui/core'

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    coursesContainer: {
      marginBottom: "35px"
    },
});

class CourseList extends Component {
 

    render() {
        const {classes, courses} = this.props;

        return (
        <Grid container spacing={2} className={classes.coursesContainer}>
            {
                courses.map((_value, _index) => {
                    return(
                        <CourseItem  updateMarksFn={this.updateMarks} course={_value} key={_index}  />
                    ) 
                })
            }
        </Grid>
        )
    }

    updateMarks = (marks) => {

    }

}

CourseList.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CourseList);