import React from 'react';

// Custom components
import EditTodoModal from './EditTodoModal.js';

// Material UI components
import {
	Grid,
	Typography,
	Checkbox,
	IconButton,
	Button,
	Modal,
} from '@material-ui/core';

// Material UI Icons
import DeleteIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';
import { green, red, yellow } from '@material-ui/core/colors';

// Redux
import { useDispatch } from 'react-redux';
import {
	delTodo,
	toggleTodo,
	editTodo,
} from '../../../../../../actions/todoActions.js';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '10px -5px',
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.elevated[2]
				: theme.palette.background.default,
		paddingRight: '5px',
		borderRadius: '5px',
	},

	text: {
		opacity: (props) => (!props.todo.completed ? '1' : '0.4'),
		textDecoration: (props) =>
			!props.todo.completed ? '' : 'line-through',
	},
	editIcon: {
		color: theme.palette.type === 'dark' ? yellow[400] : yellow[700],
	},
	priorBox: {
		color: (props) =>
			props.todo.priority === 'high'
				? theme.palette.type === 'dark'
					? theme.palette.secondary.light
					: theme.palette.secondary.main
				: props.todo.priority === 'med'
				? theme.palette.primary.light
				: theme.palette.primary.dark,
		backgroundColor: theme.palette.type === 'dark' ? 'black' : 'white',
	},
}));

export const TodoItem = (props) => {
	const classes = useStyles(props);
	const { todo, section } = props;

	const [open, setOpen] = React.useState(false);

	const handleCloseModal = () => {
		setOpen(false);
	};

	const dispatch = useDispatch();

	const stateProps = { todo, section, dispatch };

	return (
		<Grid
			container
			spacing={1}
			direction="row"
			justify="space-between"
			alignItems="center"
			className={classes.root}>
			<Grid item>
				<Checkbox
					checked={todo.completed ? true : false}
					onChange={() => dispatch(toggleTodo({ ...todo, section }))}
					style={{ color: green[400] }}></Checkbox>
			</Grid>
			<Grid item xs={4} sm={6} md={8} lg={9} align="left">
				<Typography
					variant="h5"
					component="div"
					className={classes.text}>
					{todo.text}
				</Typography>
			</Grid>
			<Grid item>
				<Button
					disableElevation
					size="small"
					variant="outlined"
					className={classes.priorBox}
					disabled={todo.completed}
					onClick={() => togglePriority(stateProps)}>
					{todo.completed ? 'Done' : todo.priority}
				</Button>
			</Grid>
			<Grid item>
				<div onClick={() => setOpen(true)}>
					<IconButton variant="outlined" className={classes.editIcon}>
						<EditIcon />
					</IconButton>
				</div>
				<Modal
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					open={open}
					onClose={handleCloseModal}>
					<EditTodoModal
						todo={todo}
						section={section}
						onClose={handleCloseModal}
					/>
				</Modal>
			</Grid>

			<Grid item style={{ justifyContent: 'flex-end' }}>
				<IconButton
					variant="outlined"
					style={{ color: red[400] }}
					onClick={() => dispatch(delTodo({ ...todo, section }))}>
					<DeleteIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
};

const togglePriorityUtil = (prior) => {
	if (prior === 'low') {
		return 'med';
	} else if (prior === 'med') {
		return 'high';
	}
	return 'low';
};

const togglePriority = (stateProps) => {
	const { todo, section, dispatch } = stateProps;

	dispatch(
		editTodo({
			originalTodo: todo,
			text: todo.text,
			section,
			priority: togglePriorityUtil(todo.priority),
			completed: todo.completed,
		})
	);
	return;
};

export default TodoItem;
