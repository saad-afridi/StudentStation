import React from 'react';

// Calc Components
import AddMark from './AddMark';
import MarkList from './MarkList';

// Material UI Components
import { Grid, Typography, Paper, Fab } from '@material-ui/core';

// Material UI Icons
import DeleteIcon from '@material-ui/icons/Clear';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles'

// Redux
import { delCourse } from '../../actions/calcActions'
import { useDispatch } from 'react-redux'

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
    const dispatch = useDispatch();

    return (
        <Grid item component={Paper} className={classes.course}>
            <Grid container alignItems="center" justify="space-between">
                <Grid item>
                    <Typography variant="h5" align="left">
                    {course.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Fab size="small" 
                    onClick={(e) => deleteCourse(e, dispatch, course)}
					style={{
						transform: 'scale(0.8)',
					}}>
                        <DeleteIcon />
                    </Fab>
                </Grid>
            </Grid>
            
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

const deleteCourse = (e, dispatch, course) => {
    e.preventDefault();
    dispatch(delCourse(course));
}

export default CourseItem;
