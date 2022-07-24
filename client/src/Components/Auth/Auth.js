import React, { useState } from 'react';
import { Avatar, Paper, Grid, Typography, Container, Button, Icon } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { Input } from './Input';

export const Auth = () => {
	const classes = useStyles();
	const [isSignup, setIsSignup] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = () => {
		console.log("Submitted...")
	}

	const handleChange = () => {
		console.log("Submitted...");
	}

	const handleShowPassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	}

	const switchAuthMode = () => {
		setIsSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	}

	const googleSuccess = async (res) => {
		console.log(res);
		const profileObj = jwt_decode(res?.credential);
		console.log(profileObj);

		try {
			dispatch({ type: 'AUTH', data: { profileObj } });
			navigate('/')
		} catch (error) {
			console.log(error);
		}
	}

	const googleFailure = (error) => {
		console.log(error);
		console.log("Unsuccssful...try again later")
	}

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5"> {isSignup ? "Sign up" : "Sign in"} </Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
								<Input name="lastName" label="Last Name" handleChange={handleChange} half />
							</>
						)}
						<Input name="email" label="Email Address" handleChange={handleChange} type="email" />
						<Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
						{isSignup && <Input name="confirmPassword" label="Re-enter password" handleChange={handleChange} type={"password"} />}
					</Grid>
					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignup ? "Sign up" : "Sign In"}</Button>
					<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
						<GoogleLogin
							onSuccess={googleSuccess}
							onFailure={googleFailure}
						/>
					</GoogleOAuthProvider>

					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Button onClick={switchAuthMode}>
								{isSignup ? "Already registered? Sign In" : "Not registered? Sign up here"}
							</Button>
						</Grid>
					</Grid>
				</form>

			</Paper>

		</Container>
	)
}
