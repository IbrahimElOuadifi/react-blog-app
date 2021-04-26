import api from './';

class SaveAPI {
    static get = (async (toPost, callback)  => {
        try {
            const res = await api.get('save/', { params: { toPost } });
            callback(res.data);
        } catch (err) {
            console.error(err.message);
        }
    });

    static update = (async (data, callback)  => {
        try {
            const res = await api.put('save/', data);
            console.log(res.data);
            callback();
        } catch (err) {
            console.error(err.message);
        }
    });
};

export default SaveAPI;