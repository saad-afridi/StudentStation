import React from 'react';

// Material UI Components
import {
	Grid,
	Typography,
	Paper,
	TextField,
	FormControl,
	MenuItem,
	InputLabel,
	Select,
	Button,
	Snackbar,
} from '@material-ui/core';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../../../actions/todoActions';

const useStyles = makeStyles({
	paperForm: {
		position: 'absolute',
		padding: '20px 10px',
	},
	priorForm: {
		minWidth: 80,
		margin: '20px',
	},
	sectForm: {
		minWidth: 150,
		margin: '20px',
	},
	contentForm: {
		minwidth: 400,
		margin: '20px 0px',
	},
});

export const TaskModal = () => {
	const classes = useStyles();
	const [text, setText] = React.useState('');
	const [section, setSection] = React.useState(0);
	const [prior, setPrior] = React.useState('low');

	// Error handling | Feedback
	const [hasError, setError] = React.useState(false);
	const [helpText, setHelpText] = React.useState('');
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	// Redux
	const { sections } = useSelector((state) => state.todoListState);
	const dispatch = useDispatch();

	const stateProps = {
		text,
		setText,
		setError,
		setHelpText,
		section,
		prior,
		dispatch,
		sections,
        handleClick,
	};

	return (
		<Paper component="div" className={classes.paperForm}>
			<Grid
				container
				direction="column"
				justify="flex-start"
				alignItems="stretch"
				spacing={4}>
				<Grid item>
					<Typography variant="h3"> Add Task </Typography>
				</Grid>
				<Grid item>
					<TextField
						variant="filled"
						fullWidth
						className={classes.contentForm}
						label="Task Content"
						id="add-task-content-input"
						multiline
						error={hasError}
						helperText={helpText}
						placeholder="for e.g. Finish Assignment"
						autoFocus
						onChange={(e) => setText(e.target.value)}
						onKeyPress={(e) => submitForm(e, stateProps)}
					/>
				</Grid>
				<Grid
					container
					direction="row"
					justify="space-around"
					spacing={2}>
					<Grid item>
						<FormControl className={classes.priorForm}>
							<InputLabel id="set-priority-task">
								Priority
							</InputLabel>
							<Select
								id="set-priority"
								defaultValue={'low'}
								value={prior}
								onChange={(e) => setPrior(e.target.value)}>
								<MenuItem value={'low'}>Low</MenuItem>
								<MenuItem value={'med'}>Medium</MenuItem>
								<MenuItem value={'high'}>High</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item>
						<FormControl className={classes.sectForm}>
							<InputLabel id="set-priority-task">
								Section
							</InputLabel>
							<Select
								id="set-section"
								defaultValue={'Daily'}
								value={section}
								onChange={(e) => setSection(e.target.value)}>
								{sections.map((_value, _index) => {
									return (
										<MenuItem value={_index}>
											{' '}
											{String(_value.name)}{' '}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<Grid item alignItems="center" justify="center">
					<Button
						variant="contained"
						color="primary"
						onClick={(e) => submitForm(e, stateProps)}>
						Create
					</Button>
                    <Snackbar
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                        open={open}
                        autoHideDuration={1000}
                        onClose={handleClose}
                        message="Task Created!"
                    />
				</Grid>
			</Grid>
		</Paper>
	);
};

const submitForm = (e, stateProps) => {
	const {
		text,
		setText,
		setError,
		setHelpText,
		section,
		prior,
		dispatch,
		sections,
        handleClick
	} = stateProps;

	// If clicked or pressed enter => Submit
	if (e.charCode === 13 || e.charCode === undefined) {
		// Text not empty
		if (text === '') {
			setError(true);
			setHelpText("Can't be Empty");
			return;
		}
		for (let i = 0; i < sections[section].tasks.length; i++) {
			if (sections[section].tasks[i].text === text) {
				setError(true);
				setHelpText('Task Already Exists');
				return;
			}
		}
		e.preventDefault();
		dispatch(addTodo({ text, priority: prior, completed: false, section }));
		document.getElementById('add-task-content-input').value = '';
		setText('');
        handleClick();
	}
	setError(false);
	setHelpText('');
};

export default TaskModal;
