import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	infoBox: {
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.elevated[2]
				: theme.palette.primary.main,
		color: '#FFFFFFCC',
	},
	picture: {
		margin: '10px 0px',
	},
}));

const Info = (props) => {
	const classes = useStyles();
	const { img, text, subtext } = props;

	return (
		<Grid
			container
			spacing={1}
			direction="row"
			justify="space-around"
			alignItems="center"
			className={classes.infoBox}>
			<Grid item className={classes.picture}>
				<Box
					width="356px"
					height="356px"
					border={3}
					borderColor="background.default">
					{img}
				</Box>
			</Grid>
            <Grid item>
                <Grid container direction="column" spacing={4} justify="flex-start" alignItems="flex-start">
                    <Grid item>
                        <Typography variant="h2">{text}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">{subtext} </Typography>
                    </Grid>
			    </Grid>
            </Grid>
		</Grid>
	);
};

export default Info;
