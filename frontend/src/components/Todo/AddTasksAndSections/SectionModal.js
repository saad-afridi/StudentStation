import React from 'react';

// Material UI Components
import { Grid, Typography, Paper, TextField, Button } from '@material-ui/core';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import { Delete, Add } from '@material-ui/icons';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { addSection, delSection } from '../../../actions/todoActions';

const useStyles = makeStyles((theme) => ({
	paperForm: {
		position: 'absolute',
		padding: '20px 10px',
	},
	buttonGroup: {
		margin: '10px -5px',
	},
	delButton: {
		color: theme.palette.type === 'dark' ? 'black' : 'white',
		backgroundColor: theme.palette.type === 'dark' ? red[300] : red[600],
	},
	contentForm: {
		minwidth: 400,
		margin: '20px 0px',
	},
}));

export const SectionModal = (props) => {
	const classes = useStyles();
	const [text, setText] = React.useState('');
    const { onClose } = props;

	// Error handling
	const [hasError, setError] = React.useState(false);
	const [helpText, setHelpText] = React.useState('');

	// Redux
	const { sections } = useSelector((state) => state.todoListState);
	const dispatch = useDispatch();

	const stateProps = {
		text,
		setText,
		setError,
		setHelpText,
		dispatch,
		sections,
        onClose
	};

	return (
		<Paper component="div" className={classes.paperForm}>
			<Grid
				container
				direction="column"
				justifyContent="flex-start"
				alignItems="stretch"
				spacing={4}>
				<Grid item>
					<Typography variant="h3">Modify Sections</Typography>
				</Grid>
				<Grid item>
					<TextField
						autoFocus
						variant="filled"
						className={classes.contentForm}
						fullWidth
						label="Section Name"
						id="add-section-input"
						error={hasError}
						helperText={helpText}
						onChange={(e) => setText(e.target.value)}
						onKeyPress={(e) => submitForm(e, stateProps, 'add')}
					/>
				</Grid>
				<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={1}
					className={classes.buttonGroup}>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							onClick={(e) => submitForm(e, stateProps, 'add')}
							startIcon={<Add />}>
							Add
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							className={classes.delButton}
							onClick={(e) => submitForm(e, stateProps, 'del')}
							startIcon={<Delete />}>
							Delete
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
};

const submitForm = (e, stateProps, intent) => {
	const { text, setText, setError, setHelpText, dispatch, sections, onClose } =
		stateProps;

	// If clicked or pressed enter => Submit
	if (e.charCode === 13 || e.charCode === undefined) {
		const upperText = text.toUpperCase();

		if (intent !== 'add') {
			e.preventDefault();
			dispatch(delSection({ name: upperText }));
			document.getElementById('add-section-input').value = '';
			setText('');
            onClose();
			return;
		}

		// Text not empty
		if (text === '') {
			setError(true);
			setHelpText("Can't be Empty");
			return;
		}
		for (let i = 0; i < sections.length; i++) {
			if (sections[i].name === upperText) {
				setError(true);
				setHelpText('Section Already Exists');
				return;
			}
		}
		e.preventDefault();
		dispatch(addSection({ name: upperText, tasks: [] }));
		document.getElementById('add-section-input').value = '';
		setText('');
        onClose();
	}
	setError(false);
	setHelpText('');
};

export default SectionModal;
