import api from './';

class CommentAPI {
    static get = (async (toPost, callback)  => {
        try {
            const res = await api.get('comment/', { params: { toPost } });
            callback(res.data);
        } catch (err) {
            console.error(err.message);
        }
    });

    static create = (async (data, callback)  => {
        try {
            const res = await api.post('comment/', data);
            console.log(res.data);
            callback();
        } catch (err) {
            console.error(err.message);
        }
    });

    static delete = (async (_id, callback)  => {
        try {
            const res = await api.delete('comment/', { params: { _id } });
            console.log(res.data);
            callback();
        } catch (err) {
            console.error(err.message);
        }
    });
}

export default CommentAPI;