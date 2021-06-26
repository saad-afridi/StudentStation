import React from 'react';

import { Grid, Card, Typography, Icon } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import More from '@material-ui/icons/ExpandLess';
import Less from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
	statContainer: {
		padding: '10px',
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.elevated[1]
				: theme.palette.primary.main,
		width: '125px',
	},
	impContainer: {
		padding: '10px',
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.elevated[3]
				: theme.palette.primary.dark,
		width: '125px',
	},
	stat: {
		color:
			theme.palette.type === 'dark'
				? theme.palette.secondary.main
				: theme.palette.background.default,
	},
	impStat: {
		color: red[400],
	},
	header: {
		color: '#FFFFFFCC',
	},
}));

export const StatsBox = (props) => {
	const { heading, stat, isImp, change } = props;
	const classes = useStyles();
	return (
		<Grid
			container
			component={Card}
			direction="column"
			alignItems="center"
			className={isImp ? classes.impContainer : classes.statContainer}>
			<Grid item className={classes.header}>
				<Typography variant="subtitle1" align="center">
					{heading}
				</Typography>
			</Grid>
			<Grid item>
				{!isImp ? (
					<Typography
						variant="h4"
						align="center"
						className={classes.stat}>
						{stat}
					</Typography>
				) : (
					<Icon size="medium">
						{change === 'H' ? (
							<Less className={classes.impStat} />
						) : (
							<More className={classes.impStat} />
						)}
					</Icon>
				)}
			</Grid>
		</Grid>
	);
};

export default StatsBox;
