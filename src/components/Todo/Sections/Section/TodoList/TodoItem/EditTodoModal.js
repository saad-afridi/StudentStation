import React from 'react';

// MUI Components
import {
	TextField,
	Grid,
	Paper,
	Typography,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Button,
} from '@material-ui/core';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { editTodo } from '../../../../../../actions/todoActions';

const useStyles = makeStyles({
	paperForm: {
		position: 'absolute',
		padding: '20px 10px',
	},
	priorForm: {
		minWidth: 80,
		margin: '20px',
	},
	contentForm: {
		minwidth: 400,
		margin: '20px 0px',
	},
});

const EditTodoModal = (props) => {
	const classes = useStyles();
	const { todo, section } = props;

	const [text, setText] = React.useState(todo.text);
	const [prior, setPrior] = React.useState(todo.priority);

	// Error handling
	const [hasError, setError] = React.useState(false);
	const [helpText, setHelpText] = React.useState('');

	// Redux
	const { sections } = useSelector((state) => state.todoListState);
	const dispatch = useDispatch();

	const stateProps = {
		todo,
		text,
		prior,
		section,
		setError,
		setHelpText,
		dispatch,
		sections,
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
						id="edit-task-content-input"
						multiline
						error={hasError}
						helperText={helpText}
						defaultValue={todo.text}
						autoFocus
						onChange={(e) => setText(e.target.value)}
						onKeyPress={(e) => submitForm(e, stateProps)}
					/>
				</Grid>
				<Grid item>
					<FormControl className={classes.priorForm}>
						<InputLabel id="set-priority-task">Priority</InputLabel>
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
				<Grid item alignItems="center" justify="center">
					<Button
						variant="contained"
						color="primary"
						onClick={(e) => submitForm(e, stateProps)}>
						Confirm
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
};

const submitForm = (e, stateProps) => {
	const {
		todo,
		text,
		prior,
		section,
		setError,
		setHelpText,
		dispatch,
		sections,
	} = stateProps;

	if (e.charCode === undefined) {
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
		dispatch(
			editTodo({
                originalTodo: todo,
				text,
				priority: prior,
				completed: todo.completed,
				section,
			})
		);
	}
	setError(false);
	setHelpText('');
};

export default EditTodoModal;
