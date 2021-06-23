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
	const localTodos = localStorage.getItem('todos');
	if (localTodos) {
		const savedTodos = JSON.parse(localTodos);
		return savedTodos;
	}
	return [];
};

const initialState = {
	sections: [
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
	],
};

export default function todoReducers(state = initialState, action) {
	switch (action.type) {
		case 'ADD-SECTION':
			return { sections: [...state.sections, action.payload] };

		case 'DELETE-SECTION':
            console.log(action.payload, state.sections)
			return {
				sections: state.sections.filter(
					(section) => section.name !== action.payload.name
				),
			};

		case 'ADD-TODO':
			return { sections: addTodo(state, action.payload) };

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
	return state.sections;
};

const delTodo = (state, payload) => {
	let chosenSection, i;
	console.log(state, payload);
	for (i = 0; i < state.sections.length; i++) {
		if (state.sections[i].name === payload.sectionName) {
			chosenSection = state.sections[i];
			break;
		}
	}
	const newTasks = chosenSection.tasks.filter(
		(task) => task.text !== payload.text
	);
	chosenSection.tasks = newTasks;
	state.sections[i] = chosenSection;
	return state.sections;
};

const toggleTodo = (state, payload) => {
	let chosenSection, i;
	console.log(state, payload);
	for (i = 0; i < state.sections.length; i++) {
		if (state.sections[i].name === payload.sectionName) {
			chosenSection = state.sections[i];
			break;
		}
	}
	const newTasks = chosenSection.tasks.map((_task) => {
		if (_task.text === payload.text) {
			return {
				..._task,
				completed: !_task.completed,
			};
		}
		return _task;
	});
	chosenSection.tasks = newTasks;
	state.sections[i] = chosenSection;
	return state.sections;
};

const saveData = (todos) => {
	localStorage.setItem('todos', JSON.stringify(todos));
};
