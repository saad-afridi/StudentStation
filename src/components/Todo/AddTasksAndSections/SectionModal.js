import React from 'react';

// Material UI Components
import {
	Grid,
	Typography,
	Paper,
	TextField,
	Button,
} from '@material-ui/core';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { addSection } from '../../../actions/todoActions';

const useStyles = makeStyles({
	paperForm: {
		position: 'absolute',
		padding: '20px',
	},
	priorForm: {
		minWidth: 120,
	},
});

export const SectionModal = () => {
	const classes = useStyles();
	const [text, setText] = React.useState('');

    // Error handling
    const [hasError, setError] = React.useState(false);
    const [helpText, setHelpText] = React.useState('');

    // Redux
	const { sections } = useSelector((state) => state.todoListState);
	const dispatch = useDispatch();

	const stateProps = { text, setText, setError, setHelpText, dispatch, sections };

	return (
		<Paper className={classes.paperForm}>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				spacing={4}>
				<Grid item>
					<Typography variant="h3"> Add Section </Typography>
				</Grid>
				<Grid item>
					<TextField
						label="Section Name"
						autoFocus
						id="add-section-input"
                        error={hasError}
                        helperText={helpText}
						onChange={(e) => setText(e.target.value)}
						onKeyPress={(e) => submitForm(e, stateProps)}
					/>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color="primary"
						onClick={(e) => submitForm(e, stateProps)}>
						Submit
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
};



const submitForm = (e, stateProps) => {
	const { text, setText, setError, setHelpText, dispatch, sections } = stateProps;

	// If clicked or pressed enter => Submit
	if (e.charCode === 13 || e.charCode === undefined) {

		// Text not empty
		if (text === '') {
            setError(true)
            setHelpText("Can't be Empty")
            return;
        }
		for (let i = 0; i < sections.length; i++) {
			if (sections[i].name.toUpperCase() === text.toUpperCase()) {
                setError(true)
                setHelpText("Section Already Exists")
                return;
			}
		}
		e.preventDefault();
        dispatch(addSection({name: text, tasks: []}));
        document.getElementById('add-section-input').value = '';
        setText('');
	}
    setError(false);
    setHelpText('');
};

export default SectionModal;
