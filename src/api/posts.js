import api from './';

class PostAPI {

    static getAll = (async (callback)  => {
        try {
            const res = await api.get('post/');
            callback(res.data);
        } catch (err) {
            console.error(err.message);
        }
    });

    static getByUserId = (async (creator, callback)  => {
        try {
            const res = await api.get('post/', { params: { creator } });
            callback(res.data);
        } catch (err) {
            console.error(err.message);
        }
    });

    static create = (async (data, callback)  => {
        try {
            const res = await api.post('post/', data);
            console.log(res.data);
            callback();
        } catch (err) {
            console.error(err.message);
        }
    });

    static update = (async ({ id, title }, callback)  => {
        try {
            const res = await api.put(`post/${id}/`, { title });
            console.log(res.data);
            callback();
        } catch (err) {
            console.error(err.message);
        }
    });

    static delete = (async (id, callback)  => {
        try {
            const res = await api.delete(`post/${id}/`);
            console.log(res.data);
            callback();
        } catch (err) {
            console.error(err.message);
        }
    });
}

export default PostAPI;