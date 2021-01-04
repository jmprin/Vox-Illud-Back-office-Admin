import http from './http-common';
class SponsorService {
    sendSponsorMail(data) {
        return http.put('/sponsor/mail', data);
    }

    getSponsoredUsers() {
        return http.get('/me/sponsored');
    }

    confirmSponsor(data) {
        return http.put('/sponsor/new', data);
    }
}

export default new SponsorService();
