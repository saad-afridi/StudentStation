import React from 'react';

import { Grid, Card, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	statContainer: {
		padding: '10px',
		backgroundColor: theme.palette.type === "dark" 
                        ? theme.palette.elevated[2] 
                        : theme.palette.primary.main,
		width: '125px',
	},
	stat: {
		color: theme.palette.type === "dark" 
        ? theme.palette.secondary.main
        : theme.palette.background.default,
	},
    header: {
        color: theme.palette.type === "dark" ? "#FFFFFFCC" : "#FFFFFFCC",
    }
}));

export const StatsBox = (props) => {
	const { heading, stat } = props;
	const classes = useStyles();
	return (
		<Grid
			container
			component={Card}
			direction="column"
			alignItems="center"
			className={classes.statContainer}>
			<Grid item className={classes.header}>
				<Typography variant="subtitle1" align="center">
					{heading}
				</Typography>
			</Grid>
			<Grid item>
				<Typography
					variant="h4"
					align="center"
					className={classes.stat}>
					{stat}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default StatsBox;
