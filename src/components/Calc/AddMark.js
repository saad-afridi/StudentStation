import React from 'react';

// Material UI Components
import { Grid, TextField, Fab, FormControl } from '@material-ui/core';

// Material UI Icons
import AddIcon from '@material-ui/icons/Add';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useDispatch } from 'react-redux';
import { addMark } from '../../actions/calcActions';

const useStyles = makeStyles({
	addMarkForm: {
		margin: '10px 0px 5px 0px',
	},

	formControl: {
		maxWidth: '90px',
	},
});

export const AddMark = (props) => {
	const { course } = props;
	const classes = useStyles();

	const [type, setType] = React.useState('test');
	const [mark, setMark] = React.useState(0);
	const [weight, setWeight] = React.useState(0);

	const dispatch = useDispatch();

	const stateProps = {
		type,
		setType,
		mark,
		setMark,
		weight,
		setWeight,
		dispatch,
		course,
	};

	return (
		<Grid
			container
			spacing={2}
			direction="row"
			alignItems="center"
			justify="space-around"
			className={classes.addMarkForm}>
			<Grid item>
				<FormControl className={classes.formControl}>
					<TextField
						label="Mark Type"
						type="text"
						id={'mark-type ' + course.name}
						onChange={(e) => setType(e.target.value)}
						onKeyPress={(e) => submitForm(e, stateProps)}
					/>
				</FormControl>
			</Grid>
			<Grid item>
				<FormControl className={classes.formControl}>
					<TextField
						label="Mark (%)"
						type="number"
						id={'mark ' + course.name}
						onChange={(e) => setMark(e.target.value)}
						onKeyPress={(e) => submitForm(e, stateProps)}
					/>
				</FormControl>
			</Grid>
			<Grid item>
				<FormControl className={classes.formControl}>
					<TextField
						label="Weight (%)"
						type="number"
						id={'weight ' + course.name}
						onChange={(e) => setWeight(e.target.value)}
						onKeyPress={(e) => submitForm(e, stateProps)}
					/>
				</FormControl>
			</Grid>
			<Grid item>
				<Fab
					size="small"
					onClick={(e) => submitForm(e, stateProps)}
					style={{
						transform: 'scale(0.8)',
						margin: '5px',
					}}>
					<AddIcon />
				</Fab>
			</Grid>
		</Grid>
	);
};

const submitForm = (e, stateProps) => {
	const {
		type,
		setType,
		mark,
		setMark,
		weight,
		setWeight,
		dispatch,
		course,
	} = stateProps;

	// If clicked or pressed enter => Submit
	if (e.charCode === 13 || e.charCode === undefined) {
		// check if mark, weight < 100 and > 0
		// if we even have enough weight to distribute

		console.log('WE GET HERE!', typeof mark, weight);

		let isValid = true;

		if (mark < 0 && mark >= 100 && 0 >= weight && weight > 100) {
			isValid = false;
		}

		let totalWeight = 0;
		for (let i = 0; i < course.marks.length; i++) {
			totalWeight += Number(course.marks[i].weight);
		}

		if (totalWeight + Number(weight) > 100) {
			isValid = false;
		}

		e.preventDefault();
		if (isValid) {
			course.marks.push({
				type,
				mark: Number(mark),
				weight: Number(weight),
			});
			dispatch(addMark(course));
		} else {
			console.log('SOMETHING IS WRONG!');
		}

		// Resetting
		document.getElementById('mark ' + course.name).value = '';
		document.getElementById('mark-type ' + course.name).value = '';
		document.getElementById('weight ' + course.name).value = '';
		setType('test');
		setMark(0);
		setWeight(0);
	}
};

export default AddMark;
