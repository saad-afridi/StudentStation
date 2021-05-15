import React from 'react';

// Material UI components
import { Grid, Typography, Checkbox, IconButton } from '@material-ui/core';

// Material UI Icons
import DeleteIcon from '@material-ui/icons/Clear';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

// Redux
import { useDispatch } from 'react-redux';
import { delTodo, toggleTodo } from '../../actions/todoActions.js';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '10px 0px 10px 0px',
		backgroundColor: theme.palette.elevated[1],
		paddingRight: '5px',
		borderRadius: '5px',
	},

	text: {
		opacity: (props) => (!props.todo.completed ? '1' : '0.4'),
		textDecoration: (props) =>
			!props.todo.completed ? '' : 'line-through',
	},
}));

export const TodoItem = (props) => {
	const classes = useStyles(props);
	const { todo } = props;
	const dispatch = useDispatch();

	return (
		<Grid
			container
			spacing={1}
			direction="row"
			justify="space-between"
			alignItems="center"
			className={classes.root}
		>
			<Grid item>
				<Checkbox
					checked={todo.completed ? true : false}
					onChange={() => dispatch(toggleTodo(todo))}
					style={{ color: green[400] }}
				></Checkbox>
			</Grid>
			<Grid item xs={6} sm={8} md={10} align="left">
				<Typography
					variant="h5"
					component="div"
					className={classes.text}
				>
					{todo.text}
				</Typography>
			</Grid>
			<Grid item style={{ justifyContent: 'flex-end' }}>
				<IconButton
					variant="outlined"
					style={{ color: red[400] }}
					onClick={() => dispatch(delTodo(todo))}
				>
					<DeleteIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default TodoItem;
