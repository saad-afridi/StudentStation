import { makeStyles } from '@material-ui/core';
import { Grid, Typography, Button } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.elevated[2]
				: theme.palette.elevated[1],
        borderRadius: "15px",
	},
	button: {
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.primary.main
				: theme.palette.secondary.main,
	},
}));

const ShowTotalTime = (props) => {
	const classes = useStyles();
	const { totalTime, resetTotalTimeFn } = props;
	return (
		<Grid
			container
			direction="row "
			justify="center"
			alignItems="center"
			spacing={2}
			className={classes.root}>
			<Grid item>
				<Typography variant="h5">
					{Math.floor(totalTime / 60) + ' mins'}
				</Typography>
			</Grid>
			<Grid item>
				<Button
                    size="small"
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={() => resetTotalTimeFn()}>
					Reset
				</Button>
			</Grid>
		</Grid>
	);
};

export default ShowTotalTime;
