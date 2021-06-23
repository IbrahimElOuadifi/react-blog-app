import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Grid, Typography } from "@material-ui/core";
//import { Post } from './';
import { EditPost } from './Forms';
import api from '../api';

const SavedPosts = () => {

    const user = useSelector(state => state.user)
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [editPost, openEditForm] = useState(null);
 
   useEffect(() => {
        getPosts(user._id);
    }, [user]);

    const EditPostToggle = data => {
        openEditForm(data);
    };

    const updatePost = ({ id, title }) => {
        api.put(`post/${id}/`, { title })
        .then(resp => { console.log(resp.data); getPosts(); })
        .catch(err => console.error(err.message));
    };

    const getPosts = fromUser => {
        const data = [];
        api.get('save/', { params: { fromUser } })
            .then(resp => {
                console.log(resp.data)
                setPostCount(resp.data.length);
                setPosts(resp.data);
                resp.data.forEach(({ toPost }) => {
                    api.get('post/', { params: { _id: toPost } })
                    .then(resp => data.push(resp.data[0]))
                    .catch(err => console.error(err.message));
                });
            })
            //.then(() => setPosts(data))
            .catch(err => console.error(err.message));
    };

    return(
        <Grid container direction="column" alignItems="center" spacing={0}>
                <Grid item style={{ width: '100%', maxWidth: 580, padding: 28 }}>
                <Typography variant="h4" align="center" className="w-100 pt-2 pb-4">Saves</Typography>
                <Typography variant="h6" align="center" className="w-100">Saved posts: {postCount}</Typography>
                <hr />
                </Grid>
                <Grid item style={{ width: '95%', maxWidth: 580 }}>
                    <Grid container direction="column" alignItems="center" spacing={0}>
                        {posts.map(post => <Typography key={post._id}>{JSON.stringify(post)}</Typography>)}
                    </Grid>
                </Grid>
                {editPost && <EditPost creator={user} post={editPost} closeForm={EditPostToggle} updatePost={updatePost}/>}
            </Grid>
    );
};

export default SavedPosts;