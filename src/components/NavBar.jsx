import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';

const NavBar = ({ user, open, logout }) => {
    return(
        <Grid container justify="space-around" alignItems="center">
        <Typography variant="h4" align="center" className="w-100 pt-2 pb-4"><Link to={`/user/${user._id}`}>{user.name}</Link></Typography>
        <Button variant="outlined" color="primary" onClick={open}>New Post</Button>
        <Button variant="contained" color="secondary" onClick={logout.bind(this, null)}>Logout</Button>
        </Grid>
    )
}

export default NavBar;