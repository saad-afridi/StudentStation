export const addTodo = (todo) => {
	return {
		type: 'ADD-TODO',
		payload: todo,
	};
};

export const delTodo = (todo) => {
	return {
		type: 'DELETE-TODO',
		payload: todo,
	};
};

export const toggleTodo = (todo) => {
	return {
		type: 'TOGGLE-TODO',
		payload: todo,
	};
};

export const addSection = (sectionName) => {
    return {
        type: 'ADD-SECTION',
        payload: sectionName
    }
}

export const delSection = (sectionName) => {
    return {
        type: 'DELETE-SECTION',
        payload: sectionName
    }
}