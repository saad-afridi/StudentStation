import React from 'react';
import TodoItem from './TodoItem';
import { Grid, Divider } from '@material-ui/core';

function sortItemsByPriority(items) {
	const highPrior = items.filter((item) => item.priority === 'high');
	const medPrior = items.filter((item) => item.priority === 'med');
	const lowPrior = items.filter((item) => item.priority === 'low');
	return [...highPrior, ...medPrior, ...lowPrior];
}

export const TodoList = (props) => {
	const { todos, sectionName } = props;

	const tasks = sortItemsByPriority(todos);
	const completed = tasks.filter(function (value) {
		return value.completed === true;
	});

	const notcompleted = tasks.filter(function (value) {
		return value.completed === false;
	});

	return (
		<Grid container direction="column" justify="center" alignItem="center">
			{notcompleted.map((_todo, _index) => {
				return (
					<TodoItem
						key={_index}
						todo={_todo}
						sectionName={sectionName}></TodoItem>
				);
			})}
			{completed.length > 0 ? <Divider /> : ''}
			{completed.map((_todo, _index) => {
				return (
					<TodoItem
						key={_index}
						todo={_todo}
						sectionName={sectionName}></TodoItem>
				);
			})}
		</Grid>
	);
};

export default TodoList;
