// <todos> is a list of <todo> obj that have
// attributes text, completed

/*
An example of the state is:
[
    section1: [
        {
            text: 'Finish Homework'
            completed: false
        },
        {
            text: 'Eat Dinner'
            completed: true
        }
    ],
    section2: [
        {
            text: 'Workout 30 mins everyday'
            completed: false
        }
    ],
    ...
]

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
	sections: [{ name: 'Daily', tasks: [] }],
	todos: getLocalTodos(),
};

export default function todoReducers(state = initialState, action) {
	switch (action.type) {
		case 'ADD-SECTION':
			return {
				...state,
				sections: [action.payload, ...state.sections],
			};

		case 'DELETE-SECTION':
			return state;

		case 'ADD-TODO':
			return { ...state, sections: addTodo(state, action.payload) };

		case 'DELETE-TODO':
			return { todos: delTodo(state, action.payload) };

		case 'TOGGLE-TODO':
			return { todos: toggleTodo(state, action.payload) };

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
			...state.sections[payload.section].tasks
		]
	};
    state.sections[payload.section] = newSection;
    return state.sections;
};

const delTodo = (state, todo) => {
	const newTodos = state.todos.filter(function (value) {
		return value.text !== todo.text;
	});
	saveData(newTodos);
	return newTodos;
};

const toggleTodo = (state, todo) => {
	const newTodos = state.todos.map((_todo) => {
		if (todo === _todo) {
			return {
				..._todo,
				completed: !todo.completed,
			};
		}
		return _todo;
	});
	saveData(newTodos);
	return newTodos;
};

const saveData = (todos) => {
	localStorage.setItem('todos', JSON.stringify(todos));
};
