import React from 'react';
import TodoItem from './TodoItem';
import { Grid } from '@material-ui/core';

export const TodoList = (props) => {
	const { todos } = props;
    console.log(props);

	const completed = todos.filter(function (value) {
		return value.completed === true;
	});

	const notcompleted = todos.filter(function (value) {
		return value.completed === false;
	});

	return (
		<Grid container direction="column" justify="center" alignItem="center">
            {notcompleted.map((_todo, _index) => {
                return <TodoItem key={_index} todo={_todo}></TodoItem>;
            })}
			{completed.length > 0 ? <hr></hr> : ''}
            {completed.map((_todo, _index) => {
                return <TodoItem key={_index} todo={_todo}></TodoItem>;
            })}
		</Grid>
	);
};

export default TodoList;
