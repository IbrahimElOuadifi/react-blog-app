import React, { useState, useEffect } from 'react';
import { Grid, Typography } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { NavBar, Post } from './';
import { NewPost, EditPost } from './Forms';
import { PostAPI, AuthAPI } from '../api';

const HomePage = () => {

    const user = useSelector(state => state.user)
    const [posts, setPosts] = useState([]);
    const newPost = useSelector(state => state.forms.new);
    const editPost = useSelector(state => state.forms.edit)

    const { push } = useHistory();

    useEffect(() => {
        getPosts();
        AuthAPI.getPass(user._id, (pass, err) => err ? console.error(err) : !pass && push('/set'));
    }, [user, push]);

    const getPosts = () => PostAPI.getAll(data => setPosts(data));

    const addPost = data => PostAPI.create(data, () => getPosts());

    const updatePost = data => PostAPI.update(data, () => getPosts());

    const deleteById = id => PostAPI.delete(id, () => getPosts());

    return(
        <Grid container direction="column" alignItems="center" spacing={0}>
                <Grid item style={{ width: '100%', maxWidth: 580, padding: 28 }}>
                    <Link to="/set"><Typography align="center" color={true ? 'primary' : 'secondary'}>set Password</Typography></Link>
                    <NavBar />
                    <hr />
                </Grid>
                <Grid item style={{ width: '95%', maxWidth: 580 }}>
                    <Grid container direction="column" alignItems="center" spacing={0}>
                        {posts.map(post => <Post key={post._id} data={post} user={user} deleteById={deleteById} />)}
                    </Grid>
                </Grid>
                {newPost && <NewPost addPost={addPost}/>}
                {editPost && <EditPost updatePost={updatePost}/>}
            </Grid>
    );
};

export default HomePage;