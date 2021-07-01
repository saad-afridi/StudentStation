import React from 'react';
import Typist from 'react-typist'

import { Grid, Typography } from '@material-ui/core';
// import { Container, Typography } from '@material-ui/core'

// import Typical from 'react-typical';

// import PageTitle from '../components/PageTitle';
// import Info from '../components/Home/Info';

// import HomeIcon from '@material-ui/icons/Home';

// import changeThemeGif from '../assets/changetheme.gif';

import { makeStyles } from '@material-ui/core/styles';

const doneCursor = {
    show: true,
    blink: true,
    element: '|',
    hideWhenDone: true,
    hideWhenDoneDelay: 0,
}

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
            direction="column"
			container
			className={classes.animation}
			justify="center"
			alignItems="center">

                <Grid item>
                    <Typography variant="h1" color="primary">
                        <Typist cursor={doneCursor} avgTypingDelay={100}>
                            Dear Me,
                            <Typist.Delay ms={500} />
                            <br />
                            Time to Play Games?
                            <Typist.Backspace count = {11} delay={200} />
                            Work.
                            <Typist.Delay ms={500} />
                            <br />
                            <br />
                            Sincerely,
                            <Typist.Delay ms={200} />
                            <br />
                            Myself :)
                        </Typist>
                    </Typography>
                </Grid>      
		</Grid>
	);
};

export default HomePage;
