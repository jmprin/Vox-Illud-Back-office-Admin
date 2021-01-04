import http from './http-common';
class UserService {
    createUser(data) {
        return http.post('/admin/user', data);
    }

    getUsers() {
        return http.get('/admin/users');
    }

    getUser(id) {
        return http.get('/admin/users/'+id);
    }

    updateUser(data) {
        return http.put('/admin/user', data);
    }

    deleteUser(data) {
        return http.delete('/admin/user', {data});
    }

    addLicense(data) {
        return http.post('/admin/user/add-license', data);
    }
}

export default new UserService();
