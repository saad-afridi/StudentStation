import React from 'react';
import TodoItem from './TodoItem';
import { Grid, Divider, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	divider: {
		backgroundColor: theme.palette.type === 'dark' ? 'white' : 'black',
		margin: '10px 30px',
	},
}));

function sortItemsByPriority(items) {
	const highPrior = items.filter((item) => item.priority === 'high');
	const medPrior = items.filter((item) => item.priority === 'med');
	const lowPrior = items.filter((item) => item.priority === 'low');
	return [...highPrior, ...medPrior, ...lowPrior];
}

export const TodoList = (props) => {
	const classes = useStyles();
	const { todos, section } = props;

	const tasks = sortItemsByPriority(todos);
	const completed = tasks.filter(function (value) {
		return value.completed === true;
	});

	const notcompleted = tasks.filter(function (value) {
		return value.completed === false;
	});

	return (
		<Grid container direction="column" justifyContent="center" alignItems="center">
			{notcompleted.map((_todo, _index) => {
				return (
					<TodoItem
						key={_index}
						todo={_todo}
						section={section}></TodoItem>
				);
			})}
			{completed.length > 0 && notcompleted.length > 0 ? (
				<Grid item>
					<Divider variant="middle" className={classes.divider} />
				</Grid>
			) : (
				''
			)}
			{completed.map((_todo, _index) => {
				return (
					<TodoItem
						key={_index}
						todo={_todo}
						section={section}></TodoItem>
				);
			})}
		</Grid>
	);
};

export default TodoList;
