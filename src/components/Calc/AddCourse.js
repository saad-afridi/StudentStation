import React from 'react';

// Material UI Components
import { Grid, TextField, Fab } from '@material-ui/core';

// Material UI Icons
import AddIcon from '@material-ui/icons/Add';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addCourse } from '../../actions/calcActions';

const useStyles = makeStyles({
	root: {
		marginBottom: '35px',
	},
});

export const AddCourse = () => {
	const classes = useStyles();

	const [text, setText] = React.useState('');
	const { courses } = useSelector((state) => state.calcState);
	const dispatch = useDispatch();

	const stateProps = { text, setText, dispatch, courses };

	return (
		<Grid
			container
			spacing={1}
			direction="row"
			className={classes.root}
			justify="space-between"
			alignItems="center"
		>
			<Grid item xs={9} sm={10} md={11}>
				<TextField
					variant="filled"
					label="Course Name"
					fullWidth={true}
					id="add-course"
					autoFocus={true}
					onChange={(e) => setText(e.target.value)}
					onKeyPress={(e) => submitForm(e, stateProps)}
				></TextField>
			</Grid>
			<Grid item>
				<Fab color="primary" onClick={(e) => submitForm(e, stateProps)}>
					<AddIcon />
				</Fab>
			</Grid>
		</Grid>
	);
};

const submitForm = (e, stateProps) => {
	const { text, setText, dispatch, courses } = stateProps;

	// If clicked or pressed enter => Submit
	if (e.charCode === 13 || e.charCode === undefined) {
		// check if text empty or arleady exists
        let isValid = true;

		for (let i = 0; i < courses.length; i++) {
			if (courses[i].name === text) {
				isValid = false;
			}
		}

		if (text === '') {
            isValid = false;
        }

		e.preventDefault();
        (isValid) 
            ? dispatch(addCourse({ name: text, marks: [] })) 
		    : dispatch(addCourse({ name: 'Course ' + String(courses.length + 1), marks: [] }));
		document.getElementById('add-course').value = '';
		setText('');
	}
};

export default AddCourse;
