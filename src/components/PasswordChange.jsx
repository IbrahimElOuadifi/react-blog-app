import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grow, Grid, Paper, Typography, TextField, Button  } from '@material-ui/core';
import { AuthAPI } from '../api';

const PasswordChange = ({ user, authUser }) => {

    const [pass, setPass] = useState(null);
    const [fields, setFields] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        AuthAPI.getPass(user._id,(pass, err) => err ? setError(err) : setPass(pass));
    }, [user]);

    const handleSubmit = () => AuthAPI.setPass(user._id, fields, (userInfo, err) => err ? setError(err) : authUser(userInfo));

    return(
        <Grow in>
            <Grid container style={{ display: 'flex', flexDirection: 'column', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh' }}>
                <Paper style={{ width: '90%', maxWidth: 480, margin: 8, padding: 16 }}>
                    {pass && (<TextField variant="outlined" label="Old Password" value={fields.oldPassword} onChange={e => setFields({ ...fields, oldPassword: e.target.value })} size="small" type="password" className="w-100 my-2" />)}
                    <TextField variant="outlined" label="New Password" value={fields.newPassword} onChange={e => setFields({ ...fields, newPassword: e.target.value })} size="small" type="password" className="w-100 my-2" />
                    <TextField variant="outlined" label="Confirm Password" value={fields.confirmPassword} onChange={e => setFields({ ...fields, confirmPassword: e.target.value })} size="small" type="password" className="w-100 my-2" />
                    <Button className="w-100 my-2" variant="outlined" color="primary" onClick={handleSubmit}>Change Password</Button>
                    <Typography align="center" variant="subtitle1" color="error">
                        {error}
                    </Typography>
                    <Link to="/"><Typography align="center" color="primary">HomePage</Typography></Link>
                </Paper>
            </Grid>
        </Grow>
    );
}

export default PasswordChange;