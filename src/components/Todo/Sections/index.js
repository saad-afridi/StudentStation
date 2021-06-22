import React from 'react';

import Section from './Section';

import { useSelector } from 'react-redux';

export const Sections = () => {
	const { sections } = useSelector((state) => state.todoListState);
	return (
		<div>
			{sections.map((_value, _ind) => {
				return (
					<Section key={_ind} name={_value.name} tasks={_value.tasks}></Section>
				);
			})}
		</div>
	);
};

export default Sections;
