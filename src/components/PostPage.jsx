import React, { useState, useEffect } from 'react';
import { Grid, Typography } from "@material-ui/core";
// import { Post } from './';
import { EditPost } from './Forms';
import api from '../api';

const PostPage = ({ user }, { match }) => {

    const [posts, setPosts] = useState([]);
    const [editPost, openEditForm] = useState(null);
 
   useEffect(() => {
        getPosts(match.params.id);
    }, [match, posts]);

    const EditPostToggle = data => {
        openEditForm(data);
    };

    const updatePost = ({ id, title }) => {
        api.put(`post/${id}/`, { title })
        .then(resp => { console.log(resp.data); getPosts(); })
        .catch(err => console.error(err.message));
    };

    // const deleteById = id => {
    //     api.delete(`post/${id}/`)
    //     .then(resp => { console.log('Delete', resp.data); getPosts(); })
    //     .catch(err => console.log(err));
    // };

    const getPosts = creator => {
        api.get('post/', { params: { creator } })
            .then(resp => setPosts(resp.data))
            .catch(err => console.error(err.message));
    };

    return(
        <Grid container direction="column" alignItems="center" spacing={0}>
                <Grid item style={{ width: '100%', maxWidth: 580, padding: 28 }}>
                <Typography variant="h4" align="center" className="w-100 pt-2 pb-4">Post Page</Typography>
                    <hr />
                </Grid>
                <Grid item style={{ width: '95%', maxWidth: 580 }}>
                    <Grid container direction="column" alignItems="center" spacing={0}>
                        {/* {posts.map(post => <Post key={post._id} data={post} user={user} deleteById={deleteById} editForm={EditPostToggle} />)} */}
                        <Typography variant="h2" align="center" className="w-100 pt-2 pb-4">Soon</Typography>
                    </Grid>
                </Grid>
                {editPost && <EditPost creator={user} post={editPost} closeForm={EditPostToggle} updatePost={updatePost}/>}
            </Grid>
    );
};

export default PostPage;