import React from 'react';

import { Grid } from '@material-ui/core';
// import { Container, Typography } from '@material-ui/core'

// import Typical from 'react-typical';

// import PageTitle from '../components/PageTitle';
// import Info from '../components/Home/Info';

// import HomeIcon from '@material-ui/icons/Home';

// import changeThemeGif from '../assets/changetheme.gif';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	animation: {
		margin: '100px 0px',
		padding: '20px',
	},
}));

const HomePage = () => {
	const classes = useStyles();

	return (
		<Grid
			container
			className={classes.animation}
			justify="center"
			alignItems="center">
			{/* <Typography variant="h1" color="secondary">
				<Typical
					steps={[
						'Time To Play Games?',
						1000,
						'Time To Work.',
					]}
					loop={1}
				/>
			</Typography> */}
			{/*
			<Info
				img={
					<img
						src={changeThemeGif}
						alt="Changing Theme Gif"
					/>
				}
				text="Change Themes"
                subtext="Choose to display from one of the two options i.e. Light/Dark."
			/> */}
		</Grid>
	);
};

export default HomePage;
