import http from './http-common';
class AuthService {

    signUp(data) {
        return http.post("/signup", data);
    }

    signIn(data) {
        return http.post("/admin/signin", data);
    }
}

export default new AuthService();
