export const addCourse = (course) => {
	return { type: 'ADD-COURSE', payload: course };
};

export const delCourse = (course) => {
	return { type: 'DELETE-COURSE', payload: course };
};

export const addMark = (course) => {
	return { type: 'ADD-MARK', payload: course };
};

export const delMark = (course) => {
	return { type: 'DELETE-MARK', payload: course };
};

export const changeWantedMark = (course) => {
    return { type: 'CHANGE-WANTED-MARK', payload: course};
}
