import React from 'react';

// Calc Components
import PageTitle from '../components/Utils/PageTitle';
import AddCourse from '../components/Calc/AddCourse';
import CourseList from '../components/Calc/CourseList';


// Material UI Components
import { Container } from '@material-ui/core';

// Material UI Icons
import FaceIcon from '@material-ui/icons/Face';

export const CalculatorPage = () => {
	return (
		<Container className="CalcContainer">
			<PageTitle
				text={'Prepare and Analyze'}
				icon={<FaceIcon style={{ transform: 'scale(2.0)' }} />}
			/>
			<AddCourse />
			<CourseList />
		</Container>
	);
};

export default CalculatorPage;
