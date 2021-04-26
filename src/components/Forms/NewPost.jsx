import React, { useState } from 'react';
import { Grow, Button, IconButton } from "@material-ui/core";
import { Close } from '@material-ui/icons';
import FileBase from 'react-file-base64';

const NewPost = ({ closeForm, addPost, creator }) => {

    const [title, setTitle] = useState('');
    const [img, setIMG] = useState('');

    const handleSubmit = e => {
        if(img === '') return alert('Image is required !');
        addPost({ title, img, creator });
        closeForm();
        e.preventDefault();
    }

    return(
        <Grow in>
            <form className="form-group p-4 bg-light" autoComplete="off" onSubmit={handleSubmit} style={{ position: 'fixed', top: '35%', width: '80%', maxWidth: 580, height: 300, borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <input className="form-control" type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} required />
                    <FileBase multiple={ false } onDone={ ({ base64 }) => setIMG(base64) } />
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                    <IconButton onClick={closeForm} style={{ position: 'absolute', top: 0, right: 0 }}>
                        <Close/>
                    </IconButton>
            </form>
        </Grow>
    );
}

export default NewPost;