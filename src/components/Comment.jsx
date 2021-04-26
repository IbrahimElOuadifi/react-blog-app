import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { UserAPI, CommentAPI } from '../api';

const Comment = ({ id, fromUser, text, creatorId, user, getComments }) => {

    const [name, setName] = useState('');

    useEffect(()=> {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUser = () => UserAPI.getById(fromUser, userInfo => setName(userInfo.name));

    const deleteComment = id => CommentAPI.delete(id, () => getComments());

    return(
        <div className="input-group">
            <Typography className="form-control" style={{ borderWidth: 0 }} variant="subtitle1"><b><Link to={`/user/${fromUser}`}>{name}</Link>:</b> {text}</Typography>
            {
                (creatorId === user._id || fromUser === user._id) && <IconButton size="small" onClick={deleteComment.bind(this, id)}><Close color="error" /></IconButton>
            }
        </div>
    );
};

export default Comment;