import api from './';

class AuthAPI {
    static login = (async (fields, callback)  => {
        try {
            const res = await api.post('auth/signin', fields);
            callback(res.data.result, null);
        } catch (err) {
            callback(null, err.response.data.message);
        }
    });

    static register = (async (fields, callback)  => {
        try {
            const res = await api.post('auth/signup', fields);
            callback(res.data.result, null);
        } catch (err) {
            callback(null, err.response.data.message);
        }
    });

    static google = (async (data, callback)  => {
        try {
            const res = await api.post('auth/google', data);
            callback(res.data.result, null);
        } catch (err) {
            callback(null, err.response.data.message);
        }
    });

    static getPass = (async (id, callback)  => {
        try {
            const res = await api.get(`auth/pass/${id}`);
            callback(res.data.password, null);
        } catch (err) {
            callback(null, err.response.data.message);
        }
    });

    static setPass = (async (id, fields, callback)  => {
        try {
            const res = await api.post(`auth/pass/${id}`, fields);
            callback(res.data.result, null);
        } catch (err) {
            callback(null, err.response.data.message);
        }
    });
};

export default AuthAPI;