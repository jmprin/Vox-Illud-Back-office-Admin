import http from './http-common';
class ContactService {
    sendMail(data) {
        return http.post('/contact/mail', data);
    }
}

export default new ContactService();
