import React from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../../actions/todoActions';

import AddIcon from '@material-ui/icons/Add';
import {
	Grid,
	TextField,
	Fab,
	FormControl,
	Select,
    MenuItem,
    InputLabel
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { green, red, blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
	addTodoForm: {
		marginBottom: '35px',
	},
    priorForm: {
        fullWidth: true,
        minWidth: 120,
    },
}));

export const AddTodo = () => {
	const classes = useStyles();

	const [text, setText] = React.useState('');
	const [prior, setPrior] = React.useState('low');
	const { todos } = useSelector((state) => state.todoListState);
	const dispatch = useDispatch();

	const stateProps = { text, setText, prior, setPrior, dispatch, todos };

	return (
		<Grid
			container
			spacing={1}
			direction="row"
			className={classes.addTodoForm}
			justify="space-between"
			alignItems="center">
			<Grid item xs={5} sm={7} md={9}>
				<TextField
					variant="filled"
					label="Add a Task"
					fullWidth
					id="add-task-input"
					autoFocus={true}
                    InputLabelProps={{
                        shrink: true,
                    }}
					onChange={(e) => setText(e.target.value)}
					onKeyPress={(e) => submitForm(e, stateProps)}></TextField>
			</Grid>
			<Grid item >
                <FormControl className={classes.priorForm}>
                    <InputLabel id="set-priority-task">Priority</InputLabel>
                    <Select
                    id="set-priority"
                    defaultValue={"low"}
                    value={prior}
                    onChange={(e) => setPrior(e.target.value)}
                    >
                    <MenuItem value={"low"}>Low</MenuItem>
                    <MenuItem value={"med"}>Medium</MenuItem>
                    <MenuItem value={"high"}>High</MenuItem>
                    </Select>
                </FormControl>
				
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
	const { text, setText, dispatch, todos, prior, setPrior } = stateProps;

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
		if (isFormValid) dispatch(addTodo({ text, priority: prior, completed: false }));
		document.getElementById('add-task-input').value = '';
		setText('');
        setPrior('low');
	}
};

export default AddTodo;
