import React, { useState, useEffect } from 'react';
import { Grid, Avatar, Typography } from "@material-ui/core";
import { Post } from './';
import { EditPost } from './Forms';
import { UserAPI, PostAPI, FollowAPI } from '../api';
import { Link } from 'react-router-dom';

const UserProfile = ({ user }, { match }) => {

    const [name, setName] = useState('');
    const [urlPic, setPic] = useState(null);
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [editPost, openEditForm] = useState(null);
 
   useEffect(() => {
        getUser(match.params.id);
        getPosts(match.params.id);
        setPostCount(posts.length);
        getFollowers(match.params.id);
        getFollowing(match.params.id)
    }, [match, posts]);

    const getUser = id => UserAPI.getById(id, userInfo => { setName(userInfo.name);  setPic(userInfo.urlPic); });

    const getFollowers = following => FollowAPI.get({ following }, data => setFollowers(data.length));

    const getFollowing = follower => FollowAPI.get({ follower }, data => setFollowing(data.length));

    const EditPostToggle = data => openEditForm(data);

    const updatePost = data => PostAPI.update(data, () => getPosts());

    const deleteById = id => PostAPI.delete(id, () => getPosts());

    const getPosts = creator => PostAPI.getByUserId(creator, data => setPosts(data));

    return(
        <Grid container direction="column" alignItems="center" spacing={0}>
                <Grid item style={{ width: '100%', maxWidth: 580, padding: 28 }}>
                    <div className="row m-5" style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                    <Avatar src={urlPic} style={{ width: 100, height: 100 }} />
                    <Link to="/"><b>HomePage</b></Link>
                    </div>
                    <Typography variant="h4" align="center" className="w-100 pt-2 pb-4">{name}</Typography>
                    <Typography variant="h6" align="center" className="w-100">Posts: {postCount}</Typography>
                    <Typography variant="h6" align="center" className="w-100">Follwers: {followers}</Typography>
                    <Typography variant="h6" align="center" className="w-100">Following: {following}</Typography>
                    <hr />
                </Grid>
                <Grid item style={{ width: '95%', maxWidth: 580 }}>
                    <Grid container direction="column" alignItems="center" spacing={0}>
                        {posts.map(post => <Post key={post._id} data={post} user={user} deleteById={deleteById} editForm={EditPostToggle} />)}
                    </Grid>
                </Grid>
                {editPost && <EditPost creator={user} post={editPost} closeForm={EditPostToggle} updatePost={updatePost}/>}
            </Grid>
    );
};

export default UserProfile;