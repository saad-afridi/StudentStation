import React from 'react';

// Calc Components
import AddMark from './AddMark';
import MarkList from './MarkList';
import WantMark from './WantMark';
import CourseStats from './CourseStats';

// Material UI Components
import { Grid, Typography, Paper, IconButton } from '@material-ui/core';

// Material UI Icons
import DeleteIcon from '@material-ui/icons/Delete';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors'

// Redux
import { delCourse } from '../../actions/calcActions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	course: {
		margin: '5px',
		padding: 'auto',
		backgroundColor: theme.palette.secondary.light,
	},
    title: {
        // backgroundColor: theme.palette.primary.light,
    }
}));

export const CourseItem = (props) => {
	const classes = useStyles();
	const { course } = props;
	const dispatch = useDispatch();

	return (
		<Grid item component={Paper} className={classes.course}>
			<Grid container alignItems="center" justify="space-between" className={classes.title}>
				<Grid item >
					<Typography variant="h5" align="left">
						{course.name}
					</Typography>
				</Grid>
				<Grid item style={{color: red[500]}}>
                    <IconButton style={{color: red[500]}} 
                    onClick={(e) => deleteCourse(e, dispatch, course)}
                    >
                        <DeleteIcon />
                    </IconButton>
				</Grid>
			</Grid>

			<hr />
			<AddMark course={course} />
			{course.marks.length > 0 ? <MarkList course={course} /> : ''}
            <WantMark course={course}/>
            {course.marks.length > 0 ? <CourseStats course={course} /> : ''}
		</Grid>
	);
};

const deleteCourse = (e, dispatch, course) => {
	e.preventDefault();
	dispatch(delCourse(course));
};

export default CourseItem;
