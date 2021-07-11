import React from 'react';

import PageTitle from '../../Utils/PageTitle';
import { Grid, TextField, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { authLogin, authRegister } from '../../../actions/authActions';

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
	const authErrors = useSelector((state) => state.authErrorsState);

	console.log(authErrors);

	// Error checking
	const userError = authErrors.username.length > 0;
	const passError = authErrors.password.length > 0;

    let userErrorText = '';
    let passErrorText = '';
	if (userError) userErrorText = authErrors.username;
	if (passError) passErrorText = authErrors.password;

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
							required
							error={userError}
							helperText={userErrorText}
							onChange={(e) => setUsername(e.target.value)}
							variant="filled"
							label="Username"></TextField>
					</Grid>
					<Grid item>
						<TextField
							minLength={5}
							required
							error={passError}
							helperText={passErrorText}
							onChange={(e) => setPass(e.target.value)}
							type="password"
							variant="filled"
							label="Password"></TextField>
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
