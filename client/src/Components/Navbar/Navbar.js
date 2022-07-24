import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useNavigate, useLocation } from "react-router-dom";

import useStyles from './styles';
import memoriesImage from '../../images/memories.png'
import { useDispatch } from 'react-redux';


export const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate("/");
        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center"> Memories</Typography>
                <img className={classes.image} src={memoriesImage} alt="Memories Icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.profileObj.name} src={user.profileObj.picture}>{user.profileObj.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.profileObj.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                ) :
                    (
                        <Button component={Link} to="/auth" variant='contained' color="primary">Signin</Button>
                    )}
            </Toolbar>

        </AppBar>
    )
}
