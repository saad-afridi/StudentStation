export const addTodo = (payload) => {
	return {
		type: 'ADD-TODO',
		payload
	};
};

export const delTodo = (payload) => {
	return {
		type: 'DELETE-TODO',
		payload
	};
};

export const toggleTodo = (payload) => {
	return {
		type: 'TOGGLE-TODO',
		payload
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