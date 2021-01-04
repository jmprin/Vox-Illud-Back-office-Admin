import AuthHttpService from "../http-services/auth.service";
const jwt_decode = require('jwt-decode')

class Auth {
    isAuthenticated() {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) return false;
        try {
            let decoded_jwt = jwt_decode(jwt);
            let currentDate = (new Date().getTime() / 1000).toFixed(0);
            return currentDate <= decoded_jwt.exp;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    signIn(data) {
        return new Promise((resolve, reject) => {
            AuthHttpService.signIn(data)
                .then(response => {
                    localStorage.setItem('jwt', response.data.accessToken);
                    resolve(response)
                })
                .catch(error => reject(error));
        });
    }

    signUp(data) {
        return new Promise((resolve, reject) => {
            AuthHttpService.signUp(data)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }

    signOut(data) {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('jwt');
            resolve();
        });
    }
}

export default new Auth();
