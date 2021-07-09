/*
An example of the state is:
{
    sections : [
        {
            name: 'Section1'
            tasks : [
                {
                    text: 'Eat Detergent!'
                    completed: false
                    priority: 'high'
                },
                ...
            ]
        },
        {
            name: 'Section2'
            tasks : []
        },
        ...
    ]
}
*/

const getLocalTodos = () => {
	const localTodos = localStorage.getItem('todoData');
	if (localTodos) {
		const savedTodos = JSON.parse(localTodos);
		return savedTodos;
	}
	return [
		{
			name: 'DAILY',
			tasks: [
				{
					text: 'Task 1 - Low Priority',
					priority: 'low',
					completed: false,
				},
				{
					text: 'Task 2 - High Priority',
					priority: 'high',
					completed: false,
				},
			],
		},
	]
};

const initialState = {
	sections: getLocalTodos(),
};

export default function todoReducers(state = initialState, action) {
	let newSections;
	switch (action.type) {
		case 'ADD-SECTION':
			newSections = [...state.sections, action.payload];
			saveData(newSections);
			return { sections: newSections };

		case 'DELETE-SECTION':
			newSections = state.sections.filter(
				(section) => section.name !== action.payload.name
			);
			saveData(newSections);
			return { sections: newSections };

		case 'ADD-TODO':
			return { sections: addTodo(state, action.payload) };

		case 'EDIT-TODO':
			return { sections: editTodo(state, action.payload) };

		case 'DELETE-TODO':
			return { sections: delTodo(state, action.payload) };

		case 'TOGGLE-TODO':
			return { sections: toggleTodo(state, action.payload) };

		default:
			return state;
	}
}

const addTodo = (state, payload) => {
	const newSection = {
		name: state.sections[payload.section].name,
		tasks: [
			{
				text: payload.text,
				completed: payload.completed,
				priority: payload.priority,
			},
			...state.sections[payload.section].tasks,
		],
	};
	state.sections[payload.section] = newSection;
	saveData(state.sections);
	return state.sections;
};

const editTodo = (state, payload) => {
	const newTask = {
		text: payload.text,
		completed: payload.completed,
		priority: payload.priority,
	};
	const allSectionTasks = state.sections[payload.section].tasks;
	for (let i = 0; i < allSectionTasks.length; i++) {
		if (allSectionTasks[i].text === payload.originalTodo.text) {
			allSectionTasks[i] = newTask;
			break;
		}
	}
	saveData(state.sections);
	return state.sections;
};

const delTodo = (state, payload) => {
	state.sections[payload.section].tasks = state.sections[
		payload.section
	].tasks.filter((task) => task.text !== payload.text);
	saveData(state.sections);
	return state.sections;
};

const toggleTodo = (state, payload) => {
	state.sections[payload.section].tasks = state.sections[
		payload.section
	].tasks.map((_task) => {
		if (_task.text === payload.text) {
			return {
				..._task,
				completed: !_task.completed,
			};
		}
		return _task;
	});
	saveData(state.sections);
	return state.sections;
};

const saveData = (todos) => {
	localStorage.setItem('todoData', JSON.stringify(todos));
};
