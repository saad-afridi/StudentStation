import React from 'react';

// Material UI Components
import { Grid, TextField } from '@material-ui/core';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { changeWantedMark } from '../../actions/calcActions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
	root: {
        margin: "10px",
        width: "100%",
    },
});

export const WantMark = (props) => {
	const classes = useStyles();
	const { course } = props;

	const [want, setWant] = React.useState(course.want);
	const dispatch = useDispatch();

	const stateProps = { want, dispatch, course };

	return (
		<Grid
			container
			justify="space-around"
			spacing={1}
			alignItems="center"
            fullWidth={true}
			className={classes.root}>
			<Grid item>
				<TextField
                    variant="outlined"
					label="Want (%)"
					type="number"
					id={'want ' + course.name}
					defaultValue={course.want}
					onChange={(e) => setWant(e.target.value)}
					onSubmit={(e) => submitForm(e, stateProps)}
                    onKeyPress={(e) => submitForm(e, stateProps)}
				/>
			</Grid>
		</Grid>
	);
};

const submitForm = (e, stateProps) => {
    if (e.charCode !== 13) {
        return;
    }
	const { want, dispatch, course } = stateProps;
	e.preventDefault();
	course.want = want;
	dispatch(changeWantedMark(course));
};

export default WantMark;
