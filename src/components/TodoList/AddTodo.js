import React from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../../actions/todoActions';

import AddIcon from '@material-ui/icons/Add';
import { Grid, TextField, Fab } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		marginBottom: '35px',
	},
});

export const AddTodo = () => {
	const classes = useStyles();

	const [text, setText] = React.useState('');
	const { todos } = useSelector((state) => state.todoListState);
	const dispatch = useDispatch();

	const stateProps = { text, setText, dispatch, todos };

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
					label="Add a Task"
					fullWidth={true}
					id="add-task-input"
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
	const { text, setText, dispatch, todos } = stateProps;

	// If clicked or pressed enter => Submit
	if (e.charCode === 13 || e.charCode === undefined) {
		let isFormValid = true;

		// Text not empty
		if (text === '') isFormValid = false;

		for (let i = 0; i < todos.length; i++) {
			if (todos[i].text === text) {
				isFormValid = false;
			}
		}

		e.preventDefault();
		if (isFormValid) dispatch(addTodo({ text, completed: false }));
		document.getElementById('add-task-input').value = '';
		setText('');
	}
};

export default AddTodo;
