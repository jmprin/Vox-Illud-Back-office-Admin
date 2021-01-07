import http from './http-common';
class StatsService {
    
    async get(url){
        return http.get(url);
    }

    async getStats() {
        return http.get('/admin/stats');
    }

    async getSessions() {
        return http.get('/admin/sessions');
    }
}

export default new StatsService();
