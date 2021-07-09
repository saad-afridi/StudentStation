import React from 'react';

import PageTitle from '../../Utils/PageTitle';
import { Grid, TextField, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useDispatch } from 'react-redux';
import authLogin from '../../../actions/authActions';
import authRegister from '../../../actions/authActions';

const useStyles = makeStyles({
	auth: {
		margin: '100px 0px',
	},
});

const Auth = () => {
	const classes = useStyles();

	const [username, setUsername] = React.useState();
	const [password, setPass] = React.useState();

	const dispatch = useDispatch();

	const stateProps = { username, password, dispatch };

	return (
		<>
			<PageTitle
				text={'Login/Register'}
				icon={
					<HomeIcon style={{ transform: 'scale(2.0)' }} />
				}></PageTitle>
			<Grid
				container
				direction="column"
				className={classes.auth}
				spacing={1}
				justifyContent="center"
				alignItems="center">
				<Grid
					container
					direction="row"
					spacing={2}
					alignItems="center"
					justifyContent="center">
					<Grid item>
						<TextField
							variant="filled"
							label="Username"
							onChange={(e) =>
								setUsername(e.target.value)
							}></TextField>
					</Grid>
					<Grid item>
						<TextField
							type="password"
							variant="filled"
							label="Password"
							onChange={(e) =>
								setPass(e.target.value)
							}></TextField>
					</Grid>
				</Grid>
				<Grid
					style={{ margin: '10px' }}
					container
					direction="row"
					spacing={2}
					justifyContent="center"
					alignItems="center">
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							onClick={() => tryLogin(stateProps)}>
							Login
						</Button>
					</Grid>
					<Grid item>
						<Button
							onClick={() => tryRegister(stateProps)}
							variant="outlined"
							color="secondary">
							Register
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

const tryLogin = (stateProps) => {
	const { dispatch, username, password } = stateProps;
	dispatch(authLogin({ username, password }));
};

const tryRegister = (stateProps) => {
	const { dispatch, username, password } = stateProps;
	dispatch(authRegister({ username, password }));
};

export default Auth;
