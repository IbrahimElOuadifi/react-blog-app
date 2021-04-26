import api from './';

class FollowAPI {
    static get = (async (params, callback)  => {
        try {
            const res = await api.get('follow/', { params });
            callback(res.data);
        } catch (err) {
            console.error(err.message);
        }
    });

    static update = (async (data, callback)  => {
        try {
            const res = await api.put('follow/', data);
            console.log(res.data)
            callback();
        } catch (err) {
            console.error(err.message);
        }
    });
}

export default FollowAPI;