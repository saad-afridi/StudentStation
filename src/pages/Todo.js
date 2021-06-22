import React from 'react';

// Todo Components
import TodoList from '../components/Todo/TodoList';
import AddTodo from '../components/Todo/AddTodo';
import PageTitle from '../components/PageTitle';
import AddTasksAndSections from '../components/Todo/AddTasksAndSections';

// Material UI Components
import { Container } from '@material-ui/core';

// Material UI Icons
import ListIcon from '@material-ui/icons/ListAlt';

export default function ToDoPage() {
	return (
		<Container className="TodoContainer">
			<PageTitle
				text={'Tasks To Do'}
				icon={<ListIcon style={{ transform: 'scale(2.0)' }} />}
			/>
            <AddTasksAndSections />
			<AddTodo />
			<TodoList />
		</Container>
	);
}
