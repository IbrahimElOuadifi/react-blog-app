import api from './';

class LikeAPI {
    static get = (async (toPost, callback)  => {
        try {
            const res = await api.get('like/', { params: { toPost} });
            callback(res.data);
        } catch (err) {
            console.error(err.message);
        }
    });

    static update = (async (data, callback)  => {
        try {
            const res = await api.put('like/', data);
            console.log(res.data)
            callback();
        } catch (err) {
            console.error(err.message);
        }
    });
};

export default LikeAPI;