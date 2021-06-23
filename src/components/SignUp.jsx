import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Grow, Grid, Paper, Typography, TextField, Button  } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { AuthAPI } from '../api';
import { authUser } from '../static/functions'

const CLIENT_ID='545124959549-2d6bjd431tf3he2ak5itpvp22o6l4h6o.apps.googleusercontent.com';

const LogIn = () => {

    const dispatch = useDispatch()
    const { push } = useHistory()

    const [ fields, setFields ] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');

    const handleSubmit = () => AuthAPI.register(fields, (userInfo, err) => err ? setError(err) : authUser({ userInfo, push, dispatch }));

    const googleSuccess = ({ profileObj }) => {
        const { name, email, imageUrl } = profileObj;
        AuthAPI.google({ email, name, urlPic: imageUrl }, (userInfo, err) => err ? setError(err) : authUser({ userInfo, push, dispatch }));
    };

    const googleFailure = err => console.log(err);

    return(
        <Grow in>
            <Grid container style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' }}>
                <Paper style={{ width: '90%', maxWidth: 480, margin: 8, padding: 16 }}>
                    <Typography variant="h4" align="center" className="m-4">REGISTER</Typography>
                    <GoogleLogin 
                        clientId={CLIENT_ID}
                        render={(renderProps) => (
                            <Button className="w-100" variant="contained" color="secondary" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                    />
                    <Typography align="center" variant="subtitle1">
                        or
                    </Typography>
                    <TextField variant="outlined" label="Name" value={fields.name} onChange={e => setFields({ ...fields, name: e.target.value })} size="small" className="w-100 my-2" />
                    <TextField variant="outlined" label="Email" value={fields.email} onChange={e => setFields({ ...fields, email: e.target.value })} size="small" className="w-100 my-2" />
                    <TextField variant="outlined" label="Password" value={fields.password} onChange={e => setFields({ ...fields, password: e.target.value })} size="small" type="password" className="w-100 my-2" />
                    <TextField variant="outlined" label="Confirm Password" value={fields.confirmPassword} onChange={e => setFields({ ...fields, confirmPassword: e.target.value })} size="small" type="password" className="w-100 my-2" />
                    <Button className="w-100 my-2" variant="outlined" color="primary" onClick={handleSubmit}>Register</Button>
                    <Typography align="center" variant="subtitle1" color="error">
                        {error}
                    </Typography>
                </Paper>
                <Paper style={{ width: 480, margin: 8, padding: 8 }}>
                    <div></div>
                    <Typography align="center" variant="subtitle1">
                    Have an account? <Link to="/"><b>Sign in</b></Link>
                    </Typography>
                </Paper>
            </Grid>
        </Grow>
    );
}

export default LogIn;