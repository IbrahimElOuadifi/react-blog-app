import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar,IconButton, Typography, Button, TextField } from '@material-ui/core';
import { Favorite, FavoriteBorder, Share, Bookmark, BookmarkBorder, MoreVert, DeleteOutline } from '@material-ui/icons';
import Comment from './Comment';
import { UserAPI, FollowAPI, CommentAPI, LikeAPI, SaveAPI } from '../api';

const Post = ({ data, deleteById }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user)
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [saves, setSaves] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [urlPic, setPic] = useState(null);
    const [isFollowing, setFollow] = useState(false);

    useEffect(() => {
        getUser();
        getFollow();
        getComments();
        getLikes();
        getSaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const HandelSubmit = e => {
        e.preventDefault();
        createComment();
        setText('');
    };

    const getComments = () => CommentAPI.get(data._id, data => setComments(data));

    const createComment = () => CommentAPI.create({ fromUser: user._id, toPost: data._id, text }, () => getComments());

    const getFollow = () => FollowAPI.get({ follower: user._id, following: data.creator }, data => data.length ? setFollow(true) : setFollow(false));

    const handleFollow = () => FollowAPI.update({ follower: user._id, following: data.creator }, () => getFollow());

    const getLikes = () => LikeAPI.get(data._id, (data, err) => setLikes(data));

    const handleLike = () => LikeAPI.update({ fromUser: user._id, toPost: data._id }, (data, err) => getLikes());

    const getSaves = () => SaveAPI.get(data._id, data => setSaves(data));

    const handleSave = () => SaveAPI.update({ fromUser: user._id, toPost: data._id }, () => getSaves());

    const handleShare = () => {
        const el = document.createElement('textarea');
        el.value = data.title;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    const getUser = () => UserAPI.getById(data.creator, userInfo => { setName(userInfo.name);  setPic(userInfo.urlPic); });

    const getDate = () => `${data.createAt.split('T')[0]} - ${data.createAt.split('T')[1].split('.')[0]}`;

    const editForm = () => dispatch({ type: 'SET_EDIT_FORM', payload: data })

    return(
        <Grid item style={{ width: '100%' }}>
            <Card>
            <CardHeader
            avatar={
                <Link to={`/user/${data.creator}`}>
                <Avatar aria-label="user" src={urlPic}>
                    {/* {name && name.split(' ')[0].split('')[0].toUpperCase() + name.split(' ')[1] ? name.split(' ')[1].split('')[0].toUpperCase() : ''} */}
                </Avatar>
                </Link>
            }
            action={
                data.creator === user._id
                ? (<IconButton onClick={editForm}><MoreVert /></IconButton>)
                : isFollowing ? <Button size="small" variant="text" color="secondary"  onClick={handleFollow}>Unfolow</Button> : <Button size="small" variant="text" color="primary" onClick={handleFollow}>Folow</Button>
            }
            title={<b><Link to={`/user/${data.creator}`}>{name}</Link></b>}
            subheader={getDate()}/>
            <CardMedia
            image={data.img}
            style={{ height: 0, paddingTop: '56.25%' }}/>
            <CardActions disableSpacing>
                <div className="row align-items-center w-100 px-3">
                    <IconButton onClick={handleLike}>
                        {likes.some(({ fromUser, toPost }) => fromUser === user._id && toPost === data._id) ? <Favorite color="secondary" /> : <FavoriteBorder color="secondary" /> }
                    </IconButton>
                    {/* likes.some(({ fromUser, toPost }) => fromUser === user && toPost === data._id) ? `You and ${likes.length - 1}` : likes.length */}
                    {likes.length > 0 && likes.length + (likes.length > 1 ? ' likes' : ' like')}
                    <IconButton onClick={handleShare}>
                        <Share color="primary" />
                    </IconButton>
                    {
                        data.creator === user._id &&
                        (
                            <IconButton  onClick={deleteById.bind(this, data._id)}>
                                <DeleteOutline color="error" />
                            </IconButton>
                        )
                    }
                </div>
                <IconButton onClick={handleSave}>
                    {saves.some(({ fromUser, toPost }) => fromUser === user._id && toPost === data._id) ? <Bookmark /> : <BookmarkBorder /> }
                </IconButton>
            </CardActions>
            <CardContent>
                <Typography paragraph>
                    {/* <b>{data.creator}</b> */}{data.title}
                </Typography>
                <hr/>
                { 
                    comments.map(({ _id, fromUser, text }) => {
                        return (<Comment key={_id} id={_id} text={text} fromUser={fromUser} creatorId={data.creator} getComments={getComments} />)
                    })
                }
                {
                    user._id !== null &&
                    (
                        <CardContent>
                            <form onSubmit={HandelSubmit}>
                                <div className="input-group">
                                <TextField className='form-control' variant="standard" value={text} onChange={e => setText(e.target.value)} required />
                                <Button type="submit" variant="text" color="primary">POST</Button>
                                </div>
                            </form>
                        </CardContent>
                    )
                }
            </CardContent>
            </Card>
        </Grid>
    )
}

export default Post;