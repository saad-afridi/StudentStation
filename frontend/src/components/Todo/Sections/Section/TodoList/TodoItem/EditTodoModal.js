import React from 'react';
import PropTypes from 'prop-types';

// MUI Components
import {
	TextField,
	Grid,
	Paper,
	Typography,
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
		margin: '0px',
	},
	contentForm: {
		minwidth: 400,
		margin: '20px 0px',
	},
});

const EditTodoModal = (props) => {
	const classes = useStyles();
	const { todo, section, onClose } = props;

	const [text, setText] = React.useState(todo.text);

	// Error handling
	const [hasError, setError] = React.useState(false);
	const [helpText, setHelpText] = React.useState('');

	// Redux
	const { sections } = useSelector((state) => state.todoListState);
	const dispatch = useDispatch();

	const stateProps = {
		todo,
		text,
		section,
		setError,
		setHelpText,
		dispatch,
		sections,
		onClose,
	};

	return (
		<Paper component="div" className={classes.paperForm}>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="stretch"
				spacing={4}>
				<Grid item style={{ minWidth: '400px v' }}>
					<Typography variant="h3">Edit Task Content</Typography>
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
				<Grid item alignItems="center" justifyContent="center">
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
		section,
		setError,
		setHelpText,
		dispatch,
		sections,
		onClose,
	} = stateProps;

	if (e.charCode === undefined) {
		if (text === '') {
			setError(true);
			setHelpText("Can't be Empty");
			return;
		}
		for (let i = 0; i < sections[section].tasks.length; i++) {
			if (
				sections[section].tasks[i].text === text &&
				todo.text !== text
			) {
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
				priority: todo.priority,
				completed: todo.completed,
				section,
			})
		);
		onClose();
	}
	setError(false);
	setHelpText('');
};

EditTodoModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	todo: PropTypes.object.isRequired,
	section: PropTypes.number.isRequired,
};

export default EditTodoModal;
