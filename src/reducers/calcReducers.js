// <Courses> is a lit of <Course> objects
// where <Course> has keys, name and marks
// name is a unique id of a <Course>
// marks is a list of all the marks of a <Course>

const getlocalCourses = () => {
	const savedCourses = localStorage.getItem('courses');
	if (savedCourses) {
		return JSON.parse(savedCourses);
	}
	return [];
};

const initialState = {
	courses: getlocalCourses(),
};

export default function calcReducers(state=initialState, action) {
    switch(action.type) {
        case 'ADD-COURSE':
            saveData([...state.courses, action.payload]);
            return {courses: [...state.courses, action.payload]}
        case 'DELETE-COURSE':
            return state;
        case 'ADD-MARK':
            return state;
        case 'DELETE-MARK':
            return state;
        default:
            return state;
    }
}

const saveData = (courses) => {
	localStorage.setItem('courses', JSON.stringify(courses));
};