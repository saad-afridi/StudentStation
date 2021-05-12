import React from 'react';

// Calc Components
import AddMark from './AddMark';
import MarkList from './MarkList';

// Material UI Components
import { Grid, Typography, Paper } from '@material-ui/core';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	course: {
		margin: '5px',
		padding: 'auto',
		backgroundColor: theme.palette.secondary.light,
	},
}));

export const CourseItem = (props) => {
    const classes = useStyles();
    const { course } = props;

    return (
        <Grid item component={Paper} className={classes.course}>
            <Typography variant="h5" align="left">
                {course.name}
            </Typography>
            <hr />
            <AddMark course={course}/>
            {course.marks.length > 0 ? (
                <MarkList course={course} />
            ) : (
                ''
            )}
        </Grid>
    );
}

export default CourseItem;
