import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography, Button } from '@material-ui/core';
import { authUser } from '../static/functions'

const NavBar = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { push } = useHistory()

    const logout = () => {
        authUser({ userInfo: null, dispatch, push })
    }

    const open = () => dispatch({ type: 'SET_NEW_FORM', payload: true })

    return(
        <Grid container justify="space-around" alignItems="center">
        <Typography variant="h4" align="center" className="w-100 pt-2 pb-4"><Link to={`/user/${user._id}`}>{user.name}</Link></Typography>
        <Button variant="outlined" color="primary" onClick={open}>New Post</Button>
        <Button variant="contained" color="secondary" onClick={logout.bind(this, null)}>Logout</Button>
        </Grid>
    )
}

export default NavBar;