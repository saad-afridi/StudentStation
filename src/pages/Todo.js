import React from 'react';

// Todo Components
import TodoList from '../components/Todo/TodoList';
import AddTodo from '../components/Todo/AddTodo';
import PageTitle from '../components/PageTitle';

// Material UI Components
import { Container } from '@material-ui/core';

// Material UI Icons
import ListIcon from '@material-ui/icons/ListAlt';

export default function ToDoPage() {
	return (
		<Container className="TodoContainer">
			<PageTitle
				text={'What To Do?'}
				icon={<ListIcon style={{ transform: 'scale(2.0)' }} />}
			/>
			<AddTodo />
			<TodoList />
		</Container>
	);
}
