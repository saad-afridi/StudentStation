/*
<courses> is a list of <course> objects
where <course> has keys: name, marks, and want
    want: is a number representing how much they want to end up
        with (num)
    name: is a unique id of a <course> (str)
    marks: is a list of all the mark objects in a <course> (list)
    where mark has keys: type, mark, and weight
        type: is the name of said assessment (str)
        mark: is the mark obtained in said assessment (int)
        weight: is the weight of said assessment (int)

Example:
    courses: [
    {
        want: 80,
        name: "Course 1",
        marks: [
            {type: "test", mark: 80, weight: 40},
            {type: "a1", mark:40, weight:15},
            ...
        ]
    },
    ...
]
*/

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

export default function calcReducers(state = initialState, action) {
	switch (action.type) {
		case 'ADD-COURSE':
			saveData([...state.courses, action.payload]);
			return { courses: [...state.courses, action.payload] };
		case 'DELETE-COURSE':
			return { courses: deleteCourse(state, action.payload) };
		case 'ADD-MARK':
			return { courses: replaceCourse(state, action.payload) };
		case 'DELETE-MARK':
			return { courses: replaceCourse(state, action.payload) };
        case 'CHANGE-WANTED-MARK':
			return { courses: replaceCourse(state, action.payload) };
		default:
			return state;
	}
}

const saveData = (courses) => {
	localStorage.setItem('courses', JSON.stringify(courses));
};

const replaceCourse = (state, course) => {
	const newCourses = state.courses.map((_course) => {
		if (_course.name === course.name) {
			return course;
		}
		return _course;
	});

	saveData(newCourses);
	return newCourses;
}; 

const deleteCourse = (state, course) => {
    const newCourses = state.courses.filter(function(value) {
        return value.name !== course.name;
    })
    saveData(newCourses);
	return newCourses;
};