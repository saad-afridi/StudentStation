import React from 'react';
import Typist from 'react-typist';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const doneCursor = {
	show: true,
	blink: true,
	element: '|',
	hideWhenDone: true,
	hideWhenDoneDelay: 0,
};

const useStyles = makeStyles((theme) => ({
	animation: {
		margin: '100px 0px',
		padding: '20px',
	},
}));

const Animation = (props) => {
	const classes = useStyles();
	const { name } = props;
	return (
		<Container className={classes.animation}>
			<Typography variant="h1" color="primary">
				<Typist cursor={doneCursor} avgTypingDelay={100}>
					Dear {name},
					<Typist.Delay ms={500} />
					<br />
					Time to Play Games?
					<Typist.Backspace count={11} delay={200} />
					Work.
					<Typist.Delay ms={500} />
				</Typist>
			</Typography>
		</Container>
	);
};

export default Animation;
