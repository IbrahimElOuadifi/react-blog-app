import React, { useState, useEffect } from 'react';
import { Grid, Typography } from "@material-ui/core";
import { NavBar, Post } from './';
import { NewPost, EditPost } from './Forms';
import { PostAPI } from '../api';
import { Link } from 'react-router-dom';

const HomePage = ({ user, authUser }) => {

    const [posts, setPosts] = useState([]);
    const [newPost, openNewForm] = useState(false);
    const [editPost, openEditForm] = useState(null);

    useEffect(() => {
        getPosts();
    }, []);

    const newPostToggle = () => {
        openNewForm(!newPost);
        openEditForm(null);
    };

    const EditPostToggle = data => {
        openEditForm(data);
        openNewForm(false);
    };

    const getPosts = () => PostAPI.getAll(data => setPosts(data));

    const addPost = data => PostAPI.create(data, () => getPosts());

    const updatePost = data => PostAPI.update(data, () => getPosts());

    const deleteById = id => PostAPI.delete(id, () => getPosts());

    //!user.password && push('/set');

    return(
        <Grid container direction="column" alignItems="center" spacing={0}>
                <Grid item style={{ width: '100%', maxWidth: 580, padding: 28 }}>
                    <Link to="/set"><Typography align="center" color={user.password ? 'primary' : 'secondary'}>set Password</Typography></Link>
                    <NavBar user={user} open={newPostToggle} logout={authUser}/>
                    <hr />
                </Grid>
                <Grid item style={{ width: '95%', maxWidth: 580 }}>
                    <Grid container direction="column" alignItems="center" spacing={0}>
                        {posts.map(post => <Post key={post._id} data={post} user={user} deleteById={deleteById} editForm={EditPostToggle} />)}
                    </Grid>
                </Grid>
                {newPost && <NewPost creator={user} closeForm={newPostToggle} addPost={addPost}/>}
                {editPost && <EditPost creator={user} post={editPost} closeForm={EditPostToggle} updatePost={updatePost}/>}
            </Grid>
    );
};

export default HomePage;