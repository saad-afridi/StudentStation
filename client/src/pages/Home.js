import React from 'react';
import { useSelector } from 'react-redux';

// Custom Components
import Animation from '../components/Home/Animation';
import Auth from '../components/Home/Auth';

// MUI Components
import { Container, Grid, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {},
}));

const HomePage = () => {
	const classes = useStyles();
	const { authenticated, user } = useSelector((state) => state.authState);

	return (
		<Container className={classes.root}>
			{' '}
			{authenticated ? <Animation name={user.username} /> : <Auth />}{' '}
		</Container>
	);
};

export default HomePage;
