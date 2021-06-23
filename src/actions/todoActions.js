// payload: { text: str, completed: bool, priority: str, section: int }
export const addTodo = (payload) => {
	return {
		type: 'ADD-TODO',
		payload
	};
};

// payload: { text: str, completed: bool, priority: str, sectionName: str }
export const delTodo = (payload) => {
	return {
		type: 'DELETE-TODO',
		payload
	};
};

// payload: { text: str, completed: bool, priority: str, sectionName: str }
export const toggleTodo = (payload) => {
	return {
		type: 'TOGGLE-TODO',
		payload
	};
};

// section: { name: str, tasks: [] }
export const addSection = (section) => {
    return {
        type: 'ADD-SECTION',
        payload: section
    }
}

// sectionName: { name: str }
export const delSection = (sectionName) => {
    return {
        type: 'DELETE-SECTION',
        payload: sectionName
    }
}