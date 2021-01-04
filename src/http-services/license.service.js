import http from './http-common';
class LicenseService {
    getLicenses() {
        return http.get('/licenses');
    }

    createLicense(data) {
        return http.post('/license/create', data);
    }
}

export default new LicenseService();
