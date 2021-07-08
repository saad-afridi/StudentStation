import React from 'react';

// Calc Components
import CourseItem from './CourseItem';

// Material UI Components
import { Grid } from '@material-ui/core';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
	coursesContainer: {
		marginBottom: '35px',
	},
});

export const CourseList = () => {
	const classes = useStyles();
	const { courses } = useSelector((state) => state.calcState);

	return (
		<Grid
			container
			spacing={2}
			direction="row"
			alignItems="flex-start"
			justifyContent="space-around"
			className={classes.coursesContainer}>
			{courses.map((_value, _index) => {
				return <CourseItem course={_value} key={_index} />;
			})}
		</Grid>
	);
};

export default CourseList;
