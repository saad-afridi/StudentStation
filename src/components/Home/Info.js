import React from 'react';

import { Grid, Typography, GridList, GridListTile} from '@material-ui/core';

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
        <GridList cols={2} cellWidth={180}>
            <GridListTile>
                {img}
            </GridListTile>
            <GridListTile>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h2">{text}</Typography>
                    </Grid>
		 			<Grid item wrap="nowrap" xs zeroMinWidth>
		 				<Typography variant="h5">{subtext} </Typography>
		 			</Grid>
                </Grid>

            </GridListTile>
        </GridList>
		// <Grid
		// 	container
		// 	spacing={1}
		// 	direction="row"
		// 	justify="space-evenly"
		// 	alignItems="center"
		// 	className={classes.infoBox}>
		// 	<Grid item className={classes.picture}>
		// 		{img}
		// 	</Grid>
		// 	<Grid item>
		// 		<Grid 
        //             wrap="nowrap"
		// 			container
		// 			direction="column"
		// 			spacing={4}
		// 			justify="center"
		// 			alignItems="stretch">
		// 			<Grid item>
		// 				<Typography variant="h2">{text}</Typography>
		// 			</Grid>
		// 			<Grid item wrap="nowrap" xs zeroMinWidth>
		// 				<Typography variant="h5">{subtext} </Typography>
		// 			</Grid>
		// 		</Grid>
		// 	</Grid>
		// </Grid>
	);
};

export default Info;
