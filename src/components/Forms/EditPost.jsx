import React, { useState, useEffect } from 'react';
import { Grow, Button, IconButton } from "@material-ui/core";
import { Close } from '@material-ui/icons';

const EditPost = ({ post, creator, closeForm, updatePost }) => {

    const [title, setTitle] = useState('');

    useEffect(() => {
        setTitle(post.title);
    }, [post]);

    const handleSubmit = e => {
        updatePost({ id: post._id, title });
        closeForm(null);
        e.preventDefault();
    }

    return(
        <Grow in>
            <form className="form-group p-4 bg-light" autoComplete="off" onSubmit={handleSubmit} style={{ position: 'fixed', top: '35%', width: '80%', maxWidth: 580, height: 300, borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <input className="form-control" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                    <IconButton onClick={closeForm.bind(this, null)} style={{ position: 'absolute', top: 0, right: 0 }}>
                        <Close/>
                    </IconButton>
            </form>
        </Grow>
    );
}

export default EditPost;