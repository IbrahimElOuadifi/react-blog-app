import axios from 'axios';

const baseURL = 'https://mern-blog-2456.herokuapp.com/';

export default axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
});

export { default as AuthAPI } from './auth';
export { default as UserAPI } from './user';
export { default as FollowAPI } from './follows';
export { default as PostAPI } from './posts';
export { default as LikeAPI } from './likes';
export { default as CommentAPI } from './comments';
export { default as SaveAPI } from './saves';