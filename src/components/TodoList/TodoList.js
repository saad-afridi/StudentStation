import React from 'react';
import TodoItem from './TodoItem';

import { useSelector } from 'react-redux';

export const TodoList = () => {
	const { todos } = useSelector((state) => state.todoListState);

	const completed = todos.filter(function (value) {
		return value.completed === true;
	});

	const notcompleted = todos.filter(function (value) {
		return value.completed === false;
	});

	return (
		<>
			<div className="CompletedContainer">
				{notcompleted.map((_todo, _index) => {
					return <TodoItem key={_index} todo={_todo}></TodoItem>;
				})}
			</div>
			{completed.length > 0 ? <hr></hr> : ''}
			<div className="NotCompletedContainer">
				{completed.map((_todo, _index) => {
					return <TodoItem key={_index} todo={_todo}></TodoItem>;
				})}
			</div>
		</>
	);
};

export default TodoList;
