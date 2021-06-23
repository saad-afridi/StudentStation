import React from 'react';

// Material UI components
import {
	Grid,
	Typography,
	Checkbox,
	IconButton,
	Button,
    Avatar
} from '@material-ui/core';

// Material UI Icons
import DeleteIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';
import { green, red, yellow } from '@material-ui/core/colors';

// Redux
import { useDispatch } from 'react-redux';
import { delTodo, toggleTodo } from '../../../../../actions/todoActions.js';

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
    editIcon : {
        color: theme.palette.type === 'dark' ? yellow[400] : yellow[700]
    },
	priorBox: {
        color: (props) => 
        props.todo.priority === 'high'
        ? theme.palette.type === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.main
        : props.todo.priority === 'med'
            ? theme.palette.primary.light
            : theme.palette.primary.dark,
        backgroundColor: theme.palette.type === 'dark' ? "black" : "white",
    },
}));

export const TodoItem = (props) => {
	const classes = useStyles(props);
	const { todo, sectionName } = props;
	const dispatch = useDispatch();

	return (
		<Grid
			container
			spacing={1}
			direction="row"
			justify="space-between"
			alignItems="center"
			className={classes.root}
			fullWidth>
			<Grid item>
				<Checkbox
					checked={todo.completed ? true : false}
					onChange={() => dispatch(toggleTodo({ ...todo, sectionName }))}
					style={{ color: green[400] }}></Checkbox>
			</Grid>
			<Grid item xs={6} sm={8} md={9} align="left">
				<Typography
					variant="h5"
					component="div"
					className={classes.text}>
					{todo.text}
				</Typography>
			</Grid>
			<Grid item>
				<Button disableElevation size="small" variant="outlined" className={classes.priorBox} disabled={todo.completed}>
					{todo.completed ? 'Done' : todo.priority}
				</Button>
			</Grid>
			<Grid item>
				<IconButton variant="outlined" className={classes.editIcon}>
					<EditIcon />
				</IconButton>
			</Grid>

			<Grid item style={{ justifyContent: 'flex-end' }}>
				<IconButton
					variant="outlined"
					style={{ color: red[400] }}
					onClick={() => dispatch(delTodo({ ...todo, sectionName }))}>
					<DeleteIcon />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default TodoItem;
