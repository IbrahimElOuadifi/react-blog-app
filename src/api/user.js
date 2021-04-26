import api from './';

class LikeAPI {
    static getById = (async (id, callback)  => {
        try {
            const res = await api.get(`auth/user/${id}`);
            callback(res.data.userInfo);
        } catch (err) {
            console.error(err.message);
        }
    });
};

export default LikeAPI;