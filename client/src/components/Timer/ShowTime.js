import React from 'react';

// Material UI Components
import { Typography, Grid } from '@material-ui/core';

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
	root: {
		margin: '5px 0px 50px 15px',
		color: (props) => {
			if (props.pomOn && props.session % 2 === 0) {
				if (theme.palette.type === 'light') {
					return theme.palette.elevated[3];
				} else {
					return theme.palette.primary.dark;
				}
			} else if (theme.palette.type === 'light') {
				return theme.palette.primary.main;
			} else {
				return theme.palette.text.primary;
			}
		},
	},
});

class ShowTime extends React.Component {
	render() {
		const { classes } = this.props;
		let { timeLeft } = this.props;
		if (timeLeft < 0) {
			timeLeft = 0;
		}

		let hours = String((timeLeft / 3600) | 0);
		let mins = String((timeLeft / 60) % 60 | 0);
		let secs = String(timeLeft % 60);

		if (Number(hours) < 10) {
			hours = '0' + hours;
		}
		if (Number(mins) < 10) {
			mins = '0' + mins;
		}
		if (Number(secs) < 10) {
			secs = '0' + secs;
		}

		return (
			<Grid container justify="center" alignItems="center">
				<Grid item>
					<Typography
						variant="h1"
						component="div"
						className={classes.root}>
						{hours + ':' + mins + ':' + secs}
					</Typography>
				</Grid>
			</Grid>
		);
	}
}

ShowTime.propTypes = {
	classes: PropTypes.object.isRequired,
	pomOn: PropTypes.bool.isRequired,
	session: PropTypes.number.isRequired,
};

export default withStyles(styles)(ShowTime);
