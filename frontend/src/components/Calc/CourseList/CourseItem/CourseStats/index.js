import React from 'react';

// Custom Components
import StatsBox from './StatsBox';

// Material UI Components
import { Grid } from '@material-ui/core';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	infoBox: {},
});

export const CourseStats = (props) => {
	const classes = useStyles();
	const { want, marks } = props.course;

	let need = 0;
	let totalWeight = 0;
	let currentTotalMarks = 0;

	for (let i = 0; i < marks.length; i++) {
		currentTotalMarks += marks[i].mark * (marks[i].weight / 100);
		totalWeight += marks[i].weight;
	}

	need = ((want - currentTotalMarks) / (100 - totalWeight)) * 100;

	let showNeed = false;
	let change = '';

	// If need can be attained
	if (need <= 100 && need >= 0 && totalWeight <= 100) {
		need = String(need.toFixed(1));
		showNeed = true;
	} else if (need < 0) {
		change = 'L';
	} else if (need > 100) {
		change = 'H';
	}

	return (
		<>
			<Grid
				container
				direction="row"
				justifyContent="space-around"
				alignItems="center"
				spacing={2}
				className={classes.root}>
				<Grid item>
					<StatsBox
						heading={'Current Avg %'}
						stat={String(
							((currentTotalMarks / totalWeight) * 100).toFixed(1)
						)}
						isImp={false}
						change={change}
					/>
				</Grid>

				<Grid item>
					<StatsBox
						heading={showNeed ? 'You Need %' : 'Impossible'}
						stat={showNeed ? need : '-'}
						isImp={!showNeed}
						change={change}
					/>
				</Grid>

				<Grid item>
					<StatsBox
						heading={'Course Left %'}
						stat={String((100 - totalWeight).toFixed(1))}
						isImp={false}
						change={change}
					/>
				</Grid>
				<Grid item>
					<StatsBox
						heading={'Obtained %'}
						stat={String(currentTotalMarks.toFixed(1))}
						isImp={false}
						change={change}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default CourseStats;
